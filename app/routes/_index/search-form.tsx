import { useSearchParams } from "@remix-run/react";
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons-react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Typography } from "~/components/typography";
import { isFetcherErrorResponse } from "~/helpers/is-fetcher-error-response";
import { useSearchFlightsFetcher } from "./use-search-flights-fetcher";
import { useEffect } from "react";

interface Props {
  fetcher: ReturnType<typeof useSearchFlightsFetcher>["fetcher"];
}

export const SearchForm: React.FC<Props> = ({ fetcher }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  const sort = searchParams.get("sort") || "asc";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newQ = (formData.get("q") || "") as string;

    setSearchParams({ q: newQ, sort });

    fetcher.submit(
      { q: newQ, sort },
      { method: "get", action: "/flights/search-by-destination" }
    );
  };

  const handleToggleSort = () => {
    if (!q) return;

    const newSort = sort === "asc" ? "desc" : "asc";

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set("sort", newSort);

      return newParams;
    }, {});

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
      onSubmit={handleSubmit}
      action="/flights/search-by-destination"
    >
      <div className="flex gap-x-2 mb-1">
        <Input name="q" defaultValue={q || ""} aria-label="search departures" />
        <Button type="submit" aria-label="submit search">
          <IconSearch aria-hidden="true" />
        </Button>
      </div>
      {isFetcherErrorResponse(fetcher) &&
        fetcher.data?.issues.map(({ message, path }) => (
          <Typography
            key={path.join()}
            variant="small"
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
      >
        <Typography variant="small" className="font-semibold text-black">
          {sort === "asc" ? "Ascending" : "Descending"}
        </Typography>
        {sort === "asc" ? <IconArrowUp /> : <IconArrowDown />}
      </button>
    </fetcher.Form>
  );
};
