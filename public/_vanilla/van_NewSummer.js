// See NewSummer.txt for additional information

// Constants
var INV_INIT_GENE = 3; // Genes which are calculated first, before shuffling
var INV_INITIAL = -60; // Initial investment resource for all plants
var INV_LOWEST = -10; // Lowest value that investment pool can fall from hazards

// This is a function that returns a random boolean value
function GetBool() {
	var flip = Math.random();
	if (flip < .5) {
		return true;
	}
	else {
		return false;
	}
}

function DoNothing() {
	return true;
}

// This function returns true or false based on whether the value exists
function IsInArray(value, array) { return array.indexOf(value) > -1; }

// This function returns the number of "rows" in a multidemensional array
function ArrayRows(array) {

	var count = 0;
	if (array[0] == undefined) {
		count = "error";
	}
	else if (typeof(array[0][1]) == "undefined") {
		count = 1;
	}
	else if (typeof(array[2]) == "undefined") {
		count = 2;
	}
	else if (typeof(array[3]) == "undefined") {
		count = 3;
	}
	else {
		count = "error";
	}
	return count;
}

// This function takes a number and returns an array of the specified number in randomized order
function RandList(min, max) {
	var list = [];
	var attempt = 0;
	var looper = min;

	while (looper < max) {
		attempt = (Math.floor(Math.random() * (max - min)) + min);
		if (IsInArray(attempt, list) === false) {
			list[looper-min] = attempt;
			looper ++;
		}
	}
	return list;
}

// This function implements a globally recorded, linearly incrementing variable
var autoNumber = -1;
function AutoIncrement() {
	nStart = 0 // Adjust starting value if needed
	nInterval = 1 // Adjust incremental value if needed
	if (autoNumber === -1) { autoNumber = nStart; }
	else { autoNumber += nInterval; }
	return autoNumber;
}

// Autoincrement which affects web display variables
var autoWeb = -1;
function AutoWeb() {
	nStart = 0 // Adjust starting value if needed
	nInterval = 1 // Adjust incremental value if needed
	if (autoWeb === -1) { autoWeb = nStart; }
	else { autoWeb += nInterval; }
	return autoWeb;
}

var inSpan = false;
// This function displays the attached string to the main area of the page
function DisplayOutput(string, mode) {
	if (inSpan) {
		if ((mode === "normal") || (mode === undefined)) {
			document.getElementById(autoWeb).innerHTML += (string + '<br>');
		}
		else if (mode === "noBreak") {
			document.getElementById(autoWeb).innerHTML += (string);
		}
		else if (mode === "endDiv") {
			document.getElementById(autoWeb).innerHTML += (string + '<br>');
			inSpan = false;
		}
		else {
			document.getElementById("output").innerHTML += (string + '<br>');
			console.log("Error, unexpected DisplayOutput() mode:" + mode);
		}
	}
	else {
		if ((mode === "normal") || (mode === undefined)) {
			document.getElementById("output").innerHTML += (string + '<br>');
		}
		else if (mode === "noBreak") {
			document.getElementById("output").innerHTML += (string);
		}
		else if (mode === "newDiv") {
			if (autoWeb >= 0) { document.getElementById(autoWeb).className = "noFade"; }
			AutoWeb();
			document.getElementById("output").innerHTML = '<div id = ' + '\"' 
			  + autoWeb + '\" class= \"standardFade\"></div>' 
			  + document.getElementById("output").innerHTML;
			document.getElementById(autoWeb).innerHTML += (string + '<br>');
			inSpan = true;
		}
	/*
	else if (mode === "beginningP") {
		document.getElementById("output").innerHTML += ('<p class="' + id + '">');
		document.getElementsByClassName(id).innerHTML += (string + '<br>');
	}
	else if (mode === "continueP") {
		document.getElementsByClassName(id).innerHTML += (string + '<br>');
	}
	else if (mode === "endingP") {
		document.getElementsByClassName(id).innerHTML += (string + '</p>');
	}
	*/
		else {
			document.getElementById("output").innerHTML += (string + '<br>');
			console.log("Error, unexpected DisplayOutput() mode:" + mode);
		}
	}
}

// The below creates objects which define which genotypes the cultivars CANNOT be

// *** Cultivars *** 
	var cultivars = [

	{
		specName : "Wild Grain",
		CFX : [false, false],
		RCH : [false, false],
		SZ1 : [true, true],
		SZ2 : [[true, true], [false, false]],
		QT1 : [true, true],
		QT2 : [[true, true], [false, false]],
		TOF : [false, false],
		DCP : [false, false],
		PRT : [true, true],
		VIT : [true, true],
		TI1 : [true, true],
		TI2 : [true, true],
		TI3 : [true, true]
	},

	{
		specName : "Wild Wheat",
		CFX : [false, false],
		RCH : [false, false],
		SZ1 : [true, true],
		SZ2 : [[true, true], [false, false]],
		QT1 : [true, true],
		QT2 : [[true, true], [false, false]],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]],
		TOF : [false, false],
		DCP : [false, false],
		PRT : [true, true],
		VIT : [true, true],
		TI1 : [true, true],
		TI2 : [true, true],
		TI3 : [true, true]
	},

	// First step in cultivation, any undetermined crop with strong rachis
	{
		specName : "Grain",
		RCH : [[true, true], [true, false], [false, true]]
	},

	// A seed head type crop with strong rachis, in between wild cultivars and wheat
	{
		specName : "Emmer Wheat",
		RCH : [[true, true], [true, false], [false, true]],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]]
	},

	{
		specName : "Corn",
		PER : [false, false],
		CFX : [[true, true], [true, false], [false, true]],
		RCH : [[true, true], [true, false], [false, true]],
		MOI : [[true, true], [false, false]],
		TEM : [[true, true], [false, false]],
		MIV : [false, false],
		MM2 : [[true, true], [false, false]]
	},

	{
		specName : "Wheat",
		PER : [false, false],
		CFX : [false, false],
		RCH : [[true, true], [true, false], [false, true]],
		MOI : [[true, true], [false, false]],
		TEM : [true, true],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]]
	},

	{
		specName : "Rice",
		PER : [false, false],
		CFX : [false, false],
		RCH : [[true, true], [true, false], [false, true]],
		MOI : [[true, true], [true, false], [false, true]],
		TEM : [true, true],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]]
	},

	{
		specName : "Barley",
		PER : [false, false],
		CFX : [false, false],
		RCH : [[true, true], [true, false], [false, true]],
		TEM : [false, false],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]],
		PST : [true, true]
	},

	{
		specName : "Millet",
		PER : [false, false],
		CFX : [[true, true], [true, false], [false, true]],
		RCH : [[true, true], [true, false], [false, true]],
		MOI : [false, false],
		MIV : [false, false],
		MM1 : [[true, true], [true, false], [false, true]],
		MM2 : [[true, false], [false, true], [false, false]]
	},

	{
		specName : "Sorghum",
		PER : [false, false],
		CFX : [[true, true], [true, false], [false, true]],
		RCH : [[true, true], [true, false], [false, true]],
		MOI : [false, false],
		TEM : [false, false],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]],
	},

	{
		specName : "Oats",
		PER : [false, false],
		CFX : [false, false],
		RCH : [[true, true], [true, false], [false, true]],
		MOI : [true, true],
		TEM : [true, true],
		MIV : [false, false],
		MM2 : [[true, true], [true, false], [false, true]],
	},

	{
		specName : "Rye",
		PER : [false, false],
		CFX : [false, false],
		RCH : [[true, true], [true, false], [false, true]],
		TEM : [true, true],
		MIV : [false, false],
		MM1 : [false, false],
		MM2 : [[true, false], [false, true], [false, false]],
		FL3 : [[true, true], [true, false], [false, true]],
		PST : [true, true]
	},

	{
		specName : "Sugar Cane",
		PER : [[true, true], [true, false], [false, true]],
		CFX : [[true, true], [true, false], [false, true]],
		MOI : [true, true],
		TEM : [false, false],
		MIV : [[true, true], [true, false], [false, true]],
		FL1 : [[true, true], [true, false], [false, true]],
		FL2 : [false, false],
		FL3 : [false, false]
	},

	{
		specName : "Bamboo",
		PER : [[true, true], [true, false], [false, true]],
		CFX : [false, false],
		MIV : [[true, true], [true, false], [false, true]],
		TOF : [false, false]
	}
	]

