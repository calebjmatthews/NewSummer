import FieldEvent from './field_event';
import Seed from './seed';
import { POACEAE } from '../instances/families';

export default class FieldEventFactory{
  constructor(seedCountOptions, cultivarNames, textOptions) {
    this.seedCountOptions = seedCountOptions;
    this.cultivarNames = cultivarNames;
    this.textOptions = textOptions;
  }

  genFieldEvent(cultivarsUnlocked) {
    let seedCount = this.seedCountOptions[
      Math.floor(Math.random()*this.seedCountOptions.length)
    ];
    let seeds = [];
    for (let index = 0; index < seedCount; index++) {
      let cultivarName;
      if (this.cultivarNames == null) {
        cultivarName = cultivarsUnlocked[
          Math.floor(Math.random()*cultivarsUnlocked.length)
        ];
      }
      else {
        cultivarName = this.cultivarNames[
          Math.floor(Math.random()*this.cultivarNames.length)
        ];
      }

      console.log('new Seed called in field event generation');
      seeds.push(new Seed(null, POACEAE, cultivarName, 'Discovered'));
    }

    let text = this.textOptions[
      Math.floor(Math.random()*this.textOptions.length)
    ];

    return new FieldEvent(seeds, text);
  }
}
