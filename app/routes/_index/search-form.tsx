import { useSearchParams } from "@remix-run/react";
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons-react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Typography } from "~/components/typography";
import { isFetcherErrorResponse } from "~/helpers/is-fetcher-error-response";
import { useSearchFlightsFetcher } from "./use-search-flights-fetcher";
import { useEffect, useState } from "react";

interface Props {
  fetcher: ReturnType<typeof useSearchFlightsFetcher>["fetcher"];
}

export const SearchForm: React.FC<Props> = ({ fetcher }) => {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "asc");

  const q = searchParams.get("q");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newQ = (formData.get("q") || "") as string;

    const newParams = new URLSearchParams({ q: newQ, sort });

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams.toString()}`
    );

    fetcher.submit(
      { q: newQ, sort },
      { method: "get", action: "/flights/search-by-destination" }
    );
  };

  const handleToggleSort = () => {
    if (!q) return;

    const newSort = sort === "asc" ? "desc" : "asc";

    const newParams = new URLSearchParams({ q, sort: newSort });

    setSort(newSort);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams.toString()}`
    );

    fetcher.submit(
      { q, sort: newSort },
      { method: "get", action: "/flights/search-by-destination" }
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data && q) {
      fetcher.submit(
        { q, sort },
        { method: "get", action: "/flights/search-by-destination" }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher]);

  return (
    <fetcher.Form
      method="get"
      role="search"
      onSubmit={handleSubmit}
      action="/flights/search-by-destination"
    >
      <div className="flex gap-x-2 mb-1">
        <Input
          name="q"
          role="searchbox"
          id="search-flights"
          defaultValue={q || ""}
          aria-label="Search departures"
          placeholder="Search flights by destination"
          aria-describedby={
            isFetcherErrorResponse(fetcher) ? "search-error" : undefined
          }
        />
        <Button type="submit" aria-label="submit search">
          <IconSearch aria-hidden="true" />
        </Button>
      </div>
      {isFetcherErrorResponse(fetcher) &&
        fetcher.data?.issues.map(({ message, path }) => (
          <Typography
            variant="small"
            id="search-flights-error"
            key={path.join()}
            aria-live="polite"
            className="text-red-500"
          >
            {message}
          </Typography>
        ))}
      <button
        type="button"
        onClick={handleToggleSort}
        data-testid="toggle-flight-sort"
        className="ml-auto flex items-center gap-x-2 row-span-2 mt-4"
        aria-label={`Sort flights ${
          sort === "asc" ? "ascending" : "descending"
        } by expected time`}
      >
        <Typography variant="small" className="font-semibold text-black">
          {sort === "asc" ? "Ascending" : "Descending"}
        </Typography>
        {sort === "asc" ? (
          <IconArrowUp aria-hidden="true" />
        ) : (
          <IconArrowDown aria-hidden="true" />
        )}
      </button>
    </fetcher.Form>
  );
};