// *** Environment / Investment variables ***
	// This creates an object to hold the investment meta data for the Poaceae class.
	//  See the documentation for the reasoning 
	var invPoaceae = {
		TI1 : [-10, -5, 0],
		TI2 : [-10, -5, 0],
		TI3 : [-10, -5, 0],
		PER : [0, 0, 30],
		RCH : [0, 0, 5],
		SZ1 : [30, 15, 0],
		SZ2 : [30, 15, 0],
		QT1 : [30, 15, 0],
		QT2 : [30, 15, 0],
		PRT : [40, 20, 0],
		VIT : [40, 20, 0],
		PS1 : [20, 10, 0],
		PS2 : [20, 10, 0],
		PST : [0, 15, 30]
	}

	// TO FIX : Change this from a hack array to a for loop within the function which 
	//  turns the list of properties within invPoaceae into an array
	var invListPoaceae = ["TI1", "TI2", "TI3", "PER", "RCH", "SZ1", "SZ2", "QT1", 'QT2',  
												"PRT", "VIT", "PS1", "PS2", "PST"];

	/*
		var = invQualityPoaceae = {
			
		}

		var = invQuantityPoaceae = {

		}
	*/

	// This creates an object to hold the environmental penalties and defenses for the
	//  Poaceae class.
	// TLAi = Three Letter Acronym (gene) as applied to insect defense
	// TLAa = Three Letter Acronym (gene) as applied to mammal defense
	// eTLA = The environmental condition (penatly) the the defensive gene is subtracted from
	var environmentPoaceae = {
		MOI  : [40, 20, 0],
		eMOI : [40, 40, 20, 20, 0],
		TEM  : [40, 20, 0],
		eTEM : [40, 40, 20, 20, 0],
		TOFi : [40, 20, 0],
		TOFa : [10, 5, 0],
		DCPi : [40, 20, 0],
		DCPa : [20, 10, 0],
		FL3i : [20, 0, 0],
		FL3a : [10, 0, 0],
		DFSi : [0, 0, 0],
		DFSa : [20, 10, 0],
		eIPD : [100, 50, 25, 0], // Insect predation
		eAPD : [50, 25, 0] // Mammal predation
	}

	// This is an object which holds the descriptive messages for each permutation of 
	//  environmental condition and matching genetic defense:
	var envMsgBank = {
	eMOI : 
		[[("This year's harsh drought did not even trouble the @."), 
		 ("This year's harsh drought did some harm to the @."),
		 ("This year's harsh drought desiccated the @.")], 
		[("This year's wild flooding was a disaster for the @."), 
		 ("This year's wild flooding disturbed the @."),
		 ("This year's wild flooding did not even trouble the @.")], 
		[("This year's dryness did not disturb the @."), 
		 ("This year's dryness did not disturb the @."),
		 ("This year's dryness parched out the @.")], 
		[("This year's frequent rain caused moderate harm to the @."), 
		 ("This year's frequent rain did not disturb the @."),
		 ("This year's frequent rain did not disturb the @.")], 
		[("This year's gentle precipitation did not disturb the @."), 
		 ("This year's gentle precipitation did not disturb the @."),
		 ("This year's gentle precipitation did not disturb the @.")]],
	eTEM : 
		[[("It was unperterbed by the searing heat."), 
		 ("It suffered some damage from the searing heat."),
		 ("It was deeply damaged by the searing heat.")], 
		[("It was heavily damaged by the vicious cold."), 
		 ("It suffered some damage from the vicious cold."),
		 ("It was untouched by the vicious cold.")], 
		[("It was not bothered by the hot weather."), 
		 ("It was not bothered by the hot weather."),
		 ("It suffered some damage from the hot weather.")], 
		[("It suffered some damage from the cold weather."), 
		 ("It was not bothered by the cold weather."),
		 ("It was not bothered by the cold weather.")], 
		[("It was unaffected by the mild temperatures."), 
		 ("It was unaffected by the mild temperatures."),
		 ("It was unaffected by the mild temperatures.")]],
	eIPD :
		[[("There was effectively no harm done to the @, despite the plague of insects."), 
		 ("There was consderable harm done to the @ because of the plague of insects."), 
		 ("There was catastrophic harm done to the @because of the plague of insects.")],
		[("There was effectively no harm done to the @ despite a high number of insects" 
			+ " this year."), 
		 ("There was some harm done to the @ because of the high number of insects this" 
		 	+ " year."), 
		 ("There was grave harm done to the @ because of the high number of insects this" 
		 	+ " year.")],
		[("There was effectively no harm done to the @ despite a small amount of insect" 
			+ " activity this year."), 
		 ("There was very little harm done to the @ because small amount of insect" 
		 	+ " activity this year."), 
		 ("There was some harm done to the @, despite the small amount of insect activity" 
		 	+ " this year.")],
		[("There was no harm done to the @, and no evidence of insect activity this year."), 
		 ("There was no harm done to the @, and no evidence of insect activity this year."), 
		 ("There was no harm done to the @, and no evidence of insect activity this" 
		 	+ " year.")]],
	eAPD :
		[[("Also, even the high number of grazing mammals caused very little damage."), 
		 ("Also, the high number of grazing mammals caused some damage."), 
		 ("Unfortunately, the high number of grazing mammals caused severe damage.")],
		[("Also, the low number of grazing mammals caused practically no damage."), 
		 ("Also, the low number of grazing mammals caused some slight damage."), 
		 ("Unfortunately, even the low number of grazing mammals "
		 	+ "caused considerable damage.")],
		[("Also, mammal browsing was nonexistent."), 
		 ("Also, mammal browsing was nonexistent."), 
		 ("Also, mammal browsing was nonexistent.")]],
	}

	var envCounter = 0;

	// These objects hold various climates and associated weather probabilities
	var climates = [
		{
			name : "Temperate",
			MOI  : [5, 5, 30, 30, 30],
			TEM  : [5, 5, 30, 30, 30],
			eIPD : [5, 15, 30, 50],
			eAPD : [20, 30, 50]	
		},
		{
			name : "Tropical",
			MOI  : [0, 25, 10, 50, 15],
			TEM  : [25, 0, 50, 10, 15],
			eIPD : [10, 30, 40, 20],
			eAPD : [40, 40, 20]
		},
		{
			name : "Arid",
			MOI  : [25, 0, 50, 10, 15],
			TEM  : [25, 0, 50, 10, 15],
			eIPD : [5, 20, 45, 30],
			eAPD : [30, 50, 20]
		},
		{
			name : "Mesothermal",
			MOI  : [10, 10, 35, 35, 10],
			TEM  : [10, 10, 35, 35, 10],
			eIPD : [10, 20, 40, 30],
			eAPD : [30, 40, 30]
		},
		{
			name : "Boreal",
			MOI  : [0, 25, 10, 50, 15],
			TEM  : [0, 25, 10, 50, 15],
			eIPD : [10, 30, 40, 20],
			eAPD : [40, 40, 20]
		},
		{
			name : "Polar",
			MOI  : [25, 0, 50, 10, 15],
			TEM  : [0, 25, 10, 50, 15],
			eIPD : [5, 20, 45, 30],
			eAPD : [30, 50, 20]
		}
	]

	glbWeatherArray = ['DryHot', 'DryCld', 'WetHot', 'WetCld'];

// *** Gene Explanation Messages ***
	// The objects below give explanations for each genotype of each gene.  A '0' denotes
	//  a genotype that requires a more complicated explanation and therefore is encoded
	//  directly within the family's class.
  var	genePoaceaeBank = {
		TI1 : ["Vigor 1: High", "Vigor 1: Medium", "Vigor 1: Low"],
		TI2 : ["Vigor 2: High", "Vigor 2: Medium", "Vigor 2: Low"],
		TI3 : ["Vigor 3: High", "Vigor 3: Medium", "Vigor 3: Low"],
		MIV : ["Form: Seed Heads", "Form: Seed Heads", "Form: Cane"],
		MM1 : ["Form Modifier 1: None", 
					 "Form Modifier 1: None", 
					 "Form Modifier 1: Fox Tails"],
		MM2 : ["Form Modifier 2: None", 
					 "Form Modifier 2: Ears", 
					 "Form Modifier 2: Husks"],
		PER : ["Period: Annual", "Period: Annual", "Period: Perennial"],
		CFX : [("Carbon Fixation: C3"), ("Carbon Fixation: C3"), ("Carbon Fixation: C4")],
		RCH : ["Seed Scattering: Seeds burst apart when harvested",
					 "Seed Scattering: Seeds burst apart when harvested",
					 "Seed Scattering: Seeds hold together when harvested"],
		MOI : ["Moisture: Tolerates dryness",
					 "Moisture: Tolerates some dryness and flooding",
					 "Moisture: Tolerates flooding"],
		TEM : ["Temperature: Tolerates heat",
					 "Temperature: Tolerates some heat and cold",
					 "Temperature: Tolerates cold"],
		PST : ["Soil: Tolerates no poor soil",
					 "Soil: Tolerates some poor soil",
					 "Soil: Tolerates poor soil"],
		SZ1 : ["Seed Size 1: Large", "Seed Size 1: Medium", "Seed Size 1: Small"],
		SZ2 : ["Seed Size 2: Large", "Seed Size 2: Medium", "Seed Size 2: Small"],
		QT1 : ["Seed Quantity 1: Many", 
					 "Seed Quantity 1: Few", 
					 "Seed Quantity 1: Absent"],
		QT2 : ["Seed Quantity 2: Many", 
					 "Seed Quantity 2: Few", 
					 "Seed Quantity 2: Absent"],
		PS1 : ["Plant Size 1: Large", "Plant Size 1: Medium", "Plant Size 1: Small"],
		PS2 : ["Plant Size 2: Large", "Plant Size 2: Medium", "Plant Size 2: Small"],
		TOF : ["Toughness: Durable", "Toughness: Mild", "Toughness: Soft"],
		DFS : ["Defense Structure: Thorns",
					 "Defense Structure: Spines",
					 "Defense Structure: None"],
		DCP : ["Defense Compounds: Strong",
					 "Defense Compounds: Weak",
					 "Defense Compounds: Absent"],
		PRT : ["Protein: High", "Protein: Low", "Protein: Absent"],
		VIT : ["Vitamins: High", "Vitamins: Low", "Vitamins: Absent"],
		FL1 : ["Flavor 1: Sweet", "Flavor 1: Starchy", "Flavor 1: Mild"],
		FL2 : ["Flavor 2: No Change", "Flavor 2: No Change", "Flavor 2: Savory"],
		FL3 : ["Flavor 3: No Change", "Flavor 3: No Change", "Flavor 3: Bitter"],
		CL1 : ["Color 1: Plain", "Color 1: Plain", "Color 1: Red"],
		CL2 : ["Color 2: Plain", "Color 2: Plain", "Color 2: Blue"],
		CL3 : ["Color 3: Plain", "Color 3: Plain", "Color 3: Gold"]
	}

	var	briefGenePoaceaeBank = {
		TI1 : [0, 0, 0],
		TI2 : [0, 0, 0],
		TI3 : [0, 0, 0],
		PER : ["annual ", "annual ", "perennial "],
		CFX : ["C3 plant ", "C3 plant ", "C4 plant "],
		MIV : [0, 0, 0],
		MM1 : [0, 0, 0],
		MM2 : [0, 0, 0],
		RCH : [0, 0, 0],
		MOI : ["Low moisture, ",
					 "Moderate moisture, ",
					 "High moisture, "],
		TEM : ["hot temperatures, ",
					 "moderate temperatures, ",
					 "cold temperatures, "],
		PST : ["in fertile soil ",
					 "in somewhat fertile soil ",
					 "in any quality soil "],
		TOF : [0, 0, 0],
		DFS : [0, 0, 0],
		DCP : [0, 0, 0],
		SZ1 : [0, 0, 0],
		SZ2 : [0, 0, 0],
		QT1 : [0, 0, 0],
		QT2 : [0, 0, 0],
		FL1 : [0, 0, 0],
		FL2 : [0, 0, 0],
		FL3 : [0, 0, 0],
		PRT : ["high protein ", "low protein ", "no protein "],
		VIT : ["and high vitamins", "and low vitamins", "and no vitamins"],
		PS1 : [0, 0, 0],
		PS2 : [0, 0, 0],
		CL1 : [0, 0, 0],
		CL2 : [0, 0, 0],
		CL3 : [0, 0, 0]
	}

	var adjectivePoaceaeBank = {
		MOI : ['Desert', 'Prairie', 'Wetland'],
		TEM : ['Summer', 'Spring', 'Winter'],
		FLX : ['Sweet', 'Savory', 'Bitter'],
		CLX : ['Red', 'Blue', 'Gold', 'Indigo', 'Vermillion', 'Cerulean', 'Carmine']
	}

