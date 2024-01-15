import { test, expect } from '@playwright/test';


test('Deberia Permitir Ingresar con el Usuario', async ({ page }) => {
  const UI_URL = "http://localhost:5173/"

  await page.goto(UI_URL);

  // El Boton de Inicio de Sesión.
  await page.getByRole("link", {name:"Ingresa Aqui"}).click()

  await expect(page.getByRole("heading",{name:"Ingresa Aqui"})).toBeVisible()

  await page.locator("[name=email]").fill("")
  await page.locator("[name=password]").fill("")

  await page.getByRole("button", {name:"Inicia Sesión"}).click()
  await expect(page.getByText("Registro Exitoso")).toBeVisible()
  await expect(page.getByRole("link",{name:"Mis Citas"})).toBeVisible()
  await expect(page.getByRole("link",{name:"Mis Doctores"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Cierra Sesión"})).toBeVisible()



});

test('Deberia Permitir Registrar un Usuario', async ({ page }) => {
  const UI_URL = "http://localhost:5173/"

  await page.goto(UI_URL);

  // Click the get started link.
  await page.getByRole('link', { name: 'Ingresa Aqui' }).click();
  await page.getByRole('link', { name: 'Crea una Cuenta Aqui' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Crea una Cuenta' })).toBeVisible();
  await page.locator("[name=firstName]").fill("test_firstName")
  await page.locator("[name=lastName]").fill("test_lastName")
  await page.locator("[name=email]").fill("test_register@test.com")
  await page.locator("[name=password]").fill("password123")
  await page.locator("[name=confirmPassword]").fill("password123")

  await page.getByRole("button", {name:"Crea tu Cuenta"}).click()

  await expect(page.getByText("Registro Exitoso")).toBeVisible()
  await expect(page.getByRole("link", {name:"Mis Citas"})).toBeVisible()
  await expect(page.getByRole("link", {name:"Mis Doctores"})).toBeVisible()
  await expect(page.getByRole("button", {name:"Cierra Sesión"})).toBeVisible()



});
