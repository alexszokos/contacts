import { test, expect } from "@playwright/test";

const CONTACT_NAME = `User_${Math.random().toString(36).substring(7)}`;
const UPDATED_NAME = `${CONTACT_NAME}_Edited`;

test.describe("Contacts CRUD Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should handle the full contact lifecycle", async ({ page }) => {
    await page.getByRole("button", { name: /add new/i }).click();

    await page.getByLabel(/name/i).fill(CONTACT_NAME);
    await page.getByLabel(/phone/i).fill("+36301234567");
    await page.getByLabel(/email/i).fill("test@example.com");

    await page.getByRole("button", { name: "Done" }).click();

    await expect(page.getByText("Add contact")).toBeHidden();
    await expect(page.getByText(CONTACT_NAME)).toBeVisible();

    const contactRow = page
      .locator("div")
      .filter({ hasText: CONTACT_NAME })
      .first();

    await contactRow.hover();

    await contactRow.getByRole("button").last().click();
    await page.getByText("Edit").click();

    await page.getByLabel(/name/i).fill(UPDATED_NAME);
    await page.getByRole("button", { name: "Done" }).click();

    await expect(page.getByText(UPDATED_NAME)).toBeVisible();

    const updatedRow = page
      .locator("div")
      .filter({ hasText: UPDATED_NAME })
      .first();
    await updatedRow.hover();

    await updatedRow.getByRole("button").last().click();
    await page.getByText("Remove").click();

    await expect(page.getByText(UPDATED_NAME)).toBeHidden();
  });
});
