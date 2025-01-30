describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://youtube.com/");
    cy.get(".ytSearchboxComponentInput").click().clear().type("monkey man");
    // cy.get(
    //   ".ytSearchboxComponentSearchButton > yt-icon > .yt-icon-shape > div"
    // ).click();
    cy.get("div[role='listbox'] span:last-child").each(($el, index, $list) => {
      cy.log($el.text());
      if ($el.text() === "review") {
        $el.wrap($el).click();
      }
    });
  });
});
