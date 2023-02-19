import Picture from './picture';
import Validator from './validator';

export default class FormActions {
  constructor(parentForm, objPicture, objValidator) {
    this.parentForm = parentForm;
    this.objPicture = objPicture;
    this.objValidator = objValidator;
    this.inputField = this.parentForm.querySelector('.form-input');
    this.button = this.parentForm.querySelector('.form-button');
    this.startVerification = this.startVerification.bind(this);
    this.restore = this.restore.bind(this);

    this.button.addEventListener('click', this.startVerification);
    this.inputField.addEventListener('input', this.restore);
  }

  startVerification(e) {
    e.preventDefault();
    const cardNumber = this.inputField.value;
    if (Validator.validQuantity(cardNumber)) {
      this.inputField.style.backgroundColor = 'greenyellow';
      const paymentSystem = this.objValidator.systemSelection(cardNumber);
      if (paymentSystem) Picture.imageDisplay(paymentSystem);
    } else {
      this.inputField.style.backgroundColor = 'red';
    }
  }

  restore() {
    this.inputField.style.backgroundColor = '';
    this.objPicture.deleteAllImages();
    this.objPicture.insertPattern();
  }
}
