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

function sortResult(result, type){
    switch(type){
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



async function findSpells(name) {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/spells/' + name);
        const spell = await response.json();
        var resultDiv = document.getElementById('result');
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (spell.name) {
            var h2 = document.createElement('h2');
            h2.textContent = spell.name;
            var p = document.createElement('p');
            if (spell.desc) {
                p.textContent = spell.desc[0];
            } else {
                p.textContent = 'Description not available';
            }
            resultDiv.appendChild(h2);
            resultDiv.appendChild(p);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function findMonsters(name) {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters/' + name);
        const monster = await response.json();
        var resultDiv = document.getElementById('result');
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (monster.name) {
            var h2 = document.createElement('h2');
            h2.textContent = monster.name;
            var p = document.createElement('p');
            if (monster.size) {
                p.textContent = 'Size: ' + monster.size;
            } else {
                p.textContent = 'Size not available';
            }
            resultDiv.appendChild(h2);
            resultDiv.appendChild(p);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function findClasses(name) {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/classes/' + name);
        const classes = await response.json(); //class not allowed as const name
        var resultDiv = document.getElementById('result');
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (classes.name) {
            var h2 = document.createElement('h2');
            h2.textContent = classes.name;
            var p = document.createElement('p');
            if (classes.desc) {
                p.textContent = classes.desc[0];
            } else {
                p.textContent = 'Description not available';
            }
            resultDiv.appendChild(h2);
            resultDiv.appendChild(p);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function findFeatures(name) {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/features/' + name);
        const feat = await response.json();
        var resultDiv = document.getElementById('result');
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (feat.name) {
            var h2 = document.createElement('h2');
            h2.textContent = feat.name;
            var p = document.createElement('p');
            if (feat.desc) {
                p.textContent = feat.desc[0];
            } else {
                p.textContent = 'Description not available';
            }
            resultDiv.appendChild(h2);
            resultDiv.appendChild(p);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}