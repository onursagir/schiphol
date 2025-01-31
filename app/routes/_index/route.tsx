import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { useSearchFlightsFetcher } from "./use-search-flights-fetcher";

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
        {isLoading && <h1>Loading...</h1>}
        <table>
          <thead>
            <tr>
              <th>flightIdentifier</th>
              <th>flightNumber</th>
              <th>airport</th>
              <th>date</th>
              <th>expectedTime</th>
              <th>originalTime</th>
              <th>url</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {fetcher.data?.map((flight) => {
              return (
                <tr key={flight.flightNumber}>
                  <td>{flight.flightIdentifier}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.airport}</td>
                  <td>{flight.date}</td>
                  <td>{flight.expectedTime}</td>
                  <td>{flight.originalTime}</td>
                  <td>{flight.url}</td>
                  <td>{flight.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
