class ImageHandler {
  images: { [url: string] : any } = {};

  get(url: string) {
    return this.images[url];
  }

  set(url: string, requireObject: any) {
    this.images[url] = requireObject;
  }
}

let images = new ImageHandler();

images.set('images/wheat0.png', require('../images/wheat0.png'));
images.set('images/wheat1.png', require('../images/wheat1.png'));
images.set('images/wheat2.png', require('../images/wheat2.png'));
images.set('images/wheat3.png', require('../images/wheat3.png'));
images.set('images/wheat4.png', require('../images/wheat4.png'));
images.set('images/wheat5.png', require('../images/wheat5.png'));
images.set('images/wheat6.png', require('../images/wheat6.png'));

export { images }
