import { test, expect } from '@playwright/test';

test('Wypełnianie formularza kontaktowego na LetCode', async ({ page }) => {
    await page.goto('https://letcode.in/forms');

    await page.fill('#firstname', 'Michal');
    await page.fill('#lasttname', 'Zaj');
    await page.fill('#email', 'michal@interia.pl');
    await page.selectOption('select', { label: 'Poland (+48)' });
    await page.fill('#Phno', '666777666');
    await page.fill('#Addl1', 'Krak');
    await page.fill('#Addl2', 'Smocza 3/66');
    await page.fill('#state', 'Małopolskie');
    await page.fill('#postalcode', '33-666');
    const secondSelect = page.locator("select").nth(1);
    await secondSelect.selectOption({ value: "Poland" });
    await page.waitForSelector('input[type="date"]');
    await page.fill('input[type="date"]', '1996-04-19');
    await page.check('#male');
    await page.check('input[type="checkbox"]');
    await page.click('input[type="submit"].button.is-primary');
    const phoneNumber = page.locator("#Phno");
    const isValid = await phoneNumber.evaluate((el) => {
        const input = el as HTMLInputElement;
        return input.checkValidity();
    });
    console.log("Czy pole jest prawidłowe:", isValid);
});
