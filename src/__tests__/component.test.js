/**
 * @jest-environment jsdom
 */
import Picture from '../js/picture';
import Validator from '../js/validator';
import FormActions from '../js/form';
import { catalogPaymentSystems, systemCatalogKeys } from '../js/data';

const photoCatalog = {
  'visa': '',
  'mir': '',
  'americanExpress': '',
  'diners': '',
  'discover': '',
  'jsb': '',
  'mastercard': '',
  'payment': '',
  'maestro': '',
};

const photoCatalogKeys = Object.keys(photoCatalog);

document.body.innerHTML = `
  <div class="images"></div>
  <div class="form">
    <form>
      <input type="text" class="form-input" autofocus>
      <button class="form-button">Нажмите для проверки</button>
    </form>
  </div>
`;
const parentImg = document.querySelector('.images');

const parentForm = document.querySelector('.form');

const forms = document.querySelector('.form');
const inputForm = forms.querySelector('.form-input');
const button = forms.querySelector('.form-button');

const img = new Picture(parentImg, photoCatalogKeys, photoCatalog);
const valid = new Validator(catalogPaymentSystems, systemCatalogKeys);
img.insertPattern();
const form = new FormActions(parentForm, img, valid);

test('Тест на отображение блоков с картинками', () => {
  const listImageBlocks = parentImg.querySelectorAll('.box');
  expect(listImageBlocks.length).toBeTruthy();
});

test('тест на изменение класса при вводе валидного номера', () => {
  inputForm.value = '4556152606247533';
  button.click();
  const image = parentImg.querySelector('.image');
  expect(image).toBeTruthy();
});

test('тест на отсутствие изменения класса при вводе не валидного номера', () => {
  form.restore();
  inputForm.value = '4556152606247532';
  button.click();
  const image = parentImg.querySelector('.image');
  expect(image).toBeFalsy();
});

test.each([
  ['visa 1', '4556152606247533', 'visa'],
  ['visa 2', '4539189802075013', 'visa'],
  ['visa 3', '4716856508069537953', 'visa'],
  ['Master Card 1', '5353765843317736', 'mastercard'],
  ['Master Card 2', '5510953674856754', 'mastercard'],
  ['Master Card 3', '5403945127119012', 'mastercard'],
  ['American Express', '378568091503946', 'americanExpress'],
  ['American Express 3', '342789022279231', 'americanExpress'],
  ['Discover', '6011274916079168', 'discover'],
  ['JCB', '3529751062900901', 'jsb'],
  ['Diners Club 1', '5432186259764276', 'diners'],
  ['Diners Club 2', '30083774601975', 'diners'],
  ['Diners Club 3', '36021606411811', 'diners'],
  ['Maestro 1', '6304446954622606', 'maestro'],
  ['Maestro 2', '5018073146770116', 'maestro'],
  ['Maestro 3', '0604813630001747', 'maestro'],
  ['InstaPayment', '6371413385345163', 'payment'],
  ['Мир', '2202200194640494', 'mir'],
])('Тест на выбор платежной системы, тест "%s"', (_, numbers, expecteds) => {
  form.restore();
  inputForm.value = numbers;
  button.click();
  const selector = document.querySelector('.image');
  const element = document.getElementById(expecteds);
  expect(selector).toBe(element);
});

test('тест на изменение цвета при вводе валидного номера', () => {
  form.restore();
  inputForm.value = '5353765843317736';
  button.click();
  const color = inputForm.style.backgroundColor;
  expect(color).toBe('greenyellow');
});

test('тест на изменение цвета при вводе не валидного номера', () => {
  form.restore();
  inputForm.value = '4561261212345464';
  button.click();
  const color = inputForm.style.backgroundColor;
  expect(color).toBe('red');
});

test('тест на изменение цвета при вводе букв', () => {
  form.restore();
  inputForm.value = 'abs';
  button.click();
  const color = inputForm.style.backgroundColor;
  expect(color).toBe('red');
});

test('тест на ввод короткого номера', () => {
  form.restore();
  inputForm.value = '0123456789';
  button.click();
  const color = inputForm.style.backgroundColor;
  expect(color).toBe('red');
});

test('тест валидного номера неизвестной платежной системы', () => {
  form.restore();
  inputForm.value = '8912345612347657';
  button.click();
  const color = inputForm.style.backgroundColor;
  const image = parentImg.querySelector('.image');
  expect(color).toBe('greenyellow');
  expect(image).toBeFalsy();
});
