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

images.set('wheat0', require('../images/wheat0.png'));
images.set('wheat1', require('../images/wheat1.png'));
images.set('wheat2', require('../images/wheat2.png'));
images.set('wheat3', require('../images/wheat3.png'));
images.set('wheat4', require('../images/wheat4.png'));
images.set('wheat5', require('../images/wheat5.png'));
images.set('wheat6', require('../images/wheat6.png'));
images.set('wild_grass_icon', require('../images/wild_grass_icon.png'));
images.set('red_star', require('../images/red_star.png'));
images.set('red_jewel', require('../images/red_jewel.png'));
images.set('background', require('../images/background.png'));

export { images }
