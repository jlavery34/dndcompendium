const endpointTypes = [
    "/ability-scores/",
    "/alignments/",
    "/backgrounds/",
    "/classes/",
    "/conditions/",
    "/damage-types/",
    "/equipment/",
    "/equipment-categories/",
    "/feats/",
    "/features/",
    "/languages/",
    "/magic-items/",
    "/magic-schools/",
    "/monsters/",
    "/proficiencies/",
    "/races/",
    "/rule-sections/",
    "/rules/",
    "/skills/",
    "/spells/",
    "/subclasses/",
    "/subraces/",
    "/traits/",
    "/weapon-properties/"
]; //all possible endpoints from the api

document.getElementById('submit').addEventListener('click', async function () {
    var name = document.getElementById('search').value.replace(/ /g, '-'); //replaces any spaces with hyphens for the urls
    var query = name.toLowerCase(); //convert to lower case to match the json
    let regex = new RegExp("^/api/.*/" + query + "$"); //regexp to match with the urls e.g. it'll be api/(any endpoint)/(user query) for a match
    var result = await findMatch(regex) //find an exact match with the regex


    if (result) { //if there was an exact match e.g. the user entered bard 
        let type = await getType(result); //find the endpoint it belongs to so we know which sub-endpoints to display for the user
        console.log(type);
        //then we will call each function to display a result: TODO
        sortResult(result, type); //sort the result with its type
    }
    else { //no exact match, lets find something that at least contains the user's query
        result = await findContains(query);
        if (result) {
            let type = await getType(result);
            console.log(type);
            sortResult(result, type);
        }
        else { //let the user know that no match was found
            var resultDiv = document.getElementById('result');
            resultDiv.innerText = '';
            var h2 = document.createTextNode("No result found");
            resultDiv.appendChild(h2);
        }

    }
});

/*var resultDiv = document.getElementById('result');
resultDiv.innerText = '';
var h2 = document.createTextNode(result);
resultDiv.appendChild(h2);*/

function sortResult(result, type) {
    switch (type) {
        case "/ability-scores/":
            outputAbilityScores(result);
            break;
        case "/alignments/":
            outputAlignments(result);
            break;
        case "/backgrounds/":
            outputBackgrounds(result);
            break;
        case "/classes/":
            outputClasses(result);
            break;
        case "/conditions/":
            outputConditions(result);
            break;
        case "/damage-types/":
            outputDamageTypes(result);
            break;
        case "/equipment/":
            outputEquipment(result);
            break;
        case "/equipment-categories/":
            outputEquipmentCategories(result);
            break;
        case "/feats/":
            outputFeats(result);
            break;
        case "/features/":
            outputFeatures(result);
            break;
        case "/languages/":
            outputLanguages(result);
            break;
        case "/magic-items/":
            outputMagicItems(result);
            break;
        case "/magic-schools/":
            outputMagicSchools(result);
            break;
        case "/monsters/":
            outputMonsters(result);
            break;
        case "/proficiencies/":
            outputProficiencies(result);
            break;
        case "/races/":
            outputRaces(result);
            break;
        case "/rule-sections/":
            outputRuleSections(result);
            break;
        case "/rules/":
            outputRules(result);
            break;
        case "/skills/":
            outputSkills(result);
            break;
        case "/spells/":
            outputSpells(result);
            break;
        case "/subclasses/":
            outputSubclasses(result);
            break;
        case "/subraces/":
            outputSubraces(result);
            break;
        case "/traits/":
            outputTraits(result);
            break;
        case "/weapon-properties/":
            outputWeaponProperties(result);
            break;
        default:
            console.log("Unknown type: " + type);
    }
}

async function findMatch(regex) {
    try {
        return fetch("endpoints/endpoints.json")
            .then(response => response.json())
            .then(urls => {
                let result = urls.find(str => regex.test(str));
                console.log(result);
                return result;
            });
    }
    catch (error) {
        console.log("Error: " + error.message);
        return "none found";
    }
}

async function findContains(query) {
    try {
        return fetch("endpoints/endpoints.json")
            .then(response => response.json())
            .then(urls => {
                let result = urls.find(str => str.includes(query));
                console.log(result);
                return result;
            });
    }
    catch (error) {
        console.log("Error: " + error.message);
        return "none found";
    }
}



async function getType(result) {
    try {
        for (var i = 0; i < endpointTypes.length; i++) {
            if (result.includes(endpointTypes[i])) {
                return endpointTypes[i]
            }
        }
    }
    catch {
        return "no type found";
    }

}

//functions to output based exactly on the endpoint's available descriptors

//ability-scores


//classes