// This function creates a new plant based on the method of creation (breeding or 
//  discovery), and adds it to an array of existing plants
var plantArray = [];
function UpdateSeedList() {
	for (var fieldSpot = 0; fieldSpot < 4; fieldSpot ++) {
		for (var plantNum in plantArray) {
			var seedID = ("seed" + fieldSpot + plantNum);
			if (document.getElementById(seedID) != undefined) {
				var toRemove = document.getElementById(seedID);
				toRemove.parentNode.removeChild(toRemove);
			}
			document.getElementsByClassName("seedList")[fieldSpot].innerHTML += "<li id=\"" 
				+ seedID + "\" onclick=\"SeedClick(" + fieldSpot + ", " + plantNum + ")\"></li>";
			var seedLI = document.getElementById(seedID);
			seedLI.innerHTML += (plantArray[plantNum].adjective 
				+ " ");
			seedLI.innerHTML += (plantArray[plantNum].specName);

			seedLI.innerHTML += ("<div id=\"wrapper" + seedID + "\"></div>");

			document.getElementById("wrapper" + seedID).innerHTML 
				+= ("<ul id=\"menu" + seedID + "\" class=\"invisible\"></ul>");

			// Create "Plant Seed" list item with PlantSeedClick function called on click
			document.getElementById("menu" + seedID).innerHTML += ("<li id=\"pChoice" 
				+ seedID + "\" onclick=\"PlantSeedClick(" + fieldSpot + ", " 
				+ plantNum + ")\" class=\"invisible\"></li>");
			// Create "Examine" list item with ExamineSeedClick function called on click
			document.getElementById("menu" + seedID).innerHTML += ("<li id=\"eChoice" 
				+ seedID + "\" onclick=\"ExamineSeedClick(" + plantNum 
					+ ")\" class=\"invisible\"></li>");
			// Create "Cancel" list item with CancelSeedClick function called on click
			document.getElementById("menu" + seedID).innerHTML += ("<li id=\"cChoice" 
				+ seedID + "\" onclick=\"CancelSeedClick(" + plantNum 
					+ ")\" class=\"invisible\"></li>");

			document.getElementById("pChoice" + seedID).innerHTML += "Plant Seed";
			document.getElementById("eChoice" + seedID).innerHTML += "Examine";
			document.getElementById("cChoice" + seedID).innerHTML += "Cancel";
		}
	}
}

function NewPlant(family, manner, cultivar, parent1, parent2) {
	var newPlantID = AutoIncrement();
	// Check for Poaceae
	if (family === "Poaceae") {
		// The placement of this plant within plantArray is recorded in the plant's
		//  "plantID" property
		plantArray[newPlantID] = new Poaceae(newPlantID);
		if (manner === "Discover") {
			plantArray[newPlantID].Discover(cultivar);
			plantArray[newPlantID].Identify();
			plantArray[newPlantID].AssignAdjective();
		}
		else if (manner === "Breed") {
			plantArray[newPlantID].Breed(parent1, parent2);
			plantArray[newPlantID].Identify();
			plantArray[newPlantID].AssignAdjective();
		}
		else {
			console.log("Error, select a different plant creation manner.")
		}
	}
	else {
		console.log("Error, the selected family does not seem to exist.")
	}
	UpdateSeedList();
	return newPlantID;
}

// This function takes a genotype's plantID as an argument, and searches through the
//  array of plant Phenotypes, returning the plantIDs of all Phenotypes that share
//  this genotypeID
function FindPhenotypes(geneID) {
	var looper = 0;
	var geneMatches = [];

	for (plant in plantArray) {
		var currentPlant = plantArray[plant];

		if (currentPlant.typic === 'phenotype') {
			if (currentPlant.genotypeID === geneID) {
				geneMatches[looper] = currentPlant.plantID;
				looper ++;
			}
		}
	}
	return geneMatches;
}

// This function returns the alleles of a selected genotype in the format of "Aa"
function DisplayAlleles(geneValue) {
	if ((geneValue[0] === true) && (geneValue[1] === true)) {
		return "AA";
	}
	else if ((geneValue[0] === true) && (geneValue[1] === false)) {
		return "Aa";
	}
	else if ((geneValue[0] === false) && (geneValue[1] === true)) {
		return "aA";
	}
	else if ((geneValue[0] === false) && (geneValue[1] === false)) {
		return "aa";
	}
	else {
		return "ER";
	}
}

function PrintEnvMessage(plantID) {
	for (message in plantArray[plantID].envMessages) {
		var msgSpecName = plantArray[plantID].specName;
		var messageValue = plantArray[plantID].envMessages[message];
		console.log (messageValue);
	}
}

function Family() {
	/*
	Properties possessed by all families:
	famName
	famTaxonomy
	specName
	plantID
	plantState
	*/

	// This is a simple debugging-style method to display the contents of any family
	this.DebugDisplay = function() {
		var propValue;
		console.log ("******************************");
		for(var propName in this) {
		    propValue = this[propName]

		    console.log(propName,propValue);
		}
	}

	// A method to randomly assign genotypes, based on the limitations of the selected 
	//  cultivar
	this.Discover = function(selCultivar) {
		for (var obj in cultivars) {
			if (cultivars[obj].specName === selCultivar) {
				cultivar = cultivars[obj];
			}
		}
		for (var gene in this) {
			var geneValue = this[gene];
			if (geneValue[0] === true && geneValue[1] === false) {
				var match = false;
				for (var innerGene in cultivar) {
					var iGValue = cultivar[innerGene];

					// This if branch applies when the cultivar restriction is a triple array
					if (ArrayRows(iGValue) === 3) {
						if (innerGene === gene) {

							var applying = true;
							var allele1 = GetBool();
							var allele2 = GetBool();

							while (applying === true) {
								var allele1 = GetBool();
								var allele2 = GetBool();

								// Stop the loop if all three arrays of the cultivar restriction 
								//  are not disallowed
								if ((!(allele1 === iGValue[0][0] && allele2 === iGValue[0][1]))
									  && (!(allele1 === iGValue[1][0] && allele2 === iGValue[1][1]))
									  && (!(allele1 === iGValue[2][0] && allele2 === iGValue[2][1]))) {
									applying = false
								}
							}

							this[gene] = [allele1, allele2];
							match = true
						}
					}

					// This if branch applies when the cultivar restriction is a double array
					else if (ArrayRows(iGValue) === 2) {
						if (innerGene === gene) {

							var applying = true;
							var allele1 = GetBool();
							var allele2 = GetBool();

							while (applying === true) {
								var allele1 = GetBool();
								var allele2 = GetBool();

								// Stop the loop if both arrays of the cultivar restriction 
								//  are not disallowed
								if ((!(allele1 === iGValue[0][0] && allele2 === iGValue[0][1]))
									  && (!(allele1 === iGValue[1][0] && allele2 === iGValue[1][1]))) {
									applying = false
								}
							}

							this[gene] = [allele1, allele2];
							match = true
						}
					}

					// This else branch applies when the cultivar restriction is a single array,
					//  or no restriction at all
					else {
						if (innerGene === gene) {

							var applying = true;
							var allele1 = GetBool();
							var allele2 = GetBool();

							while (applying === true) {
								var allele1 = GetBool();
								var allele2 = GetBool();
								// Stop the loop if the allele's random value is not disallowed
								if (!(allele1 === iGValue[0] && allele2 === iGValue[1])) {
									applying = false;
								}
							}

							this[gene] = [allele1, allele2];
							match = true;
						}

						// This else branch applies if the gene is unrestricted within the
						//  selected cultivar
						else {
							if (match === false) {
								var allele1 = GetBool();
								var allele2 = GetBool();
								this[gene] = [allele1, allele2];
							}
						}
					}
				}
			}
		}
	}

	// This is a function that fills in a new cultivar based on the combined genes of the 
	//  two parents
	this.Breed = function(plant1, plant2) {
		for (var gene in this) {
				var geneValue = this[gene];
				if (geneValue[0] === true && geneValue[1] === false) {
					// Select which parent a given gene comes from, if true pick parent 1
					var parentChoice1 = GetBool();
					var parentChoice2 = GetBool();
					var allele1;
					var allele2;

					if (parentChoice1) {
						allele1 = plant1[gene][0];
					}
					else {
						allele1 = plant1[gene][1];
					}

					if (parentChoice2) {
						allele2 = plant2[gene][0];
					}
					else {
						allele2 = plant2[gene][1];
					}

					geneValue[0] = allele1;
					geneValue[1] = allele2;
				}
			}
	}

	// This is a function to identify a newly bred plant as a specific cultivar
	this.Identify = function() {
		var identity = ' ';
		// Check each cultivar for a match
		for (var cultivar in cultivars) {
			var potentialMatch = true;
			var cultValue = cultivars[cultivar];

			for (var gene in this) {
				for (innerGene in cultValue) {
					var geneValue = this[gene];
					var iGValue = cultValue[innerGene];
					
					if (typeof(geneValue[0]) === "boolean") {
						
						// This if branch applies when the cultivar restriction is a triple array
						if (ArrayRows(iGValue) === 3) {
							if (innerGene === gene) {

								var allele1 = geneValue[0];
								var allele2 = geneValue[1];

								// Check if all three arrays of the cultivar restriction 
								//  are not disallowed
								if ((allele1 === iGValue[0][0] && allele2 === iGValue[0][1])
									  || (allele1 === iGValue[1][0] && allele2 === iGValue[1][1])
									  || (allele1 === iGValue[2][0] && allele2 === iGValue[2][1])) {
									potentialMatch = false;
								}
							}
						}

						// This if branch applies when the cultivar restriction is a double array
						else if (ArrayRows(iGValue) === 2) {
							if (innerGene === gene) {

								var allele1 = geneValue[0];
								var allele2 = geneValue[1];

								// Check if both arrays of the cultivar restriction 
								//  are not disallowed
								if ((allele1 === iGValue[0][0] && allele2 === iGValue[0][1])
									  || (allele1 === iGValue[1][0] && allele2 === iGValue[1][1])) {
									potentialMatch = false;
								}
							}
						}

						// This else branch applies when the cultivar restriction is a single array,
						//  or no restriction at all
						else {
							if (innerGene === gene) {

								var allele1 = geneValue[0];
								var allele2 = geneValue[1];

								// Check if the allele's value is not disallowed
								if (allele1 === iGValue[0] && allele2 === iGValue[1]) {
									potentialMatch = false;
								}
							}
						}
					}
				}
			}

			if (potentialMatch === true) {
				identity = cultivars[cultivar].specName;
			}

		}

		if (identity !== ' ') {
			this.specName = identity;
		}
		else {
			this.specName = "Rough Grain";
		}
	}
}

function Land() {
	// Which one of the microclimates this is (e.g. temperate or mesothermal)
	this.climate = ' ';
	// The current weather after being randomly decided
	this.weatherArray = [];
}
 
function Field() {
	// Which one of the microclimates the field exists in (e.g. temperate or mesothermal)
	this.climate = ' ';
	// Which spot the field takes up (0, 1, 2, or 3)
	this.spot = 0;
	// The current state of the field (empty or full)
	this.state = 'empty';
	// If full, what plantID is planted?
	this.planted = 0;
	// Can be high, medium, or low
	this.soilQuality = ' ';
}

