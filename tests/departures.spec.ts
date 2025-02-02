import { expect, test } from "@playwright/test";
import { Sort } from "~/services/flights/types";

test("Searching flights should work correctly", async ({ page }) => {
  await page.goto("localhost:5173");

  const searchInput = page.getByLabel("search departures");
  const submitButton = page.getByLabel("submit search");

  await expect(searchInput).toBeVisible();

  await searchInput.fill("san");
  await submitButton.click();

  await expect(page).toHaveURL(/q=san/);

  const flightCards = page.getByTestId("flight-card");
  await expect(flightCards).toHaveCount(5);
});

test("Flights should sort correctly", async ({ page }) => {
  await page.goto("localhost:5173?q=san");

  const expectTimesToBeSorted = async (direction: Sort) => {
    const inputs = await page
      .getByTestId("flight-card")
      .getByTestId("expectedTime")
      .allTextContents();

    const times = inputs.map((input) => new Date(input));

    for (let i = 0; i < times.length - 1; i++) {
      if (direction === "asc")
        expect(times[i].getTime()).toBeLessThanOrEqual(times[i + 1].getTime());

      if (direction === "desc")
        expect(times[i + 1].getTime()).toBeLessThanOrEqual(times[i].getTime());
    }
  };

  await expectTimesToBeSorted("asc");

  await page.goto("localhost:5173?q=san&sort=desc");

  await expectTimesToBeSorted("desc");
});

test("Toggling flights sort order should work correctly", async ({ page }) => {
  await page.goto("localhost:5173?q=san");

  const sortButton = page.getByTestId("toggle-flight-sort");

  await sortButton.click();

  await expect(page).toHaveURL(/sort=desc/);

  await sortButton.click();

  await expect(page).toHaveURL(/sort=asc/);
});

test("Empty state should be displayed", async ({ page }) => {
  await page.goto("localhost:5173?q=xxxxxxxx");

  await expect(page.getByTestId("search-flights-empty-state")).toBeVisible();
});
