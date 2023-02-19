import Picture from './picture';
import FormActions from './form';
import Validator from './validator';
import { photoCatalog, photoCatalogKeys } from './photoCatalog';
import { catalogPaymentSystems, systemCatalogKeys } from './data';

const parentImg = document.querySelector('.images');

const parentForm = document.querySelector('.form');

const img = new Picture(parentImg, photoCatalogKeys, photoCatalog);

const valid = new Validator(catalogPaymentSystems, systemCatalogKeys);

img.insertPattern();

const form = new FormActions(parentForm, img, valid);
