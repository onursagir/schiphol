import { listFlights } from "./list-flights";
import { Flight } from "./types";

interface Args {
  query: string;
  take?: number;
  sort?: "asc" | "desc";
}

export function searchFlightsByAirport({
  query,
  take = 5,
  sort = "asc",
}: Args) {
  const result: Flight[] = [];

  for (const flights of listFlights({ sort })) {
    if (flights.airport.toLowerCase().includes(query.toLowerCase())) {
      result.push(flights);
    }

    if (result.length >= take) {
      break;
    }
  }

  return result;
}
