import "jest-extended";
describe("Category page navigation tests", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/create/category");
  });

  it("Navigate to home page", async () => {
    await page.waitForSelector("#nav-home");
    const navHome = await page.$("#nav-home");
    await navHome.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/");
  });

  it("Navigate to create category page", async () => {
    await page.waitForSelector("#create-dropdown");
    await page.$eval("#create-dropdown", (el) => el.click());
    await page.waitForSelector("#nav-category-create");
    const navCategoryCreate = await page.$("#nav-category-create");
    await navCategoryCreate.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/create/category");
  });

  it("Navigate to create todo page", async () => {
    await page.waitForSelector("#create-dropdown");
    await page.$eval("#create-dropdown", (el) => el.click());
    await page.waitForSelector("#nav-todo-create");
    const navTodoCreate = await page.$("#nav-todo-create");
    await navTodoCreate.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/create/todo");
  });
});
