export default class Picture {
  constructor(parentEl, photoCatalogKeys, photoCatalog) {
    this.parentEl = parentEl;
    this.photoCatalogKeys = photoCatalogKeys;
    this.photoCatalog = photoCatalog;
    this.insertPattern = this.insertPattern.bind(this);
  }

  static divEl(keyImg) {
    const div = document.createElement('div');
    div.classList.add('image-hidden');
    div.classList.add('box');
    div.id = keyImg;
    return div;
  }

  insertPattern() {
    this.photoCatalogKeys.forEach((keyImg) => {
      const img = document.createElement('img');
      img.src = this.photoCatalog[keyImg];
      img.alt = 'card';
      img.classList.add('img');
      const div = Picture.divEl(keyImg);
      div.append(img);
      this.parentEl.append(div);
    });
  }

  static imageDisplay(idElement) {
    const idEl = document.getElementById(idElement);
    if (idEl) {
      idEl.classList.add('image');
      idEl.classList.remove('image-hidden');
    }
  }

  deleteAllImages() {
    const listImages = this.parentEl.querySelectorAll('.box');
    listImages.forEach((item) => {
      item.remove();
    });
  }
}
