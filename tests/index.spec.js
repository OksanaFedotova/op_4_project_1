import { test, expect } from '@playwright/test';

const settings = {
  screenshot: {
    type: 'jpeg',
    quality: 70,
    fullPage: true,
  },
  viewport: {
    width: 1280,
    height: 1600,
  },
};

test.describe('Resume layout', () => {
  test.beforeEach(async ({ page }) => {

    await page.setViewportSize(settings.viewport);
    
    await page.goto('http://127.0.0.1:8080'); 
  });

  test('Header is correct', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Резюме');
  });

  test('Styles are correct', async ({ page }) => {
    const header = await page.locator('h1');
    const headerStyle = await header.evaluate((el) => getComputedStyle(el).fontSize);
    expect(headerStyle).toBe('40px'); // Пример проверки размера шрифта для заголовка h1

    const sectionPadding = await page.locator('main').evaluate((el) => getComputedStyle(el).padding);
    expect(sectionPadding).toBe('20px');
  });

  test('Resume layout should be equal to template', async ({ page }) => {
    // Делаем скриншот текущей страницы с параметрами из settings
    const screenshot = await page.locator('body').screenshot(settings.screenshot);

    // Сравниваем его с эталонным снимком
    expect(screenshot).toMatchSnapshot('snapshot-template.jpeg'); // Убедитесь, что формат совпадает
  });
});
