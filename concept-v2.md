Raise plants from wild origins to well-known crops and life entirely new.

ssh -i newsummer calebjmatthews@167.172.248.24
scp -i newsummer -r /Users/calebmatthews/newsummer-deploy calebjmatthews@167.172.248.24:/home/calebjmatthews/

Basic gameplay:
	- Cross-breed two plants (averaged time of the plants x2.5)
	- Choose to keep one of the three resulting plants
	- Grow plants in purchased fields (15min to 8hr depending on species / genes)
	- Used harvested plants for money or research
	- Researched plants are destroyed, but have a chance on revealing an undiscovered gene
	- Cross-breed again, using discovered genes to guide decision making
	- Money can be used to buy new wild seeds for breeding stock, new fields, access to new plant families, storage space, breeding choice slots, and other minor things (like fertilizer)
	- Quests challenge the player to grow in unforgiving conditions in new temporary fields, to discover new cultivars, to breed plants with specific genotypes, or to harvest cultivars with exceptionally high quality

Begin with:
	- Two variable-weather (varies by week?), poor soil plots
	- Three bags of wild grass (Poaceae) seeds
	- One cross-breeding garden
	- Storage space for five

UI:
	- Navigation bar on top with links to Experimental Garden, available fields, tasks, guidebook

Example round:
	1. In Eastern Rough Field, planted Bitter Grass
	2. In Western Rough Field, planted Hearty Grass
	3. In the Exeperimental Garden, cross-bred Hearty Grass and Highland Grass
	4. After 18 minutes, Hearty Grass was harvested, with all bushels going to Easy Research.  83% progress was made on a new Unknown Gene
	5. In Western Rough Field, planted Highland Grass
	6. After 22 minutes, Bitter Grass was harvested, with all bushels being sold for a total of $122
	7. In Western Rough Field, planted Highland Grass
	8. Cross-breeding is finished after 40 minutes: Sour Emmer is chosen over Sweet Grass and Sierra Grass
	9. Discovering Emmer has completed a quest, the reward is two new bags of Wild Grass Seed. Discovering Emmer also added a new entry to the guidebook
	10.The bags are opened, inside is Plentiful Grass and Wetland Grass
	11.After 24 minutes, Highland Grass is harvested, with one bushel continuing the previous Easy Research.  A new gene is discovered: Damp Resistance.  Now when Hearty Grass, Bitter Grass, Highland Grass, Plentiful Grass, and Wetland Grass are viewed on the detail screen an icon will show the genotype.  The gene itself can also be seen in more detail in the guidebook.

Example plant rendering:


Cultivars:
* Poaceae (Grasses)
	- Wild Grass: Building material, grows very rapidly
	- Corn: C4, high yield, high nutrient and light demand, seeds in ears
	- Wheat: High yield, seeds in seed heads, relatively little protection
	- Oats: Seeds in florets, tolerates high moisture
	- Rye: Grows well in poor soil conditions, seeds in seed heads
	- Emmer: Seed in seed heads, primitive grain
	- Rice: Seed in seed heads, can tolerate high moisture / salt
	- Millet: Seed in fox tails, fast-growing, tolerates high heat and dryness
	- Sorghum: Drought and heat tolerant
	- Sugar Cane: Cane investment, high sugar content
	- Bamboo: Cane investment, high plant toughness
* Fabaceae (Legumes)
	- Wild Legume: Food, restored N, grows rapidly
	- Peas
	- Peanuts
	- Chickpeas
	- Soy Beans
	- Green Beans
	- Lentils
	- Kidney Beans
	- Black Beans
	- Alfalfa
	- Liquorice
	- Tamarind
	- Mesquite
	- Carob
* Cucurbitaceae (Gourd)
* Brassicaceae (Crucifers)
* Solanaceae (Nightshade)
* Rosaceae (Rose)
* Lamiaceae (Mint)
* Rutaceae (Citrus)
* Apiaceae (Celery)

