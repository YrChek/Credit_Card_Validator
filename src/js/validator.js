export default class Validator {
  constructor(catalogPaymentSystems, systemCatalogKeys) {
    this.catalogPaymentSystems = catalogPaymentSystems;
    this.systemCatalogKeys = systemCatalogKeys;
    this.systemSelection = this.systemSelection.bind(this);
  }

  static validQuantity(number) {
    if (Number(number)) {
      const num = number.toString();
      if (num.length < 13) return false;
      const numArr = [...num].reverse();
      const numControl = numArr.shift();
      const summ = numArr.reduce((total, amount, index) => {
        if (index % 2 === 0) {
          const newAmount = (Number(amount) * 2 < 10) ? Number(amount) * 2 : Number(amount) * 2 - 9;
          total += newAmount;
          return total;
        }
        total += Number(amount);
        return total;
      }, Number(numControl));
      return summ % 10 === 0;
    }
    return false;
  }

  systemSelection(number) {
    let el = false;
    this.systemCatalogKeys.forEach((element) => {
      const re = new RegExp(element);
      if (re.test(number)) {
        el = this.catalogPaymentSystems[element];
      }
    });
    return el;
  }
}
