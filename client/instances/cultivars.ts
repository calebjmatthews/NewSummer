import Cultivar from '../models/seed/cultivar';
import CultivarStage from '../models/seed/cultivar_stage';
import Trait from '../models/seed/trait';
import DefinitionalTrait from '../models/seed/definitional_trait';
import { TraitNames } from '../models/enums/trait_names';
const TN = TraitNames;
import { StatNames } from '../models/enums/stat_names';
const SN = StatNames;
import { CultivarNames } from '../models/enums/cultivar_names';
const CN = CultivarNames;
import { Comparitors } from '../models/enums/comparitors';
const CO = Comparitors;

const style: any = { top: '84px', width: '30px' };

const wheatStages = [
  new CultivarStage({sprite: 'wheat0.png', duration: 0.1, style: style}),
  new CultivarStage({sprite: 'wheat1.png', duration: 0.15, style: style}),
  new CultivarStage({sprite: 'wheat2.png', duration: 0.15, style: style}),
  new CultivarStage({sprite: 'wheat3.png', duration: 0.20, style: style}),
  new CultivarStage({sprite: 'wheat4.png', duration: 0.20, style: style}),
  new CultivarStage({sprite: 'wheat5.png', duration: 0.20, style: style}),
  new CultivarStage({sprite: 'wheat6.png', duration: 0, style: style}),
];

export const grain = new Cultivar({
  name: CN.GRAIN,
  definitionalTraits: null,
  bonus: null,
  stages: wheatStages,
  traitsForCreation: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.GREATER_THAN, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.LESS_THAN, values: [4]}),
    new DefinitionalTrait({
      traitName: TN.TEMP_TOLERANCE, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.MOIS_TOLERANCE, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.GROWTH_SPEED, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.SEEDS_ON_TOP, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SWEETNESS, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.STARCH, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.PROTEIN, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BITTERNESS, comparitor: CO.LESS_THAN, values: [4]}),
    new DefinitionalTrait({
      traitName: TN.SOURNESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SPICINESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.TOXICITY, comparitor: CO.EQUAL_TO, values: [0]})
  ]
});

export const cane = new Cultivar({
  name: CN.CANE,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [0]})
  ],
  bonus: null,
  stages: wheatStages,
  traitsForCreation: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.GREATER_THAN, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.LESS_THAN, values: [4]}),
    new DefinitionalTrait({
      traitName: TN.TEMP_TOLERANCE, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.MOIS_TOLERANCE, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.GROWTH_SPEED, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.SEEDS_ON_TOP, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SWEETNESS, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.STARCH, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.PROTEIN, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BITTERNESS, comparitor: CO.LESS_THAN, values: [4]}),
    new DefinitionalTrait({
      traitName: TN.SOURNESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SPICINESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.TOXICITY, comparitor: CO.EQUAL_TO, values: [0]})
  ]
});

export const wildGrass = new Cultivar({
  name: CN.WILD_GRASS,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [1]})
  ], bonus: new Trait({
    name: (CN.WILD_GRASS + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.PLANT_QUALITY, SN.GROWING_TIME],
    statModifiers: [-0.6, -0.7]
  }),
  stages: wheatStages,
  traitsForCreation: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.LESS_THAN, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.TEMP_TOLERANCE, comparitor: CO.EQUAL_TO, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.MOIS_TOLERANCE, comparitor: CO.EQUAL_TO, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.GROWTH_SPEED, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.NITROGEN_REQ, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.TOUGHNESS, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.STEM_HEIGHT, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.SEEDS_ON_TOP, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SWEETNESS, comparitor: CO.LESS_THAN, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.STARCH, comparitor: CO.LESS_THAN, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.PROTEIN, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BITTERNESS, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.SOURNESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SPICINESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.TOXICITY, comparitor: CO.EQUAL_TO, values: [0]})
  ]
});

export const wildCane = new Cultivar({
  name: CN.WILD_CANE,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.LESS_THAN, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.TEMP_TOLERANCE, comparitor: CO.EQUAL_TO, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.MOIS_TOLERANCE, comparitor: CO.EQUAL_TO, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.GROWTH_SPEED, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.NITROGEN_REQ, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.TOUGHNESS, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.STEM_HEIGHT, comparitor: CO.BETWEEN, values: [2, 4]}),
    new DefinitionalTrait({
      traitName: TN.SEEDS_ON_TOP, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SWEETNESS, comparitor: CO.LESS_THAN, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.STARCH, comparitor: CO.LESS_THAN, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.PROTEIN, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BITTERNESS, comparitor: CO.LESS_THAN, values: [3]}),
    new DefinitionalTrait({
      traitName: TN.SOURNESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SPICINESS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.TOXICITY, comparitor: CO.EQUAL_TO, values: [0]})
  ], bonus: new Trait({
    name: (CN.WILD_CANE + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.PLANT_QUALITY, SN.GROWING_TIME],
    statModifiers: [-0.6, -0.7]
  }),
  stages: wheatStages
});

