import {
  IconCalendarClock,
  IconChevronRight,
  IconPlaneArrival,
  IconTicket,
} from "@tabler/icons-react";
import { Card } from "~/components/card";
import { Chip } from "~/components/chip";
import { Typography } from "~/components/typography";
import { Flight } from "~/services/flights/types";

interface Props {
  flight: Flight;
}

export const FlightCard: React.FC<Props> = ({ flight }) => {
  const originalDateTime = new Date(`${flight.date}T${flight.originalTime}`);
  const expectedDateTime = new Date(`${flight.date}T${flight.expectedTime}`);

  const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const isDelayed = flight.expectedTime !== flight.originalTime;

  return (
    <Card
      component="a"
      href={flight.url}
      aria-label={`Flight ${flight.flightNumber} to ${
        flight.airport
      }, departing at ${dateFormatter.format(expectedDateTime)}${
        isDelayed ? ", delayed" : ""
      }`}
    >
      <div className="grid grid-cols-[1fr,auto] w-full items-center">
        <div className="flex flex-col">
          <Typography variant="small"># {flight.flightIdentifier}</Typography>
          <div className="flex gap-x-4 mt-2 mb-4">
            <IconPlaneArrival aria-hidden="true" />
            <Typography variant="h4">{flight.airport}</Typography>
            {isDelayed && (
              <Chip variant="danger" aria-label="Flight delayed">
                Delayed
              </Chip>
            )}
          </div>
          <div className="flex gap-x-4 items-end">
            <div className="flex items-end gap-x-4">
              <IconCalendarClock aria-hidden="true" />
              <div className="flex flex-col gap-y-1">
                {isDelayed && (
                  <Typography
                    component="time"
                    dateTime={originalDateTime.toISOString()}
                    className="line-through opacity-50 leading-none"
                    aria-label={`Originally scheduled at ${dateFormatter.format(
                      originalDateTime
                    )}`}
                  >
                    {dateFormatter.format(originalDateTime)}
                  </Typography>
                )}
                <Typography
                  component="time"
                  className="leading-none"
                  dateTime={expectedDateTime.toISOString()}
                  aria-label={`Expected departure time: ${dateFormatter.format(
                    expectedDateTime
                  )}`}
                >
                  {dateFormatter.format(expectedDateTime)}
                </Typography>
              </div>
            </div>
            <div className="flex gap-x-2 items-end">
              <IconTicket aria-hidden="true" className="translate-y-[3px]" />
              <span
                className="leading-none"
                aria-label={`Flight number ${flight.flightNumber}`}
              >
                {flight.flightNumber}
              </span>
            </div>
          </div>
        </div>
        <IconChevronRight aria-hidden="true" />
      </div>
    </Card>
  );
};
