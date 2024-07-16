import { test as setup, request } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

const REGISTRATION_BODY = {
  login: "admin",
  fullName: "admin",
  email: "admin@ya.ru",
  password: "admin123",
};
const { login, email, fullName, password } = REGISTRATION_BODY;

setup("registration and authenticate", async ({ page }) => {
  await page.goto("/front_side");

  // Sign Up
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.getByRole("textbox", { name: "Enter login" }).click();
  await page.getByRole("textbox", { name: "Enter login" }).fill(login);
  await page.getByPlaceholder("Enter full name").click();
  await page.getByPlaceholder("Enter full name").fill(fullName);
  await page.getByPlaceholder("Enter email").click();
  await page.getByPlaceholder("Enter email").fill(email);
  await page.getByRole("textbox", { name: "Enter password" }).click();
  await page.getByRole("textbox", { name: "Enter password" }).fill(password);
  try {
    const api = await request.newContext({
      baseURL: process.env.BACKEND_BASE_URL,
    });
    await api.post("/auth/registration", {
      data: REGISTRATION_BODY,
    });
  } finally {
    // Sign In
    await page.goto("/front_side");
    await page.getByRole("textbox", { name: "* user * user" }).click();
    await page.getByRole("textbox", { name: "* user * user" }).fill(login);
    await page.getByRole("textbox", { name: "* key * key" }).click();
    await page.getByRole("textbox", { name: "* key * key" }).fill(password);
    await page.getByRole("button", { name: "Send" }).first().click();

    await page.context().storageState({ path: authFile });
  }
});
