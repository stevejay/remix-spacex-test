describe("launches search tests", () => {
  beforeEach(() => {
    cy.visitAndCheck("/spacex/launches");
  });

  it("initial page state", () => {
    cy.title().should("eq", "SpaceX Launches Search");
    cy.findByRole("heading", { level: 1 }).should(
      "have.text",
      "SpaceX Launches"
    );
    cy.findByRole("alert").should(
      "have.text",
      "Enter the name of a launch to search for"
    );
    cy.findByRole("form", { name: "Search launches" }).within(() => {
      cy.findByRole("searchbox", { name: "Search launches" })
        .should("have.value", "")
        .and("have.attr", "placeholder", "Enter a launch name")
        .and("be.focused");
      cy.findByRole("button", { name: "Search" }).should("exist");
      cy.findByRole("link", { name: "Clear" }).should("exist");
    });
    cy.get("table").should("not.exist");
  });

  it("does not perform a search if the user does not enter a search term", () => {
    cy.findByRole("button", { name: "Search" }).click();
    cy.findByRole("alert").should(
      "have.text",
      "Enter the name of a launch to search for"
    );
  });

  it("displays search results if the user searches for a valid search term", () => {
    cy.findByRole("searchbox").type("star{enter}");
    cy.findByRole("table").should("exist");
    cy.findByRole("searchbox").should("have.value", "star");
    cy.findByRole("alert").contains(/\d+ results? returned/);
  });

  it("allows the user to clear the search term and search results", () => {
    cy.findByRole("searchbox").type("star{enter}");
    cy.findByRole("table").should("exist");
    cy.findByRole("link", { name: "Clear" }).click();
    cy.findByRole("searchbox").should("have.value", "");
    cy.get("table").should("not.exist");
  });

  it("alerts the user if no search results are found", () => {
    const searchTermThatShouldMatchNothing = "&khafk88benklhglaksd";
    cy.findByRole("searchbox").type(
      `${searchTermThatShouldMatchNothing}{enter}`
    );
    cy.findByRole("alert").contains(/No results found/);
    cy.get("table").should("not.exist");
  });

  it("displays the search results in a table", () => {
    cy.findByRole("searchbox").type("CRS-22 & IROSA{enter}"); // Should return a single launch.
    cy.findByRole("table").within(() => {
      cy.findByRole("button", { name: "Name" }).should("exist");
      cy.findByRole("button", { name: "Date" }).should("exist");
      cy.findByTestId("5fe3af84b3467846b3242161").within(() => {
        cy.findByRole("rowheader", { name: "CRS-22 & IROSA" });
        cy.findByRole("cell", { name: "Thu, 03 Jun 2021 17:29:00 GMT" });
        cy.findByRole("link", { name: "View details" });
      });
    });
  });

  it("allows the user to view the details of a launch", () => {
    cy.findByRole("searchbox").type("CRS-22 & IROSA{enter}"); // Should return a single launch.
    cy.findByRole("table").within(() => {
      cy.findByRole("link", { name: "View details" }).click();
    });
    cy.url().should("include", "/spacex/launches/5fe3af84b3467846b3242161");
  });

  it("allows the user to change the sorting field and sorting direction of the results table", () => {
    cy.findByRole("searchbox").type("star{enter}");

    cy.findByRole("table").within(() => {
      cy.findByRole("columnheader", { name: "Name" }).should(
        "have.attr",
        "aria-sort",
        "none"
      );
      cy.findByRole("columnheader", { name: "Date" }).should(
        "have.attr",
        "aria-sort",
        "descending"
      );
    });
    cy.url()
      .should("include", "sortAscending=false")
      .should("include", "sortField=date_utc")
      .should("include", "name=star");

    cy.findByRole("table").within(() => {
      cy.findByRole("button", { name: "Date" }).click();
      cy.findByRole("columnheader", { name: "Name" }).should(
        "have.attr",
        "aria-sort",
        "none"
      );
      cy.findByRole("columnheader", { name: "Date" }).should(
        "have.attr",
        "aria-sort",
        "ascending"
      );
    });
    cy.url()
      .should("include", "sortAscending=true")
      .should("include", "sortField=date_utc")
      .should("include", "name=star");

    cy.findByRole("table").within(() => {
      cy.findByRole("button", { name: "Name" }).click();
      cy.findByRole("columnheader", { name: "Name" }).should(
        "have.attr",
        "aria-sort",
        "ascending"
      );
      cy.findByRole("columnheader", { name: "Date" }).should(
        "have.attr",
        "aria-sort",
        "none"
      );
    });
    cy.url()
      .should("include", "sortAscending=true")
      .should("include", "sortField=name")
      .should("include", "name=star");

    cy.findByRole("table").within(() => {
      cy.findByRole("button", { name: "Name" }).click();
      cy.findByRole("columnheader", { name: "Name" }).should(
        "have.attr",
        "aria-sort",
        "descending"
      );
      cy.findByRole("columnheader", { name: "Date" }).should(
        "have.attr",
        "aria-sort",
        "none"
      );
    });
    cy.url()
      .should("include", "sortAscending=false")
      .should("include", "sortField=name")
      .should("include", "name=star");
  });
});