// This is a function that calculates a subtotal for the two weather conditions within
//  the CalcInvestment method
function CalcEnvHit(plant, envFamily, envMode, geneMode, condition) {
	// plant e.g. this
	// envFamily e.g. environmentPoaceae
	// envMode e.g. "eMOI"
	// geneMode e.g. "MOI"
	// condition e.g. 0 for drought

	var miniSum = 0; // the envSum within this function piece which will eventually be returned
	if ( (plant[geneMode][0] === true) && (plant[geneMode][1] === true) ) {
		// If the condition is wet or cold, flip the amount of penalty passed to miniSum
		if ( ((condition == 1) || (condition == 3) ) 
			 && ((geneMode === "MOI") || (geneMode === "TEM")) ) {
			miniSum += Math.abs(envFamily[envMode][condition]
			           - (envFamily[envMode][condition] - envFamily[geneMode][0]));
		}
		// if the condition is hot or dry, calculate as normal
		else {
			miniSum += (envFamily[envMode][condition] - envFamily[geneMode][0]);
		}
		plant.envMessages[envCounter] = envMsgBank[envMode][condition][0];
		envCounter ++;
	}

	else if ( ((plant[geneMode][0] === true) && (plant[geneMode][1] === false)) 
			    || ((plant[geneMode][0] === false) && (plant[geneMode][1] === true)) ) {
		miniSum += (envFamily[envMode][condition] - envFamily[geneMode][1]);
		plant.envMessages[envCounter] = envMsgBank[envMode][condition][1];
		envCounter ++;
	}

	else if ( (plant[geneMode][0] === false) && (plant[geneMode][1] === false) ) {
		// If the condition is wet or cold, flip the amount of penalty passed to miniSum
		if ( ((condition == 1) || (condition == 3) ) 
			 && ((geneMode === "MOI") || (geneMode === "TEM")) ) {
			miniSum += Math.abs(envFamily[envMode][condition]
			           - (envFamily[envMode][condition] - envFamily[geneMode][2]));
		}
		// if the condition is hot or dry, calculate as normal
		else {
			miniSum += (envFamily[envMode][condition] - envFamily[geneMode][2]);
		}
		plant.envMessages[envCounter] = envMsgBank[envMode][condition][2];
		envCounter ++;
	}
	else {
		console.log ("Error in weather calculation: unexpected gene value.")
	}

	// If the condition is dry, rain, heat, or cold cut the penalty by half
	if ((condition === 2) || (condition === 3)) {
		miniSum = ( miniSum - ((envFamily[geneMode][0]) / 2) );
	}

	if (miniSum <= 0) { return 0; }
	else { return miniSum; }
}

// This is a function that calculates a subtotal for the two predation conditions
//  within the CalcInvestment method
function CalcPredHit(plant, envFamily, envMode, condition) {
	// this e.g. this
	// envFamily e.g. environmentPoaceae
	// envMode e.g. "eIPD"
	// geneMode e.g. "TOF"
	// specGeneMode e.g. "TOFi"
	// condition e.g. 0 for drought
	// defSum is a sum of TOF, DCP, FL3, DFS, depending upon the envMode

	// Use this array to cycle through the defense genes
	var defGenes = [["TOF", "TOFi", "TOFa"], 
									["DCP", "DCPi", "DCPa"],
									["FL3", "FL3i", "FL3a"], 
									["DFS", "DFSi", "DFSa"]];
	var numberOfGenes = 4; // In case this needs changing later
	// selectedGene tracks which gene has been selected, beginning with TOF
	var selectedGene = 0;

	var defSum = 0;
	var miniSum = 0;

	while (selectedGene < numberOfGenes){
		
		// These five lines select the proper defense genes (e.g. a set of TOF / TOFi / TOFa)
		//  which are applied to the remainder of the code.
		geneMode = defGenes[selectedGene][0];
		if (envMode === "eIPD") { specGeneMode = defGenes[selectedGene][1]; }
		else if (envMode === "eAPD") { specGeneMode = defGenes[selectedGene][2]; }
		else { console.log ("Error, selected predation gene returned unexpected value."); }
		selectedGene ++;

		// This code tests whether the plant's genome encodes for AA, Aa, aA, or aa, and
		//  fills a variable defSum to hold the total amount of defense the genes provide
		//  against the selected envMode (either insect or animal predation)
		if ( (plant[geneMode][0] === true) && (plant[geneMode][1] === true) ) {
			if (envMode === "eIPD") {
				defSum += (envFamily[specGeneMode][0]);
			}
			else if (envMode === "eAPD") {
				defSum += (envFamily[specGeneMode][0]);
			}
			else {
				console.log("Error, hzdominant browsing gene returned unexpected value.")
			}
		}
	
		else if ( ((plant[geneMode][0] === true) && (plant[geneMode][1] === false)) 
			    || ((plant[geneMode][0] === false) && (plant[geneMode][1] === true)) ) {
			if (envMode === "eIPD") {
				defSum += (envFamily[specGeneMode][1]);
			}
			else if (envMode === "eAPD") {
				defSum += (envFamily[specGeneMode][1]);
			}
			else {
				console.log("Error, ht browsing gene returned unexpected value.")
			}
		}
		else if ( (plant[geneMode][0] === false) && (plant[geneMode][1] === false) ) {
			if (envMode === "eIPD") {
				defSum += (envFamily[specGeneMode][2]);
			}
			else if (envMode === "eAPD") {
				defSum += (envFamily[specGeneMode][2]);
			}
		}
		else {
			console.log("Error, hzrecessive browsing gene returned unexpected value.")
		}
	}

	// This calculates the total potential damage based on the selected environmental
	//  condition (e.g. Insect "Plague", or "High" mammal browsing).  The previously
	//  calculated gene defense is subtracted from this number, and the final result
	//  is returned by the function

	miniSum = (envFamily[envMode][condition]) - defSum;

	// If miniSum is less than 25% of potential damage
	if ( miniSum <= (.25 * (envFamily[envMode][condition])) ) {
		plant.envMessages[envCounter] = envMsgBank[envMode][condition][0];
		envCounter ++;
	}

	// If miniSum is between 25% and 75% of potential damage
	else if ( (miniSum <= (.75 * (envFamily[envMode][condition])))
				 && (miniSum > (.25 * (envFamily[envMode][condition]))) ) {
		plant.envMessages[envCounter] = envMsgBank[envMode][condition][1];
		envCounter ++;
	}

	// If miniSum is greater than 75% of potential damage
	else if ( miniSum > (.75 * (envFamily[envMode][condition])) ) {
		plant.envMessages[envCounter] = envMsgBank[envMode][condition][2];
		envCounter ++;
	}

	else { console.log ("Error, picking predation message returned unexpected value."); }

	if (miniSum <= 0) { return 0; }
	else { return miniSum; }
}

// This is a function that calculates a plant's genetic defense against insect
function CalcPredDef(plant, envFamily, envMode) {
	// this e.g. this
	// envFamily e.g. environmentPoaceae
	// envMode e.g. "eIPD"
	// geneMode e.g. "TOF"
	// specGeneMode e.g. "TOFi"
	// defSum is a sum of TOF, DCP, FL3, DFS, depending upon the envMode

	// Use this array to cycle through the defense genes
	var defGenes = [["TOF", "TOFi", "TOFa"], 
									["DCP", "DCPi", "DCPa"],
									["FL3", "FL3i", "FL3a"], 
									["DFS", "DFSi", "DFSa"]];
	var numberOfGenes = 4; // In case this needs changing later
	// selectedGene tracks which gene has been selected, beginning with TOF
	var selectedGene = 0;

	var defSum = 0;
	var miniSum = 0;

	while (selectedGene < numberOfGenes){
		
		// These five lines select the proper defense genes (e.g. a set of TOF / TOFi / TOFa)
		//  which are applied to the remainder of the code.
		geneMode = defGenes[selectedGene][0];
		if (envMode === "eIPD") { specGeneMode = defGenes[selectedGene][1]; }
		else if (envMode === "eAPD") { specGeneMode = defGenes[selectedGene][2]; }
		else { console.log ("Error, selected predation gene returned unexpected value."); }
		selectedGene ++;

		// This code tests whether the plant's genome encodes for AA, Aa, aA, or aa, and
		//  fills a variable defSum to hold the total amount of defense the genes provide
		//  against the selected envMode (either insect or animal predation)
		if ( (plant[geneMode][0] === true) && (plant[geneMode][1] === true) ) {
			if (envMode === "eIPD") {
				defSum += (envFamily[specGeneMode][0]);
			}
			else if (envMode === "eAPD") {
				defSum += (envFamily[specGeneMode][0]);
			}
			else {
				console.log("Error, hzdominant browsing gene returned unexpected value.")
			}
		}
	
		else if ( ((plant[geneMode][0] === true) && (plant[geneMode][1] === false)) 
			    || ((plant[geneMode][0] === false) && (plant[geneMode][1] === true)) ) {
			if (envMode === "eIPD") {
				defSum += (envFamily[specGeneMode][1]);
			}
			else if (envMode === "eAPD") {
				defSum += (envFamily[specGeneMode][1]);
			}
			else {
				console.log("Error, ht browsing gene returned unexpected value.")
			}
		}
		else if ( (plant[geneMode][0] === false) && (plant[geneMode][1] === false) ) {
			if (envMode === "eIPD") {
				defSum += (envFamily[specGeneMode][2]);
			}
			else if (envMode === "eAPD") {
				defSum += (envFamily[specGeneMode][2]);
			}
		}
		else {
			console.log("Error, hzrecessive browsing gene returned unexpected value.")
		}
	}

	return defSum;
}