async function outputClasses(result) { //code gore
    try {
        const response = await fetch('https://www.dnd5eapi.co' + result);
        const data = await response.json(); //class isn't allowed as a var name
        var resultDiv = document.getElementById('result');
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (data.name) {
            var h2 = document.createElement('h2');
            h2.textContent = data.name;
            resultDiv.appendChild(h2);
            if (data.hit_die) {
                var p = document.createElement('p');
                p.textContent = "Hit die: " + data.hit_die; 
                resultDiv.appendChild(p);
            }
            if (data.proficiency_choices && data.proficiency_choices[0] && data.proficiency_choices[0].desc) {
                var p = document.createElement('p');
                p.textContent = "Proficiency choices: " + data.proficiency_choices[0].desc;
                resultDiv.appendChild(p);
            }
            if (data.proficiencies) {
                let profs = '';
                for (var i = 0; i < data.proficiencies.length; i++) {
                    profs += data.proficiencies[i].name + " ";
                }
                if (profs) {
                    var p = document.createElement('p');
                    p.textContent = "Proficiencies: " + profs; //to get the line breaks
                    resultDiv.appendChild(p);
                }
            }
            if (data.starting_equipment) {
                let stEquip = '';
                for (var i = 0; i < data.starting_equipment.length; i++) {
                    stEquip += data.starting_equipment[i].quantity + " " + data.starting_equipment[i].equipment.name + " ";
                }
                if (stEquip) {
                    var p = document.createElement('p');
                    p.textContent = "Starting equipment: " + stEquip;
                    resultDiv.appendChild(p);
                }
            }
            if (data.starting_equipment_options){
                let stEquipOpt = '';
                for (var i = 0; i < data.starting_equipment_options.length; i++){
                    stEquipOpt += data.starting_equipment_options[i].choose + " of " + data.starting_equipment_options[i].desc; //should look like "1 of rapier, longsword, or any simple weapon", for example"
                    stEquipOpt += " ";
                }
                if (stEquipOpt){
                    var p = document.createElement('p');
                    p.textContent = "Starting options: " + stEquipOpt;
                    resultDiv.appendChild(p);
                }
            }
            if (data.spellcasting) {
                var p = document.createElement('p');
                p.textContent = "Spellcasting ability: " + data.spellcasting.spellcasting_ability.name;
                resultDiv.appendChild(p);
            }
        } else {
            var h2 = document.createElement('h2');
            h2.textContent = "Item not found";
            resultDiv.appendChild(p);
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

async function outputSpells(result) {
    try {
        const response = await fetch('https://www.dnd5eapi.co' + result);
        const data = await response.json(); //class isn't allowed as a var name
        var resultDiv = document.getElementById('result');
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (data.name) {
            var h2 = document.createElement('h2');
            h2.textContent = data.name;
            resultDiv.appendChild(h2);
            if (data.desc) {
                var p = document.createElement('p');
                p.textContent = data.desc; 
                resultDiv.appendChild(p);
            }
            if (data.higher_level) {
                var p = document.createElement('p');
                p.textContent = data.higher_level[0]; 
                resultDiv.appendChild(p);
            }
            if (data.range) {
                var p = document.createElement('p');
                p.textContent = "Range: " + data.range;
                resultDiv.appendChild(p);
            }
            if (data.area_of_effect) {
                var p = document.createElement('p');
                p.textContent = "Area of effect: " + data.area_of_effect.size + "ft " + data.area_of_effect.type;
                resultDiv.appendChild(p);
            }
            if (data.components) {
                let components = '';
                for (var i = 0; i < data.components.length; i++) {
                    components += data.components[i] + " ";
                }
                if (components) {
                    var p = document.createElement('p');
                    p.textContent = "Components: " + components; //to get the line breaks
                    resultDiv.appendChild(p);
                }
            }
            if (data.casting_time) {
                var p = document.createElement('p');
                p.textContent = "Cast time: " + data.casting_time;
                resultDiv.appendChild(p);
            }
            if (data.duration) {
                var p = document.createElement('p');
                p.textContent = "Duration: " + data.duration;
                resultDiv.appendChild(p);
            }
            if (data.level) {
                var p = document.createElement('p');
                p.textContent = "Level: " + data.level;
                resultDiv.appendChild(p);
            }
            if(data.concentration == true){
                var p = document.createElement('p');
                p.textContent = "Requires concentration";
                resultDiv.appendChild(p);
            }
        } else {
            var h2 = document.createElement('h2');
            h2.textContent = "Item not found";
            resultDiv.appendChild(p);
        }
    } catch (error) {
        console.error('Error:', error);
    }

}