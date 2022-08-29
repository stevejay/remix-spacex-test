import { test as base, expect } from "@playwright/test";
import { LaunchesSearchPage } from "../models/LaunchesSearch";

const test = base.extend<{ searchPage: LaunchesSearchPage }>({
  searchPage: async ({ page }, use) => {
    const searchPage = new LaunchesSearchPage(page);
    await searchPage.goto();
    await use(searchPage);
  },
});

test("initial page state", async ({ page, searchPage }) => {
  await expect(page).toHaveTitle(/SpaceX Launches Search/);
  await expect(searchPage.title).toBeVisible();
  await expect(searchPage.alert).toHaveText(
    "Enter the name of a launch to search for"
  );
  await expect(searchPage.form).toBeVisible();
  await expect(searchPage.searchbox).toHaveValue("");
  await expect(searchPage.searchbox).toHaveAttribute(
    "placeholder",
    "Enter a launch name"
  );
  await expect(searchPage.searchbox).toBeFocused();
  await expect(searchPage.searchButton).toBeVisible();
  await expect(searchPage.clearButton).toBeVisible();
  await expect(searchPage.table).not.toBeVisible();
});

test("does not perform a search if the user does not enter a search term", async ({
  searchPage,
}) => {
  await searchPage.searchButton.click();
  await expect(searchPage.alert).toHaveText(
    "Enter the name of a launch to search for"
  );
});

test("displays search results if the user searches for a valid search term", async ({
  searchPage,
}) => {
  searchPage.searchFor("star");
  await expect(searchPage.alert).toHaveText(/\d+ results? returned/);
  await expect(searchPage.table).toBeVisible();
  await expect(searchPage.searchbox).toHaveValue("star");
});

test("user can clear the search term and search results", async ({
  searchPage,
}) => {
  searchPage.searchFor("star");
  await expect(searchPage.alert).toHaveText(/\d+ results? returned/);
  await searchPage.clearButton.click();
  await expect(searchPage.searchbox).toHaveValue("");
  await expect(searchPage.table).not.toBeVisible();
});

test("alerts the user if no search results are found", async ({
  searchPage,
}) => {
  const searchTermThatShouldMatchNothing = "&khafk88benklhglaksd";
  searchPage.searchFor(searchTermThatShouldMatchNothing);
  await expect(searchPage.alert).toHaveText(/No results found/);
  await expect(searchPage.table).not.toBeVisible();
});

test("displays the results in a table", async ({ searchPage }) => {
  searchPage.searchFor("CRS-22 & IROSA"); // Should return a single launch.
  await expect(searchPage.table).toBeVisible();
  await expect(searchPage.nameHeaderButton).toBeVisible();
  await expect(searchPage.dateHeaderButton).toBeVisible();
  await expect(searchPage.actionsHeader).toHaveText("Actions");
  const resultRow = searchPage.table.locator("role=row").nth(1);
  await expect(
    resultRow.locator('role=rowheader[name="CRS-22 & IROSA"]')
  ).toBeVisible();
  await expect(
    resultRow.locator('role=cell[name="Thu, 03 Jun 2021 17:29:00 GMT"]')
  ).toBeVisible();
  await expect(
    resultRow.locator('role=link[name="View details"]')
  ).toBeVisible();
});

test("user can view the details of a launch", async ({
  searchPage,
  baseURL,
}) => {
  searchPage.searchFor("CRS-22 & IROSA"); // Should return a single launch.
  const resultRow = searchPage.table.locator("role=row").nth(1);
  const launchId = await resultRow.getAttribute("data-testid");
  await Promise.all([
    searchPage.page.waitForNavigation(),
    resultRow.locator('role=link[name="View details"]').click(),
  ]);
  await expect(searchPage.page).toHaveURL(
    `${baseURL}/spacex/launches/${launchId}`
  );
});

test("user can change the sorting field and sorting direction of the results table", async ({
  searchPage,
  baseURL,
}) => {
  await searchPage.searchbox.type("star");

  await searchPage.searchbox.press("Enter");
  await expect(searchPage.page).toHaveURL(
    `${baseURL}/spacex/launches?index=&sortAscending=false&sortField=date_utc&name=star`
  );
  await expect(searchPage.nameHeader).toHaveAttribute("aria-sort", "none");
  await expect(searchPage.dateHeader).toHaveAttribute(
    "aria-sort",
    "descending"
  );

  await searchPage.dateHeaderButton.click();
  await expect(searchPage.nameHeader).toHaveAttribute("aria-sort", "none");
  await expect(searchPage.dateHeader).toHaveAttribute("aria-sort", "ascending");
  await expect(searchPage.page).toHaveURL(
    `${baseURL}/spacex/launches?index=&name=star&sortAscending=true&sortField=date_utc`
  );

  await searchPage.nameHeaderButton.click();
  await expect(searchPage.nameHeader).toHaveAttribute("aria-sort", "ascending");
  await expect(searchPage.dateHeader).toHaveAttribute("aria-sort", "none");
  await expect(searchPage.page).toHaveURL(
    `${baseURL}/spacex/launches?index=&name=star&sortAscending=true&sortField=name`
  );

  await searchPage.nameHeaderButton.click();
  await expect(searchPage.nameHeader).toHaveAttribute(
    "aria-sort",
    "descending"
  );
  await expect(searchPage.dateHeader).toHaveAttribute("aria-sort", "none");
  await expect(searchPage.page).toHaveURL(
    `${baseURL}/spacex/launches?index=&name=star&sortAscending=false&sortField=name`
  );
});
