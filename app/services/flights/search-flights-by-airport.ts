import data from "./data.json";
import { Flight } from "./types";

interface Args {
  query: string;
  take?: number;
}

export function searchFlightsByAirport({ query, take = 5 }: Args) {
  const result: Flight[] = [];

  for (const x of data.flights) {
    if (x.airport.toLowerCase().includes(query.toLowerCase())) {
      result.push(x);
    }

    if (result.length >= take) {
      break;
    }
  }

  return result;
}