// This is a function that takes a climate object as well as a multiplier (DryHot, 
//  DryCld, WetHot, or WetCld) and returns an array of the randomly decided conditions
function WeatherProb(multiplier, weatherObj) {
	var envMoisture = ' ';
	var envTemperature = ' ';
	var envInsect = ' ';
	var envMammal = ' ';
	var nameMOI = ["Drought", "Flood", "Dry", "Rain", "Gentle"];
	var nameTEM = ["Searing", "Freezing", "Heat", "Cold", "Mild"];
	var nameIPD = ["Plague", "High", "Low", "None"];
	var nameAPD = ["High", "Low", "None"];

	// Multipliers
	var multDry = 1;
	var multWet = 1;
	var multHot = 1;
	var multCld = 1;

	if (multiplier === "DryHot") {
		multDry = 2;
		multHot = 2;
	}
	else if (multiplier === "DryCld") {
		multDry = 2;
		multCld = 2;
	}
	else if (multiplier === "WetHot") {
		multWet = 2;
		multHot = 2;
	}
	else if (multiplier === "WetCld") {
		multWet = 2;
		multCld = 2;
	}
	else {
		console.log("Error, weather multiplier returns unexpected value.");
	}

	// Post-multiplier totals for moisture and temperature
	var totalProbMoisture = ((weatherObj["MOI"][0] * multDry)
												 + (weatherObj["MOI"][1] * multWet)
												 + (weatherObj["MOI"][2] * multDry)
												 + (weatherObj["MOI"][3] * multWet)
												 + (weatherObj["MOI"][4]));
	var totalProbTemperature = ((weatherObj["TEM"][0] * multHot)
											   	  + (weatherObj["TEM"][1] * multCld)
												    + (weatherObj["TEM"][2] * multHot)
												    + (weatherObj["TEM"][3] * multCld)
												    + (weatherObj["TEM"][4]));

	// To decide the envMoisture value:
	var randWhr = Math.ceil(Math.random() * totalProbMoisture);
	// Hold each current iteration of the probability ceiling (next iteration's 
	//  probability floor)
	var currCeil = (weatherObj["MOI"][0] * multDry);
	var currFloor = 0;
	var looper = 0;
	var looping = true;

	while (looping) {
		if ((randWhr > currFloor) && (randWhr <= currCeil)) {
			envMoisture = nameMOI[looper];
			looping = false;
		}
		
		else {
			// looper is instantly incremented because existing currCeil and currFloor values
			//  have already been set based on a looper value of 0.
			looper++;
			currFloor = currCeil;
			if ((looper === 1) || (looper === 3)) {
				currCeil += (weatherObj["MOI"][looper] * multWet);
			}
			else if (looper === 2) {
				currCeil += (weatherObj["MOI"][looper] * multDry);
			}
			else if (looper === 4) {
				currCeil += weatherObj["MOI"][looper];
			}
			else {
				console.log("Error in moisture decision looping.");
				looping = false;
			}
		}
	}

	// To decide the envTemperature value:
	var randWhr = Math.ceil(Math.random() * totalProbTemperature);
	// Hold each current iteration of the probability ceiling (next iteration's 
	//  probability floor)
	var currCeil = (weatherObj["TEM"][0] * multHot);
	var currFloor = 0;
	var looper = 0;
	var looping = true;

	while (looping) {
		if ((randWhr > currFloor) && (randWhr <= currCeil)) {
			envTemperature = nameTEM[looper];
			looping = false;
		}
		
		else {
			// looper is instantly incremented because existing currCeil and currFloor values
			//  have already been set based on a looper value of 0.
			looper++;
			currFloor = currCeil;
			if ((looper === 1) || (looper === 3)) {
				currCeil += (weatherObj["TEM"][looper] * multCld);
			}
			else if (looper === 2) {
				currCeil += (weatherObj["TEM"][looper] * multHot);
			}
			else if (looper === 4) {
				currCeil += weatherObj["TEM"][looper];
			}
			else {
				console.log("Error in temperature decision looping.");
				looping = false;
			}
		}
	}

	// To decide the envInsect value:
	var randWhr = Math.ceil(Math.random() * 100);
	// Hold each current iteration of the probability ceiling (next iteration's 
	//  probability floor)
	var currCeil = weatherObj["eIPD"][0];
	var currFloor = 0;
	var looper = 0;
	var looping = true;

	while (looping) {
		if ((randWhr > currFloor) && (randWhr <= currCeil)) {
			envInsect = nameIPD[looper];
			looping = false;
		}
		
		else {
			// looper is instantly incremented because existing currCeil and currFloor values
			//  have already been set based on a looper value of 0.
			looper++;
			if (looping < 5) {
				currFloor = currCeil;
				currCeil += weatherObj["eIPD"][looper];
			}
			else {
				console.log("Error in insect decision looping.");
				looping = false;
			}
		}
	}

	// To decide the envMammal value:
	var randWhr = Math.ceil(Math.random() * 100);
	// Hold each current iteration of the probability ceiling (next iteration's 
	//  probability floor)
	var currCeil = weatherObj["eAPD"][0];
	var currFloor = 0;
	var looper = 0;
	var looping = true;

	while (looping) {
		if ((randWhr > currFloor) && (randWhr <= currCeil)) {
			envMammal = nameAPD[looper];
			looping = false;
		}
		
		else {
			// looper is instantly incremented because existing currCeil and currFloor values
			//  have already been set based on a looper value of 0.
			looper++;
			if (looping < 5) {
				currFloor = currCeil;
				currCeil += weatherObj["eAPD"][looper];
			}
			else {
				console.log("Error in mammal decision looping.");
				looping = false;
			}
		}
	}

	var envWeatherArray = [envMoisture, envTemperature, envInsect, envMammal];
	return envWeatherArray;
}

var glbMultiplier = 'NeuNeu';
function GlobalWeather() {
	// To decide the random value:
	var randomChoice = Math.floor(Math.random() * glbWeatherArray.length);
	var oldGlbMultiplier = glbMultiplier;
	glbMultiplier = glbWeatherArray[randomChoice];

	if (glbMultiplier === "DryHot") {
		document.getElementById(glbMultiplier).className = "bg";
		document.getElementById(oldGlbMultiplier).className += " fadeOut";
	}
	else if (glbMultiplier === "DryCld") {
		document.getElementById(glbMultiplier).className = "bg";
		document.getElementById(oldGlbMultiplier).className += " fadeOut";
	}
	else if (glbMultiplier === "WetHot") {
		document.getElementById(glbMultiplier).className = "bg";
		document.getElementById(oldGlbMultiplier).className += " fadeOut";
	}
	else if (glbMultiplier === "WetCld") {
		document.getElementById(glbMultiplier).className = "bg";
		document.getElementById(oldGlbMultiplier).className += " fadeOut";
	}
	else {
		console.log("Error, unexpected weather message set value.");
	}
}

