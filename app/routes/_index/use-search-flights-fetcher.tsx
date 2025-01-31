import { useFetcher } from "@remix-run/react";
import { loader } from "../flights.search-by-destination/route";

export function useSearchFlightsFetcher() {
  const fetcher = useFetcher<typeof loader>();

  const isLoading = fetcher.state === "loading";

  return { fetcher, isLoading };
}
