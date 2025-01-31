import data from "./data.json";
import { Sort } from "./types";

interface Args {
  sort?: Sort;
}

export function listFlights({ sort = "asc" }: Args) {
  return data.flights.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.expectedTime}`);
    const dateB = new Date(`${b.date}T${b.expectedTime}`);

    return sort === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
}
