import { json, LoaderFunctionArgs } from "@remix-run/node";
import { searchFlightsByAirport } from "~/services/flights/search-flights-by-airport";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const query = url.searchParams.get("q") || "";

  return json(searchFlightsByAirport({ query }));
}
