import Validator from '../js/validator';
import { catalogPaymentSystems, systemCatalogKeys } from '../js/data';

const validator = new Validator(catalogPaymentSystems, systemCatalogKeys);

test.each([
  ['литералы', 'abc', false],
  ['смешанные символы', '123456789w1234', false],
  ['недостаточно цифр', 123456789123, false],
  ['валидное число', 4561261212345467, true],
  ['валидное число строчно', '4561261212345467', true],
  ['невалидное число', 4561261212345464, false],
])('Валидность номера, тест "%s"', (_, numbers, expected) => {
  const valid = Validator.validQuantity(numbers);
  expect(valid).toBe(expected);
});

test.each([
  ['visa 1', '4556152606247533', 'visa'],
  ['visa 2', '4539189802075013', 'visa'],
  ['visa 3', '4716856508069537953', 'visa'],
  ['visa 4', '4175005358665594', 'visa'],
  ['Master Card 1', '5353765843317736', 'mastercard'],
  ['Master Card 2', '5510953674856754', 'mastercard'],
  ['Master Card 3', '5403945127119012', 'mastercard'],
  ['American Express 1', '378568091503946', 'americanExpress'],
  ['American Express 2', '374209874634020', 'americanExpress'],
  ['American Express 3', '342789022279231', 'americanExpress'],
  ['Discover 1', '6011274916079168', 'discover'],
  ['Discover 2', '6011328526495469', 'discover'],
  ['Discover 3', '6011201033400704531', 'discover'],
  ['JCB 1', '3529751062900901', 'jsb'],
  ['JCB 2', '3535600953694424', 'jsb'],
  ['Diners Club 1', '5432186259764276', 'diners'],
  ['Diners Club 2', '30083774601975', 'diners'],
  ['Diners Club 3', '36021606411811', 'diners'],
  ['Maestro 1', '6304446954622606', 'maestro'],
  ['Maestro 2', '5018073146770116', 'maestro'],
  ['Maestro 3', '0604813630001747', 'maestro'],
  ['InstaPayment 1', '6371413385345163', 'payment'],
  ['InstaPayment 2', '6382013028984639', 'payment'],
  ['Мир 1', '2202200273752202', 'mir'],
  ['Мир 1', '2202200194640494', 'mir'],
])('Поиск платежной системы, тест "%s"', (_, numbers, expected) => {
  const valid = validator.systemSelection(numbers);
  expect(valid).toBe(expected);
});
