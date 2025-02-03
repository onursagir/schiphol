import { FetcherWithComponents } from "@remix-run/react";
import { ErrorResponse } from "./make-enhanced-loader";

export function isFetcherErrorResponse<T>(
  fetcher: FetcherWithComponents<T>
): fetcher is FetcherWithComponents<Extract<T, ErrorResponse>> {
  return "issues" in (fetcher.data || {});
}
