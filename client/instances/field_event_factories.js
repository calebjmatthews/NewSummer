import FieldEventFactory from '../models/field_event_factory';
import { WILD_GRASS } from './cultivars';

export let welcomeSeeds = new FieldEventFactory(
  [2], [WILD_GRASS], [
    'Oh? There are seeds here you could use...',
    'What\'s this? A few seeds just asking to be planted...'
  ]
);
