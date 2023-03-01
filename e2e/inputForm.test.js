// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);
const url = 'http://localhost:8080';

describe('форма ввода номера карт', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  test('Отображение на странице блоков с картинками', async () => {
    await page.goto(url);

    await page.waitForSelector('.box');
    const box = await page.$$('.box');

    expect(box.length).toBeTruthy();
  });

  test('Проверка на ввод валидного номера', async () => {
    await page.goto(url);

    await page.waitForSelector('.box');
    const forms = await page.$('.form');
    const input = await forms.$('.form-input');
    const button = await forms.$('.form-button');

    await input.type('4561261212345467');
    await button.click();

    await page.waitForSelector('.images .image');

    let style = await input.evaluate((el) => el.style.backgroundColor);
    expect(style).toBe('greenyellow');

    await input.type('1');
    style = await input.evaluate((el) => el.style.backgroundColor);
    expect(style).toBe('');
  });

  test('Проверка на ввод невалидного номера', async () => {
    await page.goto(url);

    await page.waitForSelector('.box');
    const forms = await page.$('.form');
    const input = await forms.$('.form-input');
    const button = await forms.$('.form-button');

    await input.type('4561261212345464');
    await button.click();

    const missing = await page.$('.image');
    expect(missing).toBeNull();

    const style = await input.evaluate((el) => el.style.backgroundColor);
    expect(style).toBe('red');
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