export const sugarCane = new Cultivar({
  name: CN.SUGAR_CANE,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SWEETNESS, comparitor: CO.GREATER_THAN, values: [4]}),
  ],
  bonus: new Trait({
    name: (CN.SUGAR_CANE + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.PLANT_QUALITY, SN.GROWING_TIME,
      SN.PEST_RESISTANCE, SN.DISEASE_RESISTANCE],
    statModifiers: [0.125, 0.025, -0.05, -0.05]
  }),
  stages: wheatStages
});

export const bamboo = new Cultivar({
  name: CN.BAMBOO,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.TOUGHNESS, comparitor: CO.GREATER_THAN, values: [4]})
  ],
  bonus: new Trait({
    name: (CN.BAMBOO + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.STEM_THICKNESS, SN.GROWING_TIME],
    statModifiers: [0.1, -0.15]
  }),
  stages: wheatStages
});

export const oats = new Cultivar({
  name: CN.OATS,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.EQUAL_TO, values: [0]})
  ],
  bonus: new Trait({
    name: (CN.OATS + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.MOIS_TOLERANCE, SN.PEST_RESISTANCE,
      SN.DISEASE_RESISTANCE],
    statModifiers: [0.1, 0.05, 0.05]
  }),
  stages: wheatStages
});

export const millet = new Cultivar({
  name: CN.MILLET,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.BETWEEN, values: [1, 2]})
  ], bonus: new Trait({
    name: (CN.MILLET + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.MOIS_TOLERANCE, SN.TEMP_TOLERANCE],
    statModifiers: [-0.1, 0.1]
  }),
  stages: wheatStages
});

export const sorghum = new Cultivar({
  name: CN.SORGHUM,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.BETWEEN, values: [3, 4]})
  ], bonus: new Trait({
    name: (CN.SORGHUM + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.MOIS_TOLERANCE, SN.TEMP_TOLERANCE,
      SN.PLANT_QUALITY, SN.GROWING_TIME,
      SN.PEST_RESISTANCE, SN.DISEASE_RESISTANCE],
    statModifiers: [-0.05, 0.05, 0.125, 0.025, -0.05, -0.05]
  }),
  stages: wheatStages
});

export const rye = new Cultivar({
  name: CN.RYE,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.EQUAL_TO, values: [0]})
  ], bonus: new Trait({
    name: (CN.RYE + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.NITROGEN_REQUIREMENT],
    statModifiers: [-0.5]
  }),
  stages: wheatStages
});

export const rice = new Cultivar({
  name: CN.RICE,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.BETWEEN, values: [1, 2]})
  ], bonus: new Trait({
    name: (CN.RICE + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.MOIS_TOLERANCE],
    statModifiers: [0.2]
  }),
  stages: wheatStages
});

export const wheat = new Cultivar({
  name: CN.WHEAT,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [2]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.BETWEEN, values: [0, 2]})
  ], bonus: new Trait({
    name: (CN.WHEAT + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.SEED_QUANTITY, SN.PEST_RESISTANCE, SN.DISEASE_RESISTANCE],
    statModifiers: [0.15, -0.1, -0.1]
  }),
  stages: wheatStages
});

export const corn = new Cultivar({
  name: CN.CORN,
  definitionalTraits: [
    new DefinitionalTrait({
      traitName: TN.SEED_COVERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SCATTERING, comparitor: CO.EQUAL_TO, values: [0]}),
    new DefinitionalTrait({
      traitName: TN.BRANCHING, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.STEM_FOCUS, comparitor: CO.EQUAL_TO, values: [1]}),
    new DefinitionalTrait({
      traitName: TN.SEED_SIZE, comparitor: CO.GREATER_THAN, values: [4]})
  ], bonus: new Trait({
    name: (CN.CORN + ' Bonus'),
    loci: 0,
    completeDominance: null,
    statNames: [SN.PLANT_QUALITY, SN.GROWING_TIME, SN.NITROGEN_REQUIREMENT],
    statModifiers: [0.25, -0.1, 0.25]
  }),
  stages: wheatStages
});