Traits:
	- Seed morphology: Exact shape that seed toughness takes, plants with low to no seed toughness will ignore this trait; results are: seed heads, florets, fox tails, ears
	- Carbon fixation 4: Alternate photosynthesis strategy, rewards high light and high fertility conditions
	- Chemical defense: Can change flavor of fruit or crop, between bitter, spicy, or sour; if too intense the crop will be inedible
	- Stem investment: Leads to the crop being cane-like, seeds no longer are focus of harvesting
	- Plant toughness: Requires small investment, protects against pests, decreases yield
	- Plant size: Requires moderate investment, can support higher yields
	- Seed bunches: (e.g. size of oat floret bunch)
	- Seed quantity: (e.g. number of oat florets)
	- Starch: Amount of starch stored in seeds, increases harvest quality
	- Sweetness: Amount of sugar stored in seeds, increases harvest quality
	- Protein: Amount of protein stored in seeds, increases harvest quality
	- Vitamins: Vitamin content in seeds, increases harvest quality, split this?
	- Nitrogen usage: Extent to which the plant is benefitted by high soil nitrogen
	- Poor fertility tolerance: Extent to which the plant can tolerate low soil nitrogen
	- Heat tolerance: Retain harvest despite high heat, requires investment
	- Cold tolerance: Retain harvest despite high cold, requires investment
	- Wetness tolerance: Retain harvest despite high moisture, requires investment
	- Dryness tolerance: Retain harvest despite high dryness, requires investment
	- Defense structures: Things like spines or thorns, reduce pest damage
	- Growth speed: How long it takes to grow and cross-breed the plant
	- Flower Color: For fun
	- Fruit/Seed Color: For fun

	- A newly bred or discovered cultivar has three descriptors, randomly selected from the cultivar's notable traits, such as "Bitter tasting grain" or "Fast growing"
	- A newly bred or discovered cultivar also has an adjective to accompany their name, randomly selected from the cultivar's notable traits (see below)

Adjectives:
	- Bitter, Sweet, Sour, Spicy, Aromatic, Wetland, Highland, Summer, Winter, Hearty, Plentiful, Glorious, Thorny, Tough, Delicious, Healthy

Purchaseable:
	- New wild seeds, new seeds of discovered cultivars, more crossbreeding choice slots (4, 5, 6), more seed storage space
	- A higher total money earned (including money spent) opens up new "trading partners" which means new wild family options (possibly begin with a seed set of five?)

Defects:
	- One or two hundred different defect genes, maybe four classes that have different 	functional effects
	- This way, even if every wild individual comes with 3-5 heterozygous defects, none of them are likely to be expressed until a moderate amount of inbreeding occurs
	- Possible effects are...
	- Withered: Low growth
	- Barren: No fruit production
	- Sterile: No seed production
	- Weak: Vulnerable to pests or temperature

Classes:
Plant
~~~~~
- Gene: Boolean / Boolean genetic value, associated methods, name, dominance/codominance, names for possible gene results
- Trait: The expressed result of a single or multiple contribruting Genes, for example the flavor of a crop could be determined by starch, sweetness, and chemical defense, this contains pixel drawing information as well
- Family: Contains a long list of associated Gene ids, scientific and common names, Gene combinations for member species, and various Gene restrictions for wild cultivars of member species
- Plant: Has a family, genotype (array of Gene objects), phenotype (array of Trait objects after dominance, resources, and pest/disease factors are taken into account), and timing info

Player
~~~~~~
- Field: Has weather, soil quality, and associated plant (or nothing, if empty)
- FieldEffect: A gameplay effect that is active at a field level (such as a plant that positively or negatively effects its neighbors)
- Player: Has five spots for current cultivars of each plant species, owned fields, current money, total accumulated money, a record of all discovered species
- PlayerEffect: A gameplay effect that is active at a player level (such as Seeding Moon)

Visual
~~~~~~
- Pixie: Basic visual unit, with z-order, transition type and methods (e.g. opacity or velocity)
- Menu: Abstract class that houses buttons and matches their positions and sizes with the with of the screen
- Button: Describes buttons that exist on a menu, including order, relative size, functional type
- Label: Non-interactive text objects that exist as part of a menu or display
- RadialMenu: A circular array of choices somewhere within the game area (e.g. for choices about what to do after harvesting a field)
- UITheme: The set of colors and sizes used by the UI objects
- VisField: Draws the field background depending on the time of day, kind of field, etc
- Pixel: Used by the VisPlant object to draw the plant pixel by pixel
- VisPlant: Uses the plant's phenotype gene by gene to create an HTML Canvas object that represents the plant.
- VisPlantPart: An individually determined part that makes up the plant (such as a flower, stem, etc.)
- VisNotif: A notification (such as a congratulations banner) that is displayed to the player at an appropriate time
- VisParticle: A single particle within a particle effect
- VisParticleCloud: An entire particle effect, with an array of associated particles and timing methods

