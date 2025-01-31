import { FetcherWithComponents } from "@remix-run/react";
import { ErrorResponse } from "./makeEnhancedLoader";

export function isFetcherErrorResponse<T>(
  fetcher: FetcherWithComponents<T>
): fetcher is FetcherWithComponents<Extract<T, ErrorResponse>> {
  return "issues" in (fetcher.data || {});
}
