import { FetcherWithComponents } from "@remix-run/react";
import { isFetcherErrorResponse } from "./is-fetcher-error-response";
import { ErrorResponse } from "./make-enhanced-loader";

export function isFetcherValidResponse<T>(
  fetcher: FetcherWithComponents<T>
): fetcher is FetcherWithComponents<Exclude<T, ErrorResponse>> {
  return !isFetcherErrorResponse(fetcher);
}