// This creates a class to hold Poaceae family crops with default Aa values for all 
//  genes.
function Poaceae (newID) {

	// *** Properties ***
		
		this.famName = 'Grass';
		this.famTaxonomy = 'Poaceae';
		this.adjective = '';
		this.specName = ' ';
		this.plantID = newID;
		this.genotypeID = newID;
		this.typic = 'genotype';
		this.plantState = 'Seed';
		this.envMessages = [];
		this.grownQuality = 0;
		this.grownQuantity = 0;
		// Total Investment 1
		this.TI1 = [true, false];
		// Total Investment 2
		this.TI2 = [true, false];
		// Total Investment 3
		this.TI3 = [true, false];
		// Morphology Investment
		this.MIV = [true, false];
		// Morphology Modifier 1
		this.MM1 = [true, false];
		// Morphology Modifier 2
		this.MM2 = [true, false];
		// Periodicity
		this.PER = [true, false];
		// Carbon fixation
		this.CFX = [true, false];
		// Rachis Strength
		this.RCH = [true, false];
		// Moisture Tolerance
		this.MOI = [true, false];
		// Temperature Tolerance
		this.TEM = [true, false];
		// Poor Soil Tolerance
		this.PST = [true, false];
		// Seed Size 1
		this.SZ1 = [true, false];
		// Seed Size 2
		this.SZ2 = [true, false];
		// Seed Quantity 1
		this.QT1 = [true, false];
		// Seed Quantity 2
		this.QT2 = [true, false];
		// Plant Size 1
		this.PS1 = [true, false];
		// Plant Size 2
		this.PS2 = [true, false];
		// Toughness of Focus
		this.TOF = [true, false];
		// Defensive Structure
		this.DFS = [true, false];
		// Defense Compounds
		this.DCP = [true, false];
		// Protein
		this.PRT = [true, false];
		// Vitamins
		this.VIT = [true, false];
		// Flavor 1
		this.FL1 = [true, false];
		// Flavor 2
		this.FL2 = [true, false];
		// Flavor 3
		this.FL3 = [true, false];
		// Color 1
		this.CL1 = [true, false];
		// Color 2
		this.CL2 = [true, false];
		// Color 3
		this.CL3 = [true, false];

	// This is a function that accepts four environmental conditions.  It tallies up the 
	//  initial genetic fortitude of the plant (TI1, TI2, and TI3), adds the effect of
	//  genetic environmental defense, and subtracts from this total value the investment
	//  requiring genes are expressed in random order
	this.CalcInvestment = function(envMoisture, envTemperature, envInsect, envMammal) {
		var looper = 0;
		var innerLooper = 0;
		var randomList = RandList(INV_INIT_GENE, invListPoaceae.length);
		var invSum = INV_INITIAL;
		var invTotalQuality = 0;
		var environmentAdded = false;
		var currID = this.plantID;
		var phenID = AutoIncrement();

		// Set up the phenotype version of the plant, the values of which will be rewritten
		//  based on available investment

		plantArray[phenID] = new Poaceae(phenID);

		// The "genotypeID" property links back to the phenotype's original genotype, as 
		//  they have a many-to-one relationship
		for (var property in plantArray[currID]) {
			propertyValue = plantArray[currID][property];
			plantArray[phenID][property] = propertyValue;
		}
		plantArray[phenID].plantID = phenID;
		plantArray[phenID].typic = 'phenotype';

		while (looper < invListPoaceae.length) {
			var gene = invListPoaceae[looper];
			var geneValue = this[gene];
			// Calculate the negative members first, add environment, then randomize the rest
			if (looper < INV_INIT_GENE) {
				if (geneValue[0] === true && geneValue[1] === true) {
					invSum += invPoaceae[gene][0];
					looper ++;
				}
				else if ((geneValue[0] === true && geneValue[1] === false)
							|| (geneValue[0] === false && geneValue[1] === true)) {
					invSum += invPoaceae[gene][1];
					looper ++;
				}
				else {
					invSum += invPoaceae[gene][2];
					looper ++;
				}
			}

			else if (environmentAdded === false) {

				// The four switch statements are used to calculate the four sources of 
				//  environmental investment penalty
				envCounter = 0;
				switch (envMoisture) {
					case ("Drought") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eMOI", "MOI", 0);
						break;
					case ("Flood") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eMOI", "MOI", 1);
						break;
					case ("Dry") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eMOI", "MOI", 2);
						break;
					case ("Rain") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eMOI", "MOI", 3);
						break;
					case ("Gentle") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eMOI", "MOI", 4);
						break;
					default :
						console.log ("Error, moisture condition not found.");
				}

				switch (envTemperature) {
					case ("Searing") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eTEM", "TEM", 0);
						break;
					case ("Freezing") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eTEM", "TEM", 1);
						break;
					case ("Heat") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eTEM", "TEM", 2);
						break;
					case ("Cold") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eTEM", "TEM", 3);
						break;
					case ("Mild") :
						invSum += CalcEnvHit(this, environmentPoaceae, "eTEM", "TEM", 4);
						break;
					default :
						console.log ("Error, temperature condition not found.");
				}

				switch (envInsect) {
					case ("Plague") :
						invSum += CalcPredHit(this, environmentPoaceae, "eIPD", 0);
						break;
					case ("High") :
						invSum += CalcPredHit(this, environmentPoaceae, "eIPD", 1);
						break;
					case ("Low") :
						invSum += CalcPredHit(this, environmentPoaceae, "eIPD", 2);
						break;
					case ("None") :
						invSum += CalcPredHit(this, environmentPoaceae, "eIPD", 3);
						break;
					default :
						console.log ("Error, insect condition not found.");
				}

				switch (envMammal) {
					case ("High") :
						invSum += CalcPredHit(this, environmentPoaceae, "eAPD", 0);
						break;
					case ("Low") :
						invSum += CalcPredHit(this, environmentPoaceae, "eAPD", 1);
						break;
					case ("None") :
						invSum += CalcPredHit(this, environmentPoaceae, "eAPD", 2);
						break;
					default :
						console.log ("Error, mammal condition not found.");
				}
				environmentAdded = true;
				looper += 4;
			}

			// Now randomize the remaining order, applying investment without breaking an
			//  invSum value of > 0
			else if ( (looper >= INV_INIT_GENE) && (environmentAdded === true) ) {
				
				// If environmental penalties have increased investment beyond 20, this resets the
				//  value to 20.
				
				if (invSum >= INV_LOWEST) { invSum = INV_LOWEST; }

				while (innerLooper < (invListPoaceae.length - INV_INIT_GENE)) {
					var currentGene = invListPoaceae[randomList[innerLooper]];
					var dominantOverflow = false;
					var heteroOverflow = false;
					
					// Check the dominant investment cost for this gene.  If 0, flip the order and 
					//  check recessive values first, moving toward dominant ones.  If not, check
					//  dominant values first, as normal
					var dominantFirst = [0, 1, 2];
					var recessiveFirst = [2, 1, 0];
					var chosenFirst = [];
					if (invPoaceae[currentGene][0] === 0) {
						chosenFirst = recessiveFirst;
					}
					else { chosenFirst = dominantFirst; }

					// If homozygous dominant:
					if ((this[currentGene][0] === true) && (this[currentGene][1] === true)) {
					 	// Check that adding the cost of the dominant gene would not push invSum
					  //  over 0
					  if ((invSum + (invPoaceae[currentGene][chosenFirst[0]])) <= 0) {
					  	// Cost is low enough to express this genotype, leave phenotype alone
					  	invSum += (invPoaceae[currentGene][chosenFirst[0]]);
					  }
					  else if ((invSum + (invPoaceae[currentGene][chosenFirst[0]])) > 0) {
					  	// Cost is too high to express this genotype
					  	dominantOverflow = true;
					  }
					  else {
					  	console.log("Error, unexpected sum in hD investment calculation.")
					  }
					}

					// If heterozygous or cost too high:
					if ( ((this[currentGene][0] === true) && (this[currentGene][1] === false))
						     || ((this[currentGene][0] === false) && (this[currentGene][1] === true))
						     || (dominantOverflow === true) ) {
						// Check that adding the cost of the heterozygous gene would not push invSum
					  //  over
					  if ((invSum + (invPoaceae[currentGene][chosenFirst[1]])) <= 0) {
					  	// Cost is low enough to express this genotype.  Check to see if the 
					  	//  dominant gene has overflowed
					  	if (dominantOverflow === true) {  
					  		// Flip a coin, if heads the phenotype's first allele is now recessive
					  		if (GetBool() === true) {
					  			plantArray[phenID][currentGene][0] = false;
					  		}
					  		else {
					  			plantArray[phenID][currentGene][1] = false;
					  		}
					  	}
					  	invSum += (invPoaceae[currentGene][chosenFirst[1]]);
					  }

					  else if ((invSum + (invPoaceae[currentGene][chosenFirst[1]])) > 0) {
					  	// Cost is too high to express this genotype
					  	heteroOverflow = true;
					  }
					  else {
					  	console.log("Error, unexpected sum in hD investment calculation.");
					  }
					}

					// If homozygous recessive or cost too high:
					if ( ((this[currentGene][0] === false) 
								  && (this[currentGene][1] === false))
								  || (heteroOverflow === true) ) {
						if (heteroOverflow === true) {
							plantArray[phenID][currentGene][0] = false;
							plantArray[phenID][currentGene][1] = false;
						}
						// No else here, because at the moment nothing happens to recessive
						//  genotypes, as they have no investment cost
					}

					innerLooper ++;
					looper ++;
				}
			}

			else { console.log ("Error, unexpected value while looping through gene inv."); }
		}
	}

	// This function creates a list of viable adjectives which could apply to the plant
	//  in question, and saves an adjective randomly chosen from this list to the class
	//  instance.
	this.AssignAdjective = function() {
		var adjectiveArray = [];
		var looper = 0;
		var flavorArray = ["FL1", "FL2", "FL3"];
		var colorArray = ["CL1", "CL2", "CL3"];
		var fl1Value = 0;
		var fl2Value = 0;
		var fl3Value = 0;
		var cl1Value = 0;
		var cl2Value = 0;
		var cl3Value = 0;

		for (var property in adjectivePoaceaeBank) {
			if ((property === "MOI") || (property === "TEM")) {
				var propertyValue = plantArray[this.plantID][property];

				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					adjectiveArray[looper] = adjectivePoaceaeBank[property][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					adjectiveArray[looper] = adjectivePoaceaeBank[property][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					adjectiveArray[looper] = adjectivePoaceaeBank[property][2];
				}
				else {
					console.log("Error, unexpected adjective selection value.");
				}
			}

			else if (property === "FLX") {
				for (var geneNumber in flavorArray) {
					var gene = flavorArray[geneNumber];
					var propertyValue = plantArray[this.plantID][gene];

					if (gene === 'FL1') {
						if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
							fl1Value = 0;
						}
						else if (((propertyValue[0] === true) && (propertyValue[1] === false))
									|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
							fl1Value = 1;
						}
						else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
							fl1Value = 2;
						}
						else {
							console.log("Error, unexpected FL1 explanation value.");
						}
					}
					else if (gene === 'FL2') {
						if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
							fl2Value = 0;
						}
						else if (((propertyValue[0] === true) && (propertyValue[1] === false))
									|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
							fl2Value = 1;
						}
						else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
							fl2Value = 2;
						}
						else {
							console.log("Error, unexpected FL2 explanation value.");
						}
					}
					else if (gene === 'FL3') {
						if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
							fl3Value = 0;
						}
						else if (((propertyValue[0] === true) && (propertyValue[1] === false))
									|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
							fl3Value = 1;
						}
						else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
							fl3Value = 2;
						}
						else {
							console.log("Error, unexpected FL3 explanation value.");
						}

						// Now use the fl1 / 2 / 3Values to determine flavor
						if (((fl2Value === 0) || (fl2Value === 1))
						 && ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 0)) {
							adjectiveArray[looper] = "Sweet";
						}
						else if ((fl2Value === 2) && ((fl3Value === 0) || (fl3Value === 1))) {
							adjectiveArray[looper] = "Savory";
						}
						else if (fl3Value === 2) {
							adjectiveArray[looper] = "Bitter";
						}
						else {
							looper --;
						}
					}
					else {
						console.log("Error, unexpected flavor gene determination.");
					}
				}
			}

			else if (property === "CLX") {
				for (var geneNumber in colorArray) {
					var gene = colorArray[geneNumber];
					var propertyValue = plantArray[this.plantID][gene];

					if (gene === 'CL1') {
						if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
							cl1Value = 0;
						}
						else if (((propertyValue[0] === true) && (propertyValue[1] === false))
									|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
							cl1Value = 1;
						}
						else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
							cl1Value = 2;
						}
						else {
							console.log("Error, unexpected CL1 explanation value.");
						}
					}
					else if (gene === 'CL2') {
						if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
							cl2Value = 0;
						}
						else if (((propertyValue[0] === true) && (propertyValue[1] === false))
									|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
							cl2Value = 1;
						}
						else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
							cl2Value = 2;
						}
						else {
							console.log("Error, unexpected CL2 explanation value.");
						}
					}
					else if (gene === 'CL3') {
						if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
							cl3Value = 0;
						}
						else if (((propertyValue[0] === true) && (propertyValue[1] === false))
									|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
							cl3Value = 1;
						}
						else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
							cl3Value = 2;
						}
						else {
							console.log("Error, unexpected CL3 explanation value.");
						}

						// Now use the cl1 / 2 / 3Values to determine color
						if (((cl2Value === 0) || (cl2Value === 1))
						 && ((cl3Value === 0) || (cl3Value === 1)) && (cl1Value === 2)) {
							adjectiveArray[looper] = "Red";
						}
						else if (((cl1Value === 0) || (cl1Value === 1))
						 && ((cl3Value === 0) || (cl3Value === 1)) && (cl2Value === 2)) {
							adjectiveArray[looper] =  "Blue";
						}
						else if (((cl1Value === 0) || (cl1Value === 1))
						 && ((cl2Value === 0) || (cl2Value === 1)) && (cl3Value === 2)) {
							adjectiveArray[looper] = "Gold";
						}
						else if (((cl1Value === 0) || (cl1Value === 1))
						 && (cl2Value == 2) && (cl3Value === 2)) {
							adjectiveArray[looper] = "Cerulean";
						}
						else if (((cl2Value === 0) || (cl2Value === 1))
						 && (cl1Value == 2) && (cl3Value === 2)) {
							adjectiveArray[looper] = "Vermillion";
						}
						else if (((cl3Value === 0) || (cl3Value === 1))
						 && (cl1Value == 2) && (cl2Value === 2)) {
							adjectiveArray[looper] = "Indigo";
						}
						else if ((cl1Value === 2) && (cl2Value === 2) && (cl3Value === 2)) {
							adjectiveArray[looper] = "Carmine";
						}
						else {
							looper --;
						}
					}
				}
			}
			else {
				console.log("Error, unexpected adjective selectiong gene.")
			}

			looper ++;
		}

		var randomChoice = Math.floor(Math.random() * adjectiveArray.length);
		this.adjective = adjectiveArray[randomChoice];
	}

	// This is a function that enumerates the genotype's theoretical potential, or the 
	//  phenotype's expressed potential
	this.FullExplain = function(extra) {
		var currID = this.plantID;
		var tiTotal = 0;
		var szTotal = 0;
		var qtTotal = 0;
		var mivValue = 0;
		var mm1Value = 0;
		var mm2Value = 0;
		var fl1Value = 0;
		var fl2Value = 0;
		var fl3Value = 0;
		var psTotal = 0;
		var cl1Value = 0;
		var cl2Value = 0;
		var cl3Value = 0;

		DisplayOutput(plantArray[currID].adjective + " " 
				        + plantArray[currID].specName);
		DisplayOutput("<hr>", "noBreak");

		for (var property in plantArray[currID]) {
			var propertyValue = plantArray[currID][property];
			var message = ' ';
			if ((propertyValue[1] === true) || (propertyValue[1] === false)) {
				// For standard messages in the explanation message bank
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					message = genePoaceaeBank[property][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					message = genePoaceaeBank[property][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					message = genePoaceaeBank[property][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}

				// Print alleles, if 'extra' mode is enabled
				if (extra === true) {
					message += " [" + DisplayAlleles(propertyValue) + "]";
				}

				DisplayOutput(message);

				// For non-standard genes, print additional message
				if (property === 'TI1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						tiTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						tiTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						tiTotal += 0;
					}
					else {
						console.log("Error, unexpected TI1 explanation value.");
					}
				}
				else if (property === 'TI2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						tiTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						tiTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						tiTotal += 0;
					}
					else {
						console.log("Error, unexpected TI2 explanation value.");
					}
				}
				else if (property === 'TI3') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						tiTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						tiTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						tiTotal += 0;
					}
					else {
						console.log("Error, unexpected TI3 explanation value.");
					}
					// Take tiTotal and use it to express the plant's TI gene bonus (vigor)
					if (tiTotal <= 1) {
						message = ("Resulting Vigor: Very weak");
					}
					else if (tiTotal === 2) {
						message = ("Resulting Vigor: Relatively weak");
					}
					else if (tiTotal === 3) {
						message = ("Resulting Vigor: Somewhat strong");
					}
					else if ((tiTotal === 4) || (tiTotal === 5)) {
						message = ("Resulting Vigor: Relatively weak");
					}
					else if (tiTotal == 6) {
						message = ("Resulting Vigor: Very strong");
					}
					else {
						console.log("Error, unexpected tiTotal value.");
					}
					DisplayOutput(message + "<br>");
				}
				else if (property === 'MIV') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						mivValue = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						mivValue = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						mivValue = 2;
					}
					else {
						console.log("Error, unexpected MIV explanation value.");
					}
				}
				else if (property === 'MM1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						mm1Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						mm1Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						mm1Value = 2;
					}
					else {
						console.log("Error, unexpected MIV explanation value.");
					}
				}
				else if (property === 'MM2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						mm2Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						mm2Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						mm2Value = 2;
					}
					else {
						console.log("Error, unexpected MIV explanation value.");
					}
					// Now use the combination of mivValue, mm1Value, and mm2Value to determine
					//  the plant's morphology.

					// If MIV is cane
					if (mivValue === 2) {
						message = "Resulting Form: Cane";
					}
					// If MIV is seed head, MM2 is seed head, and MM1 is fox tail
					else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 0)
								 && (mm1Value === 2)) {
						message = "Resulting Form: Fox Tails";
					}
					// If MIV is seed head and MM2 is ear
					else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 1)) {
						message = "Resulting Form: Ears";
					}
					// If MIV is seed head and MM2 is husk
					else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 2)) {
						message = "Resulting Form: Husks";
					}
					// If MIV, MM1, and MM2 are seed head
					else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 0)
								&& ((mm1Value === 0) || (mm1Value === 1))) {
						message = "Resulting Form: Seed Heads";
					}
					else {
						console.log("Error, unexpected morphology selection value.");
					}
					DisplayOutput(message + "<br>");
				}
				else if (property === 'SZ1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						szTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						szTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						szTotal += 0;
					}
					else {
						console.log("Error, unexpected SZ1 explanation value.");
					}
				}
				else if (property === 'SZ2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						szTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						szTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						szTotal += 0;
					}
					else {
						console.log("Error, unexpected SZ2 explanation value.");
					}
					// Take szTotal and use it to express final seed size
					if (szTotal === 0) {
						message = "Resulting Seed Size: Worthless";
					}
					else if (szTotal === 1) {
						message = "Resulting Seed Size: Small";
					}
					else if ((szTotal === 2) || (szTotal === 3)) {
						message = "Resulting Seed Size: Medium";
					}
					else if (szTotal === 4) {
						message = "Resulting Seed Size: Large";
					}
					else {
						console.log("Error, unexpected szTotal value.");
					}

					DisplayOutput(message + "<br>");
				}
				else if (property === 'QT1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						qtTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						qtTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						qtTotal += 0;
					}
					else {
						console.log("Error, unexpected QT1 explanation value.");
					}
				}
				else if (property === 'QT2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						qtTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						qtTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						qtTotal += 0;
					}
					else {
						console.log("Error, unexpected QT2 explanation value.");
					}
					// Take szTotal and use it to express final seed size
					if (qtTotal === 0) {
						message = "Resulting Seed Quantity: Worthless";
					}
					else if (qtTotal === 1) {
						message = "Resulting Seed Quantity: Sparse";
					}
					else if ((qtTotal === 2) || (qtTotal === 3)) {
						message = "Resulting Seed Quantity: Moderate"
					}
					else if (qtTotal === 4) {
						message = "Resulting Seed Quantity: Plentiful";
					}
					else {
						console.log("Error, unexpected szTotal value.");
					}

					DisplayOutput(message + "<br>");
				}
				else if (property === 'PS1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						psTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						psTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						psTotal += 0;
					}
					else {
						console.log("Error, unexpected PS1 explanation value.");
					}
				}
				else if (property === 'PS2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						psTotal += 2;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						psTotal += 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						psTotal += 0;
					}
					else {
						console.log("Error, unexpected PS2 explanation value.");
					}
					// Take psTotal and use it to express final plant size
					if (psTotal === 0) {
						message = "Resulting Plant Size: Small";
					}
					else if ((psTotal === 1) || (psTotal === 2)) {
						message = "Resulting Plant Size: Medium";
					}
					else if ((psTotal === 3) || (psTotal === 4)) {
						message = "Resulting Plant Size: Large";
					}
					else {
						console.log("Error, unexpected szTotal value.");
					}

					DisplayOutput(message + "<br>");
				}
				else if (property === 'FL1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						fl1Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						fl1Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						fl1Value = 2;
					}
					else {
						console.log("Error, unexpected FL1 explanation value.");
					}
				}
				else if (property === 'FL2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						fl2Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						fl2Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						fl2Value = 2;
					}
					else {
						console.log("Error, unexpected FL2 explanation value.");
					}
				}
				else if (property === 'FL3') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						fl3Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						fl3Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						fl3Value = 2;
					}
					else {
						console.log("Error, unexpected FL3 explanation value.");
					}

					// Now use the fl1 / 2 / 3Values to determine flavor
					if (((fl2Value === 0) || (fl2Value === 1))
					 && ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 0)) {
						message = "Resulting Flavor: Sweet";
					}
					else if (((fl2Value === 0) || (fl2Value === 1))
					 			&& ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 1)) {
						message = "Resulting Flavor: Starchy";
					}
					else if (((fl2Value === 0) || (fl2Value === 1))
					 			&& ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 2)) {
						message = "Resulting Flavor: Mild";
					}
					else if ((fl2Value === 2) && ((fl3Value === 0) || (fl3Value === 1))) {
						message = "Resulting Flavor: Savory";
					}
					else if (fl3Value === 2) {
						message = "Resulting Flavor: Bitter";
					}
					else {
						console.log("Error, unexpected flavor determination.");
					}

					DisplayOutput(message + "<br>");
				}
				else if (property === 'CL1') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						cl1Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						cl1Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						cl1Value = 2;
					}
					else {
						console.log("Error, unexpected CL1 explanation value.");
					}
				}
				else if (property === 'CL2') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						cl2Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						cl2Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						cl2Value = 2;
					}
					else {
						console.log("Error, unexpected CL2 explanation value.");
					}
				}
				else if (property === 'CL3') {
					if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
						cl3Value = 0;
					}
					else if (((propertyValue[0] === true) && (propertyValue[1] === false))
								|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
						cl3Value = 1;
					}
					else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
						cl3Value = 2;
					}
					else {
						console.log("Error, unexpected CL3 explanation value.");
					}

					// Now use the cl1 / 2 / 3Values to determine color
					if (((cl2Value === 0) || (cl2Value === 1))
					 && ((cl3Value === 0) || (cl3Value === 1)) && (cl1Value === 2)) {
						message = "Resulting Color: Red";
					}
					else if (((cl1Value === 0) || (cl1Value === 1))
					 && ((cl3Value === 0) || (cl3Value === 1)) && (cl2Value === 2)) {
						message = "Resulting Color: Blue";
					}
					else if (((cl1Value === 0) || (cl1Value === 1))
					 && ((cl2Value === 0) || (cl2Value === 1)) && (cl3Value === 2)) {
						message = "Resulting Color: Gold";
					}
					else if (((cl1Value === 0) || (cl1Value === 1))
					 && (cl2Value == 2) && (cl3Value === 2)) {
						message = "Resulting Color: Cerulean";
					}
					else if (((cl2Value === 0) || (cl2Value === 1))
					 && (cl1Value == 2) && (cl3Value === 2)) {
						message = "Resulting Color: Vermillion";
					}
					else if (((cl3Value === 0) || (cl3Value === 1))
					 && (cl1Value == 2) && (cl2Value === 2)) {
						message = "Resulting Color: Indigo";
					}
					else if ((cl1Value === 2) && (cl2Value === 2) && (cl3Value === 2)) {
						message = "Resulting Color: Carmine";
					}
					else if (((cl1Value === 0) || (cl1Value === 1))
					 			&& ((cl2Value === 0) || (cl2Value === 1)) 
					 			&& ((cl3Value === 0) || (cl3Value === 1))) {
						message = "Resulting Color: Plain";
					}
					else {
						console.log("Error, unexpected color determination.");
					}

					DisplayOutput(message + "<br>");
				}
				// else {
				// 	console.log ("Error in non-standard messages, gene is " + property);
				// }
			}
		}

		// New line
		DisplayOutput(" ");
	}

	// This is a function that briefly describes the genotype's theoretical potential, or
	//  the phenotype's expressed potential
	this.BriefExplain = function() {
		// To fix: add mode to alter produceString to apply more correctly to cane plants
		var currID = this.plantID;
		var tiTotal = 0;
		var szTotal = 0;
		var qtTotal = 0;
		var aDefTotal = 0;
		var iDefTotal = 0;
		var mivValue = 0;
		var mm1Value = 0;
		var mm2Value = 0;
		var fl1Value = 0;
		var fl2Value = 0;
		var fl3Value = 0;
		var focusType = ' ';

		var typeString = "Type: <br>";
		var conditionString = "Ideal Conditions: <br>";
		var pestString = "Pests: <br>";
		var produceString = "Produces: <br>";

		DisplayOutput((plantArray[currID].adjective + " " 
									  + plantArray[currID].specName), "newDiv");
		DisplayOutput("<hr>", "noBreak");

		for (var gene in briefGenePoaceaeBank) {
			var propertyValue = plantArray[currID][gene]

			if (gene === "TI1") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					tiTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					tiTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					tiTotal += 0;
				}
				else {
					console.log("Error, unexpected TI1 explanation value.");
				}
			}
			else if (gene === "TI2") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					tiTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					tiTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					tiTotal += 0;
				}
				else {
					console.log("Error, unexpected TI2 explanation value.");
				}
			}
			else if (gene === "TI3") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					tiTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					tiTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					tiTotal += 0;
				}
				else {
					console.log("Error, unexpected TI3 explanation value.");
				}

				// Take tiTotal and use it to express the plant's TI gene bonus (vigor)
				if ((tiTotal === 0) || (tiTotal === 1)) {
					typeString += ("Very weak ");
				}
				else if (tiTotal == 2) {
					typeString += ("Relatively weak ");
				}
				else if (tiTotal === 3) {
					typeString += ("Somewhat strong ");
				}
				else if ((tiTotal === 4) || (tiTotal === 5)) {
					typeString += ("Strong ");
				}
				else if (tiTotal === 6) {
					typeString += ("Very strong ");
				}
				else {
					console.log("Error, unexpected tiTotal value.");
				}
			}
			else if (gene === "PER") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					typeString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					typeString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					typeString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}
			else if (gene === "CFX") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					typeString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					typeString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					typeString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}
			else if (gene === "MIV") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					mivValue = 0;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					mivValue = 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					mivValue = 2;
				}
				else {
					console.log("Error, unexpected MIV explanation value.");
				}
			}
			else if (gene === "MM1") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					mm1Value = 0;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					mm1Value = 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					mm1Value = 2;
				}
				else {
					console.log("Error, unexpected MM1 explanation value.");
				}
			}
			else if (gene === "MM2") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					mm2Value = 0;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					mm2Value = 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					mm2Value = 2;
				}
				else {
					console.log("Error, unexpected MM2 explanation value.");
				}

				// If MIV is cane
				if (mivValue === 2) {
					typeString += "with thick, rich canes ";
				}
				// If MIV is seed head, MM2 is seed head, and MM1 is fox tail
				else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 0)
							 && (mm1Value === 2)) {
					typeString += "with grain in fox tails ";
				}
				// If MIV is seed head and MM2 is ear
				else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 1)) {
					typeString += "with grain in ears ";
				}
				// If MIV is seed head and MM2 is husk
				else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 2)) {
					typeString += "with grain in leafy husks ";
				}
				// If MIV, MM1, and MM2 are seed head
				else if (((mivValue === 0) || (mivValue === 1)) && (mm2Value === 0)
							&& ((mm1Value === 0) || (mm1Value === 1))) {
					typeString += "with grain in seed heads ";
				}
				else {
					console.log("Error, unexpected morphology selection value.");
				}
			}
			else if (gene === "MOI") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					conditionString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					conditionString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					conditionString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}
			else if (gene === "TEM") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					conditionString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					conditionString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					conditionString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}
			else if (gene === "PST") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					conditionString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					conditionString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					conditionString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}
			else if (gene === "TOF") {
				// Do nothing, calculate all at DCP
			}
			else if (gene === "DFS") {
				// Do nothing, calculate all at DCP
			}
			else if (gene === "DCP") {
				iDefTotal = CalcPredDef(plantArray[currID], environmentPoaceae, "eIPD");
				aDefTotal = CalcPredDef(plantArray[currID], environmentPoaceae, "eAPD");
				if (iDefTotal >= 50) {
					pestString += "Strong insect resistance, ";
				}
				else if ((iDefTotal >= 25) && (iDefTotal < 50)) {
					pestString += "Moderate insect resistance, ";
				}
				else if (iDefTotal < 25) {
					pestString += "Low insect resistance, ";
				}
				else {
					console.log("Error, unexpected iDefTotal value.");
				}

				if (aDefTotal >= 25) {
					pestString += "strong mammal resistance ";
				}
				else if ((aDefTotal >= 12) && (aDefTotal < 25)) {
					pestString += "moderate mammal resistance ";
				}
				else if (aDefTotal < 12) {
					pestString += "low mammal resistance ";
				}
				else {
					console.log("Error, unexpected aDefTotal value.");
				}
			}
			else if (gene === "SZ1") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					szTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					szTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					szTotal += 0;
				}
				else {
					console.log("Error, unexpected SZ1 explanation value.");
				}
			}
			else if (gene === "SZ2") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					szTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					szTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					szTotal += 0;
				}
				else {
					console.log("Error, unexpected SZ1 explanation value.");
				}

				// Take szTotal and use it to express final seed size
				if (szTotal === 0) {
					produceString += "Incredibly small, ";
				}
				else if (szTotal === 1) {
					produceString += "Small size, ";
				}
				else if ((szTotal === 2) || (szTotal === 3)) {
					produceString += "Moderate size, ";
				}
				else if (szTotal === 4) {
					produceString += "Large size, ";
				}
				else {
					console.log("Error, unexpected szTotal value.");
				}
			}
			else if (gene === "QT1") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					qtTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					qtTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					qtTotal += 0;
				}
				else {
					console.log("Error, unexpected QT1 explanation value.");
				}
			}
			else if (gene === "QT2") {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					qtTotal += 2;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					qtTotal += 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					qtTotal += 0;
				}
				else {
					console.log("Error, unexpected QT2 explanation value.");
				}

				// Take szTotal and use it to express final seed quantity
				if (qtTotal === 0) {
					produceString += "extremely sparse, ";
				}
				else if (qtTotal === 1) {
					produceString += "low quantity, ";
				}
				else if ((qtTotal === 2) || (qtTotal === 3)) {
					produceString += "medium quantity, ";
				}
				else if (qtTotal === 4) {
					produceString += "high quantity, ";
				}
				else {
					console.log("Error, unexpected szTotal value.");
				}
			}
			else if (gene === 'FL1') {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					fl1Value = 0;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					fl1Value = 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					fl1Value = 2;
				}
				else {
					console.log("Error, unexpected FL1 explanation value.");
				}
			}
			else if (gene === 'FL2') {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					fl2Value = 0;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					fl2Value = 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					fl2Value = 2;
				}
				else {
					console.log("Error, unexpected FL2 explanation value.");
				}
			}
			else if (gene === 'FL3') {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					fl3Value = 0;
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					fl3Value = 1;
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					fl3Value = 2;
				}
				else {
					console.log("Error, unexpected FL3 explanation value.");
				}

				// Now use the fl1 / 2 / 3Values to determine flavor
				if (((fl2Value === 0) || (fl2Value === 1))
				 && ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 0)) {
					produceString += "sweet grain with ";
				}
				else if (((fl2Value === 0) || (fl2Value === 1))
				 			&& ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 1)) {
					produceString += "starchy grain with ";
				}
				else if (((fl2Value === 0) || (fl2Value === 1))
				 			&& ((fl3Value === 0) || (fl3Value === 1)) && (fl1Value === 2)) {
					produceString += "mild grain with ";
				}
				else if ((fl2Value === 2) && ((fl3Value === 0) || (fl3Value === 1))) {
					produceString += "savory grain with ";
				}
				else if (fl3Value === 2) {
					produceString += "bitter grain with ";
				}
				else {
					console.log("Error, unexpected flavor determination.");
				}
			}
			else if (gene === 'PRT') {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					produceString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					produceString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					produceString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}
			else if (gene === 'VIT') {
				if ((propertyValue[0] === true) && (propertyValue[1] === true)) {
					produceString += briefGenePoaceaeBank[gene][0];
				}
				else if (((propertyValue[0] === true) && (propertyValue[1] === false))
							|| ((propertyValue[0] === false) && (propertyValue[1] === true))) {
					produceString += briefGenePoaceaeBank[gene][1];
				}
				else if ((propertyValue[0] === false) && (propertyValue[1] === false)) {
					produceString += briefGenePoaceaeBank[gene][2];
				}
				else {
					console.log("Error, unexpected gene explanation value.");
				}
			}

			else if (gene === "RCH") {
				// Do nothing
			}
			else if (gene === "PS1") {
				// Do nothing
			}
			else if (gene === "PS2") {
				// Do nothing
			}
			else if (gene === "CL1") {
				// Do nothing
			}
			else if (gene === "CL2") {
				// Do nothing
			}
			else if (gene === "CL3") {
				// Do nothing
			}
			else {
				console.log("Error, unexpected value in brief gene description: " + gene);
			}
		}

		DisplayOutput(typeString + "<br>");
		DisplayOutput(conditionString + "<br>");
		DisplayOutput(pestString + "<br>");
		DisplayOutput((produceString + "<br> <br>"), "endDiv");
	}
}
Poaceae.prototype = new Family ();

