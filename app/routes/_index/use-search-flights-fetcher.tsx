import { useFetcher } from "@remix-run/react";
import { loader } from "../flights.search-by-destination/route";
import { isFetcherValidResponse } from "~/helpers/is-fetcher-valid-response";

export function useSearchFlightsFetcher() {
  const fetcher = useFetcher<typeof loader>();

  const isLoading =
    fetcher.state === "loading" || fetcher.state === "submitting";

  const isInitial =
    fetcher.state === "idle" &&
    fetcher.data === undefined &&
    fetcher.formData === undefined;

  const isEmpty =
    isFetcherValidResponse(fetcher) &&
    !fetcher.data?.flights.length &&
    !isInitial &&
    !isLoading;

  return { fetcher, isLoading, isInitial, isEmpty };
}