Game
~~~~
- Game: Contains the current state of the game, the FieldOfView, the current player, and global variables as attributes
- State: Varying functional states of the game, and properties they contain (such as whether the user can take action, or whether notifications can be displayed), also acts as a listener for events
- PixieEvent: Events that are tied to Pixie instancies, to be called when the area the instance occupies is clicked, for example
- FieldOfView: Contains all visual elements and the screen size when the app is opened

Other ideas
~~~~~~~~~~~
- Send out expeditions for new plant types, using harvested crops as supplies
- New crop discovery (based on degree of variation from previously discovered) contributes to global population
- Quests (Jobs? Tasks?) that reward player for breeding a specific kind of plant, no time limit
- Economy that rewards novelty as well as quality/quantity
- Specific family that can only be bred during contest events, with seeds that disappear when the event is over (roses? orchids?)

Main game loop
~~~~~~~~~~~~~~
- Four times each second the game checks progress of plants toward maturity
- Clicking field brings up seed options (family->cultivar->seed)
- Clicking seed option plants seed
- Clicking experimental garden brings up seed options

Differentiating cultivars
~~~~~~~~~~~~~~~~~~~~~~~~~
Poaceae:
- Seed morpholohy:
	- Emmer: Spiked, hulled, awned, small ears
	- Corn: Kernels in husk covered ears (600 kernals per ear)
	- Wheat: Spiked, hulled, small ears
	- Oats: Seeds in florets, tolerates high moisture
	- Rye: Spiked, hulled, awned, small ears
	- Rice: Seed in mini-florets in seeds heads
	- Millet: Seed in fox tails
	- Sorghum: Seeds in denser seed heads
	- Sugar Cane: Cane investment
	- Bamboo: Cane investment

- Definitional morphology features: covering (husk, floret, or hull), branching, seed size, seeds throughout, final plant size stat
					Crn	Wht	Oat	Ric	Mlt	Srg	Rye	Bmb	Sug
Husk			1		0		0		0		0		0		0		0		0
Floret		0		0		1		1		0		0		0		1		0
Hull			0		1		0		0		1		1		1		0		1
Branching	0		0		0		1		0		1		0		0		1
Seed siz	4		1		0		1		2		1		0		0		0
Stem foc	0		0		0		0		0		0		0		1		1
Final sz	4		1		0		3		2		3		1		1		2

- Other morphology features: height, thickness, seeds throughout, density
- Seed capacity calculated from height and thickness; if a plant is not big enough, it can't support a high quantity of seeds
- Plant size is calculated from branching, seed size, stem focus, and stem thickness. Visual/functional density of plants comes from the density trait relative to this size stat

Pixi.js drawing
~~~~~~~~~~~~~~~
- Class that stores the pixi app and container objects and performs baseline operations on them
- In stage, we have a sprite for the background, and a sprite container that holds each field card
- Function to scroll from card to card
- Function to plant a seed, and therefore draw the seed texture
- Function to age up a seed into the next texture in its array
- Function to remove a sprite once the plant has been harvested

Descriptions
~~~~~~~~~~~~
- Growth time stat in hours/minutes/seconds
- Value in ideal conditions super-stat
- Temperature tolerance/moisture tolerance traits when moderate or high
- Flavor super-stat if anything other than none
- Too much seed quantity for stem height/thickness super-stat
- Pest resistance stat if moderate or high
- Disease resistance stat if moderate or high
- Nitrogen requirement stat if low or high

Visual appearance
~~~~~~~~~~~~~~~~~
- Seed covering trait (unique pixel art for each phenotype)
- Branching trait
- Stem focus trait (bamboo-like stem)
- Seed size stat (unique pixel art for 4? different size buckets)
- Temperature tolerance/moisture tolerance traits to change red/blue balance and saturation of stem and foliage
- Stem height trait
- Seeds throughout trait

Brainstorming
~~~~~~~~~~~~~
A family:
Scientific name, common name, list of possible traits, list of identified cultivars, method for turning stats into quantity/quality/visual appearance/name/description
A cultivar:
Name, list of definitional stats, optional bonus
A trait:
Name, number of loci, method for turning loci into stats
A seed:
Name, description, cultivar, genome, method of breeding with another seed
A field:
Cold vs hot, wet vs dry, pest vs none, disease vs none, nitrogen level, increased pollination

Randomly generated seeds come from family-specific lists of trait numerators with a count of traits to be truly randomly generated.