var FieldArray = [];
function InitialFields() {
	for (var iii = 0; iii < 4; iii++) {
		var newFieldID = FieldArray.length;
		FieldArray[newFieldID] = new Field();
		FieldArray[newFieldID].climate = 'temperate';
		FieldArray[newFieldID].spot = iii;
	}
}

var iniMessageStage = 0;
function OpeningMessages() {
	if (iniMessageStage === 0) {
		DisplayOutput("There are four fields in a mild temperate climate.", 'newDiv');
		DisplayOutput(" ", 'endDiv');
		iniMessageStage++;
		OpeningMessages();
	}
	// Pause for two seconds
	else if (iniMessageStage === 1) {
		iniMessageStage++;
		setTimeout("OpeningMessages()", 2000);
	}
	else if (iniMessageStage === 2) {
		DisplayOutput("Enough seeds have been scavenged from the nearby land to fill them.", 
			'newDiv');
		DisplayOutput(" ", 'endDiv');
		iniMessageStage++;
		OpeningMessages();
	}
	// Pause for two seconds
	else if (iniMessageStage === 3) {
		iniMessageStage++;
		setTimeout("OpeningMessages()", 2000);
	}
	else if (iniMessageStage === 4) {
		GlobalWeather();

		if (glbMultiplier === "DryHot") {
			DisplayOutput("This year's weather looks to be dry and hot.", 'newDiv');
			DisplayOutput(" ", 'endDiv');
		}
		else if (glbMultiplier === "DryCld") {
			DisplayOutput("This year's weather looks to be dry and cold.", 'newDiv');
			DisplayOutput(" ", 'endDiv');
		}
		else if (glbMultiplier === "WetHot") {
			DisplayOutput("This year's weather looks to be wet and hot.", 'newDiv');
			DisplayOutput(" ", 'endDiv');
		}
		else if (glbMultiplier === "WetCld") {
			DisplayOutput("This year's weather looks to be wet and cold.", 'newDiv');
			DisplayOutput(" ", 'endDiv');
		}
		else {
			console.log("Error, unexpected weather message value.");
		}
	}
}

