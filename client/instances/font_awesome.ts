import {
  faDotCircle, faSeedling, faBug, faSplotch, faGlobeEurope, faSnowflake,
  faSun, faWind, faTint,
  faSkullCrossbones, faIceCream, faBreadSlice, faCarrot, faHollyBerry, faLemon,
  faFireAlt, faSquare, faMortarPestle, faCompress, faExpandArrowsAlt, faSpa,
  faArrowLeft, faCaretLeft, faCaretRight, faCaretUp, faCaretDown, faImage,
  faCloudSun, faFillDrip, faStar
} from '@fortawesome/free-solid-svg-icons';

let fontAwesomeMap: Map<string, any> = new Map();

fontAwesomeMap.set('dot-circle', faDotCircle);
fontAwesomeMap.set('seedling', faSeedling);
fontAwesomeMap.set('bug', faBug);
fontAwesomeMap.set('splotch', faSplotch);
fontAwesomeMap.set('globe-europe', faGlobeEurope);
fontAwesomeMap.set('snowflake', faSnowflake);
fontAwesomeMap.set('sun', faSun);
fontAwesomeMap.set('wind', faWind);
fontAwesomeMap.set('tint', faTint);
fontAwesomeMap.set('skull-crossbones', faSkullCrossbones);
fontAwesomeMap.set('ice-cream', faIceCream);
fontAwesomeMap.set('bread-slice', faBreadSlice);
fontAwesomeMap.set('carrot', faCarrot);
fontAwesomeMap.set('holly-berry', faHollyBerry);
fontAwesomeMap.set('lemon', faLemon);
fontAwesomeMap.set('fire-alt', faFireAlt);
fontAwesomeMap.set('square', faSquare);
fontAwesomeMap.set('mortar-pestle', faMortarPestle);
fontAwesomeMap.set('compress', faCompress);
fontAwesomeMap.set('expand-arrows-alt', faExpandArrowsAlt);
fontAwesomeMap.set('spa', faSpa);
fontAwesomeMap.set('arrow-left', faArrowLeft);
fontAwesomeMap.set('caret-left', faCaretLeft);
fontAwesomeMap.set('caret-right', faCaretRight);
fontAwesomeMap.set('caret-up', faCaretUp);
fontAwesomeMap.set('caret-down', faCaretDown);
fontAwesomeMap.set('image', faImage);
fontAwesomeMap.set('cloud-sun', faCloudSun);
fontAwesomeMap.set('fill-drip', faFillDrip);
fontAwesomeMap.set('star', faStar);

export const fontAwesome = fontAwesomeMap;
