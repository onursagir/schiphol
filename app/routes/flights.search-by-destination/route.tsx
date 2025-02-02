import { json } from "@remix-run/node";
import { makeEnhancedLoader } from "~/helpers/makeEnhancedLoader";
import { searchFlightsByAirport } from "~/services/flights/search-flights-by-airport";
import { schema } from "./schema";
import { asyncDelay } from "~/helpers/async-delay";

export const loader = makeEnhancedLoader(
  { searchParamsSchema: schema },
  async ({ searchParamsData }) => {
    await asyncDelay(500);

    return json({
      flights: searchFlightsByAirport({
        query: searchParamsData.q,
        sort: searchParamsData.sort,
      }),
    });
  }
);
