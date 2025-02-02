import { type MetaFunction } from "@remix-run/node";
import { Container } from "~/components/container";
import { Typography } from "~/components/typography";
import { isFetcherValidResponse } from "~/helpers/is-fetcher-valid-response";
import { FlightCard } from "./flight-card";
import { SearchForm } from "./search-form";
import { useSearchFlightsFetcher } from "./use-search-flights-fetcher";
import { Spinner } from "~/components/spinner";
import { PageMessage } from "~/components/page-message";
import { IconMoodEmpty } from "@tabler/icons-react";

export const meta: MetaFunction = () => {
  return [{ title: "Schiphol - Departures" }];
};

export default function Index() {
  const { fetcher, isLoading, isEmpty } = useSearchFlightsFetcher();

  return (
    <Container>
      <main className="py-6">
        <div>
          <Typography variant="h1" className="mb-6">
            Departures
          </Typography>
          <SearchForm fetcher={fetcher} />

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
          {isEmpty && (
            <PageMessage
              icon={IconMoodEmpty}
              header="No results found"
              data-testid="search-flights-empty-state"
              content="Modify your search criteria and try again"
            />
          )}
        </div>
      </main>
    </Container>
  );
}
