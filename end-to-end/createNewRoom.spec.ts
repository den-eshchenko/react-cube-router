import { test } from "@playwright/test";

test("create new room", async ({ page }) => {
  await page.goto("/front_side");
  await page.getByText("Add new room").click();
  await page.getByPlaceholder("Enter new room name").click();
  await page.getByPlaceholder("Enter new room name").fill("first room");
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByText("first room").click();
});
