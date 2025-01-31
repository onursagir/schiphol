import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { FlightCard } from "./flight-card";
import { useSearchFlightsFetcher } from "./use-search-flights-fetcher";
import { Spinner } from "~/components/spinner";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { fetcher, isLoading } = useSearchFlightsFetcher();

  return (
    <main>
      <div>
        <fetcher.Form method="get" action="/flights/search-by-destination">
          <Input name="q" />
          <Button type="submit">search</Button>
        </fetcher.Form>
          <div className="flex flex-col gap-y-5 mt-4">
            {isLoading && <Spinner />}
            {!isLoading &&
              isFetcherValidResponse(fetcher) &&
              fetcher.data?.flights.map((flight) => {
              return (
                  <FlightCard key={flight.flightIdentifier} flight={flight} />
              );
            })}
      </div>
    </main>
  );
}
