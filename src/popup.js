document.getElementById('submit').addEventListener('click', function() {
    var name = document.getElementById('search').value.replace(/ /g, '-');
    findSpells(name)
        .then(found => {
            if (!found) {
                findMonsters(name)
                    .then(found => {
                        if (!found) {
                            var p = document.createElement('p');
                            p.textContent = 'No results found';
                            document.getElementById('result').appendChild(p);
                        }
                    });
            }
        });
});

async function findSpells(name){
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

async function findMonsters(name){
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