window.onload = function Initialize() {
	InitialFields();
	OpeningMessages();
	NewPlant("Poaceae", "Discover", "Wild Wheat", ' ', ' ');
	NewPlant("Poaceae", "Discover", "Wild Wheat", ' ', ' ');
	NewPlant("Poaceae", "Discover", "Wild Grain", ' ', ' ');
	NewPlant("Poaceae", "Discover", "Wild Grain", ' ', ' ');
}

function Test() {
	plantArray[0].FullExplain(true);
	plantArray[1].FullExplain(true);
	plantArray[2].FullExplain(true);
	plantArray[3].FullExplain(true);
}

function FieldClick(fieldNum) {
	var fieldString = ("");
	CloseAllMenus();
	var chosenIDString = ("hFieldMenu" + fieldNum);
	document.getElementById(chosenIDString).className = "visible harvestedList";
}

function CloseMenu(fieldNum) {
	var hIDString = ("hFieldMenu" + fieldNum);
	var cIDString = ("cFieldMenu" + fieldNum);
	if (document.getElementById(hIDString).className === "visible harvestedList") {
		document.getElementById(hIDString).className = "invisible harvestedList";
	}
	else if (document.getElementById(cIDString).className === "visible collectedList") {
		document.getElementById(cIDString).className = "invisible collectedList";
	}
}

function CloseAllMenus() {
	for (var iii = 0; iii < 4; iii++) {
		var hIDString = ("hFieldMenu" + iii);
		var cIDString = ("cFieldMenu" + iii);
		if (document.getElementById(hIDString).className === "visible harvestedList") {
			document.getElementById(hIDString).className = "invisible harvestedList";
		}
		else if (document.getElementById(cIDString).className === "visible collectedList") {
			document.getElementById(cIDString).className = "invisible collectedList";
		}
	}
}


function SeedClick(spot, plantNum) {
	// Open Plant Seed, Examine, and Cancel choices
	CloseAllSeedMenus(spot);
	// "pChoice" + seedID
	var seedID = ("seed" + spot + plantNum);
	document.getElementById("menu" + seedID).className = "visible";
	document.getElementById("pChoice" + seedID).className = "visible";
	document.getElementById("eChoice" + seedID).className = "visible";
	document.getElementById("cChoice" + seedID).className = "visible";
}

function CloseAllSeedMenus(fieldSpot) {
	for (var plantNum in plantArray) {
		var seedID = ("seed" + fieldSpot + plantNum);
		if (document.getElementById("menu" + seedID) != undefined) {
			document.getElementById("menu" + seedID).className = "invisible";
			document.getElementById("pChoice" + seedID).className = "invisible";
			document.getElementById("eChoice" + seedID).className = "invisible";
			document.getElementById("cChoice" + seedID).className = "invisible";
		}
	}
}
