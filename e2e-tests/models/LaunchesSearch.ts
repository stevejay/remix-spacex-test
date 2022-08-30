import type { Locator, Page } from "@playwright/test";

export class LaunchesSearchPage {
  readonly page: Page;
  readonly title: Locator;
  readonly alert: Locator;
  readonly form: Locator;
  readonly searchbox: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;
  readonly table: Locator;
  readonly nameHeader: Locator;
  readonly nameHeaderButton: Locator;
  readonly dateHeader: Locator;
  readonly dateHeaderButton: Locator;
  readonly actionsHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("role=heading[level=1][name=/SpaceX Launches/]");
    this.alert = page.locator("role=alert");
    this.form = page.locator('role=form[name="Search launches"]');
    this.searchbox = this.form.locator(
      'role=searchbox[name="Search launches"]'
    );
    this.searchButton = this.form.locator('role=button[name="Search"]');
    this.clearButton = this.form.locator('role=link[name="Clear"]');
    this.table = this.page.locator("role=table[name=/Launch search results/]");
    this.nameHeader = this.table.locator("role=columnheader").nth(0);
    this.nameHeaderButton = this.nameHeader.locator('role=button[name="Name"]');
    this.dateHeader = this.table.locator("role=columnheader").nth(1);
    this.dateHeaderButton = this.dateHeader.locator('role=button[name="Date"]');
    this.actionsHeader = this.table.locator("role=columnheader").nth(2);
  }

  async goto() {
    await this.page.goto(`/spacex/launches`);
  }

  async searchFor(searchTerm: string) {
    await this.searchbox.type(searchTerm);
    await this.searchButton.click();
  }
}
