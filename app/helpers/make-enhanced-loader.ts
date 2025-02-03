/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";

interface CallbackArgs<TSearchParamsSchema extends z.AnyZodObject> {
  searchParamsData: z.infer<TSearchParamsSchema>;
}

type CallbackFn<TSearchParamsSchema extends z.AnyZodObject> = (
  args: CallbackArgs<TSearchParamsSchema> & LoaderFunctionArgs
) => any;

export type ErrorResponse = z.ZodError<{
  [x: string]: any;
}>;

export function makeEnhancedLoader<
  TSearchParamsSchema extends z.AnyZodObject,
  TCallback extends CallbackFn<TSearchParamsSchema>
>(
  {
    searchParamsSchema,
  }: {
    searchParamsSchema?: TSearchParamsSchema;
  },
  callback: TCallback
) {
  return async function loader(
    args: LoaderFunctionArgs
  ): Promise<ReturnType<TCallback> | ErrorResponse> {
    const url = new URL(args.request.url);

    const { data: searchParamsData, error: searchParamsError } =
      (await searchParamsSchema?.safeParseAsync(
        Object.fromEntries(url.searchParams)
      )) || {};

    if (searchParamsError) {
      return Response.json(searchParamsError) as any;
    }

    return callback({
      searchParamsData: searchParamsData as any,
      ...args,
    });
  };
}
