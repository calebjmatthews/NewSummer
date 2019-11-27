import React, { Component } from 'react';

import { QualityColors } from '../models/enums/quality_colors';
import { images } from '../instances/images';

export default function(props: any) {
  let qualityMap: { [colorName: string] : any } = {};
  qualityMap[QualityColors.RED] = images.get('red_jewel');
  qualityMap[QualityColors.ORANGE] = images.get('orange_jewel');
  qualityMap[QualityColors.YELLOW] = images.get('yellow_jewel');
  qualityMap[QualityColors.GREEN] = images.get('green_jewel');
  qualityMap[QualityColors.BLUE] = images.get('blue_jewel');
  qualityMap[QualityColors.INDIGO] = images.get('indigo_jewel');
  qualityMap[QualityColors.VIOLET] = images.get('violet_jewel');
  qualityMap[QualityColors.RAINBOW] = images.get('red_jewel');
  qualityMap[QualityColors.FLAME] = images.get('red_jewel');
  qualityMap[QualityColors.AURORA] = images.get('red_jewel');

  return (
    <img className="jewel-icon" src={qualityMap[props.qualityColor]} />
  );
}
