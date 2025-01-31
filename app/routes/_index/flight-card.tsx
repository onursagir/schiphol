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
    <Card component="a" href={flight.url}>
      <div className="grid grid-cols-[1fr,auto] w-full items-center">
        <div className="flex flex-col">
          <Typography variant="small"># {flight.flightIdentifier}</Typography>
          <div className="flex gap-x-4 mt-2 mb-4">
            <IconPlaneArrival />
            <Typography variant="h4">{flight.airport}</Typography>
            {isDelayed && <Chip variant="danger">Delayed</Chip>}
          </div>
          <div className="flex gap-x-4 items-end">
            <div className="flex items-end gap-x-4">
              <IconCalendarClock />
              <div className="flex flex-col gap-y-1">
                {isDelayed && (
                  <Typography
                    component="span"
                    className="line-through opacity-50 leading-none"
                  >
                    {dateFormatter.format(originalDateTime)}
                  </Typography>
                )}
                <Typography component="span" className="leading-none">
                  {dateFormatter.format(expectedDateTime)}
                </Typography>
              </div>
            </div>
            <div className="flex gap-x-2 items-end">
              <IconTicket className="translate-y-[3px]" />
              <span className="leading-none">{flight.flightNumber}</span>
            </div>
          </div>
        </div>
        <IconChevronRight />
      </div>
    </Card>
  );
};