Equation for sinusoidal movement is:
Velocity = ((((endingPosition - startingPosition) / numberOfTimeSteps) / 0.6353102368) * sin(pi*percentCompletion)

Sample flavor descriptions could be: Slightly sweet, An intense and unpleasant blend of many flavors, A delicious blend of intensely spicy and slightly bitter flavors, A curious blend of moderately spicy and slightly sour flavors, An unpleasant blend of moderately sweet and slightly complex flavors
Parts of this are...
An intensity descriptor: intensely, moderately, slightly
A positivity descriptor: delicious, curious, unpleasant
Flavor words: blend of many flavors, blend of flavor1/flavor2, flavor1

Bug fixing / balance needs:
X Fix plant breeding
X Fix pixi addition of new field
X Fix pixi rendering on load of in progress seeds
- Inspect temp/mois thresholds
X Fix seed gen based on cultivar
X Mild rebalancing of traits
X Flesh out mature seed selling
- More rebalancing of traits

Climate
~~~~~~~
AaAaAa
0,1,2,3 ; 0,1,2,3
0,  1,  2,  3,  4,  5,  6
100,110,121,133,146,161,177

Temperature
#CC2E2E -> #454EC6
0,      1,      2,      3,      4,      5,      6
#cc2e2e #b53347 #9f3961 #883e7a #724393 #5b49ad #454ec6
Dark red to dark blue
#cc2e2e, #c1313b, #b53347, #aa3654, #9f3961, #943b6d, #883e7a, #7d4187, #724393, #6746a0, #5b49ad, #504bb9, #454ec6
Trait 0 performs +25% at 0, +0% at 1 - 2, -10% at 3, -25% at 4, -50% at 5, -90% at 6
Trait 1 performs at -10% at 0, +0% at 1 - 3, -10% at 4, -25% at 5, -50% at 6
Trait 2 performs at -25% at 0, -10% at 1, +0% at 2 - 4, -10% at 5, -25% at 6
Trait 3 performs at -50% at 0, -25% at 1, -10% at 2, +25% at 3, -10% at 4, -25% at 5, -50% at 6
...

Moisture
Dark yellow to turquoise
0: Entirely dry, 1: Dry, 2: Slightly dry, 3: Mild, 4: Slightly wet, 5: Wet, 6: Entirely wet
"#abc978", "#a0c27b", "#95bb7f", "#8bb482", "#80ac85", "#75a589", "#6a9e8c", "#5f978f", "#549093", "#4a8896", "#3f8199", "#347a9d", "#2973a0"

Fertility
Brown to green
"#9e6b4d", "#98704d", "#92754d", "#8c7a4e", "#867f4e", "#80844e", "#7a8a4e", "#738f4e", "#6d944e", "#67994e", "#619e4f", "#5ba34f", "#55a84f"

Pests
Dark grey to dark green
"#454946", "#424d44", "#3e5042", "#3b5441", "#38583f", "#345b3d", "#315f3b", "#2e6339", "#2a6637", "#276a35", "#246e34", "#207132", "#1d7530"

Disease
Light grey to purple
"#b5a6b3", "#ae9aad", "#a78fa7", "#a083a1", "#99779b", "#926c95", "#8b608f", "#845489", "#7d4983", "#763d7d", "#6f3177", "#682671", "#611a6b"

//        0,    1,    2,    3,    4,    5,    6
Moisture / Temperature
{
	0: [ 0.00, 0.10, 0.00,-0.10,-0.25,-0.50,-0.90],
	1: [-0.10, 0.00, 0.00, 0.00,-0.10,-0.25,-0.50],
	2: [-0.25,-0.10, 0.00, 0.00, 0.00,-0.10,-0.25],
	3: [-0.50,-0.25,-0.10, 0.25,-0.10,-0.25,-0.50],
	4: [-0.25,-0.10, 0.00, 0.00, 0.00,-0.10,-0.25],
	5: [-0.50,-0.25,-0.10, 0.00, 0.00, 0.00 -0.10],
	6: [-0.90,-0.50,-0.25,-0.10, 0.00, 0.10, 0.00]
}
//        0,    1,    2,    3,    4,    5,    6
Fertility
{
	0: [ 0.10, 0.05, 0.00, 0.00, 0.00,-0.05,-0.10],
	1: [ 0.05, 0.00, 0.00, 0.00, 0.00, 0.00,-0.05],
	2: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
	3: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
	4: [-0.10, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
	5: [-0.50,-0.25,-0.10, 0.00, 0.00, 0.00, 0.00],
	6: [-0.90,-0.75,-0.50,-0.25,-0.10, 0.00, 0.00]
}
//        0,    1,    2,    3,    4,    5,    6
Pests / Disease
{
	0: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
	1: [ 0.05, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
	2: [ 0.10, 0.05, 0.00, 0.00, 0.00, 0.00, 0.00],
	3: [ 0.15, 0.10, 0.05, 0.00, 0.00, 0.00, 0.00],
	4: [ 0.25, 0.15, 0.10, 0.05, 0.00, 0.00, 0.00],
	5: [ 0.75, 0.50, 0.35, 0.20, 0.10, 0.00, 0.00],
	6: [ 0.90, 0.75, 0.50, 0.35, 0.20, 0.10, 0.00]
}

Example results:

Perfect!
[ No descriptions ]
Final value
												$86

Superb!!!
												$113
Ideal temperature +25%
												$141
Final value
												$141

[No comment]
												$225
Too cold -10%
												$203
Too dry -25%
												$152
Too many pests -5%
												$144
Final value
												$144

Wanderers:
~~~~~~~~~~
properties: name, frequency, visitRemaining, affection, offers, dialogues, gifts

Seed trader: Overall clad lady, friendly; offers seeds with default 1 variation of currently discovered cultivars, occasionally offers 3 variation, then offers
	Dialogue:
	- Some traits that seem harmful have hidden benefits. For example, plants that require fertile soil are more difficult to raise, but grow fast and taste better.
	- Today my stock comes from far, far away. No guarantees, but there may be traits here you've never seen before.
	- Variety is crucial. If you keep breeding the same seeds together, your crops will stop improving.
	- I am a maid of constant sorrow. I've seen trouble all my days.
	- I look forward to visiting your little homestead. The air is sweet here.
Explorer: Indiana Jones type; offers initial quests, then telegram pole, then expeditions
Craftsman: Bulky, goggles; offers experimental garden improvements, storage improvements, aesthetic farmhouse improvements
Tailor: Gentleman in suit; Offers aesthetic clothing options made from various crops

Frequency/duration mechanics:
	- Default duration of a traveler visit is 5 minutes
	- Frequency describes the likelihood of a traveler being in a visiting state in any given moment
	- Therefore with a duration of 300 seconds and a frequency of .2, a visit event would occur once in 1500 seconds (25 minutes), and the probability of
	- A check is made every second to see if a traveler arrives
	- The probability of a traveler arriving is 1/(300/.2) = .00067 or 0.067%
	- Mandatory cooldown period equal to duration (300 seconds)

Seed trader, steps to create current offerings:
	1. Number of options = 3 + Math.floor(ln(# unlocked cultivars))
	2. For each option, select an unlocked cultivar and make a seed with variation of 1 (90%) of time or 3 (10%) of time
	3. If resulting seed's name already exists in the seed options, retry
	4. Seeds are priced according to (((the theoretical price of the plant - the base price of the plant) / the base price of the plant) + 1) ^ 2

Seed add/discard dialogue
	1. Click "buy" on displayed seed
	2. If not enough money, show explanatory note and cancel
	3. Otherwise, deduct the money, show seed to be added on top, possibly with label "NEW"
	4. Show all cultivars's seeds below, can be clicked to highlight
	5. "Trash" and "Cancel" buttons below this, "Trash" becomes enabled when something has been highlighted
	6. If cancelled, the function returns false and deducted money is returned
	7. If something is trashed, it is removed from the storehouse, the new seed is added to the storehouse, and the function returns true

Record Book:
~~~~~~~~~~~~
- Records each seed bred, bought, or otherwise obtained, with all its information including genome, name, method obtained, and parents (if any)
- Each seed is stored in a three layer dictionary, where family is the outermost, cultivar is the middle, and individual id is the innermost
- When being displayed, the record book shows each discovered cultivar with individuals listed beneath in player selected order (default is value high, other options are value low, growth time high, growth time low, newest, oldest)
- Also records each trait discovered (many are shared between families). Many traits are only marked as discovered when expression is high (Stem focus, Sourness, etc), but others are distinctly discoverable at either end (Tolerance: heat vs. Tolerance: cold)

Seed Breeding UI
~~~~~~~~~~~~~~~~
Experimental garden:
	- If not breeding, show "Experimental Garden: Breed two seeds together"
	- If breeding, show "Experimental plants are growing: 8m 4s"

Breeding selection:
	- Store "seedBreeding", parentA, and parentB in card state
	- Flow:
		- For seed A, show cultivar selection, then seed selection
		- For seed B, show cultivar selection, then seed selection
		- Show confirmation screen with seed descriptions for both
		- Set storehouse seed breeding props

Modal container
~~~~~~~~~~~~~~~
Has a type, which can display different styles of UI
Exists as an array, therefore other arrays can be pending while one is active
The active popup can be dismissed, removing it as [0] in the array

Stored harvested crops
~~~~~~~~~~~~~~~~~~~~~~
- Math.floor(SEED_QUANTITY * (field suitability percentage)) bushels are produced of a given crop, and the value of each bushel is (final harvest value / number of bushels)
- Stored crop data is kept in the homestead reducer, as a map of harvestId values tied to a CropHarvest object
- Each HarvestStack contains a number of bushels and a quality rating (red star to violet star?)
- Can store some huge number of HarvestStack, sell half of each, sell all, sell one by one, etc.
- Eventually can use to complete quests, trade with travelers, give as gifts to travelers

Baby dear, I love you so
Take my hand and come, let go
Through the sun we'll do-si-do
Back to our hometown

Population system
~~~~~~~~~~~~~~~~~
- As new crops are discovered, new traits are discovered, etc settlement(?) population will increase
- At a certain point population will be capped, until features are made from building materials
- Population can be used to create an expedition to a new land, which, upon success, will send back a new family of crops, and will periodically send seeds of this crop as gifts (daily?)

Request system
~~~~~~~~~~~~~~
- Can receive requests by talking with travelers, special banner when new quest is received
- Quest checking function is called every time certain actions happen, such as harvesting a plant, breeding a plant, or selling a good
- Can complete requests in request menu, special banner when quests are completed
- Request menu shows currently pending requests and completed requests

Minor display and gameplay polish
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
X Breeding time dependent on growth time of babies
X Dollars have truncated decimal places if > two digits
X Add time formatting to plant descriptions
X Decrease base seed value amount
X Fix for selling price of seeds
X Fix for one purchase causing all operations to register as "Sold"
X Rebalance for greater variety in growth times
X Hide field descriptors except when choosing crop to plant
X Fix applied field climate (off by one unit?)
X Re-examine trader arrival
X Fix plant breeding bug
X Seed selection for breeding shows first selected seed
X Confirmation before seed breeding
X Result description shows delta, not incomplete total
X Correct math error in harvest results climate effects
X Reset traveler click requirement
X Fix traveler leaving and react update on unmounted component
X Sprite display listing/timing as array in cultivar/family
X Add seed replacement container to seed breeding completion
X Fix chance of traveler appearing

Development Checklist
~~~~~~~~~~~~~~~~~~~~~
X React boilerplate
X Basic plant class architecture
X Seed genome and stat calculation
X Plant harvesting
X Seed planting
X Separate field cards/seed choices into separate containers
X Scroll between pages in react
X Purchase additional fields
X Plant breeding in experimental garden
X Classification of seeds into cultivars
X Small number of additional traits
X Basic plant naming
X Plant descriptive adjectives based on notable traits
X Pixi.js setup
X Direct translation animation of card navigation
X Optimization
X Rudimentary pixi.js pixel graphics
X Random generation of seeds based on cultivar
X Additional traits
X Variation property in cultivars
X Bonus trait based on cultivar identity
X Even more traits
X Clean up and balance traits/cultivars
X Descriptive UI
X Data saving in HTML5 localStorage
X Bug fixing, balancing
X Basic visual polish
X Display plant value and speed
X Additional seed props
X Track discovered cultivars
X ID incrementing utility class
X Record book localStorage and reducer
X Seeds from trader
X Card state in reducer
X Seed inventory navigation/limits
X Seed discovery event
X Improved navigation between card types(states)
X Auto increment reducer and actions
X Alternate seed generation cultivar trait definitions
X Experimental garden on delay
X Compact cultivar and plant selection container
X Experimental garden gives two choices
X More cultivars
X Environmental effects from fields
X Seed trader arrives and leaves
X Myriad minor display and gameplay polishes
X Calculate time passed while page not loaded
X Tap for brief icon descriptions
X Roman numeral naming system
X Simple NS pixel graphics for all plant stages
X Flashy banner when finding new family/cultivars
X Harvested crops as stored items
X Harvest stack quality jewel component
X Inventory component
X More compact and expressful number display
X Autoplanting, harvesting, and collecting
X State-based dialogue for travelers
_ Request system
_ Pixel graphics for different cultivars
_ Icon for each cultivar
_ Pixel graphics linked with traits
