This is a firefox extension which allows you to search for anything on the 5E standard reference document quickly, without needing to change tabs while making a character sheet or playing on roll20
It works by looking for an exact match for your search query, and displaying the information if there is a match, or looking for something that contains your query if there is no exact match
There's also a small bit of error handling for typing a query in GB English instead of US English (e.g. paralysed -> paralyzed) and quirks in the api (e.g. charisma -> cha)
The possible endpoints are kept locally as a json to reduce the number of api calls needed to the DND API

Known exceptions/issues:
- only one feat, grappler, is in the SRD, so searching for other feats won't work
- only one background, acolyte, is in the SRD
- the equipment category endpoint was removed as each subendpoint just returns a list of all the items of that type, which would flood the popup
  and doesn't add anything useful information-wise
- likewise with proficiencies, it just returns the item and its relevant entry under equipment
- there are two known glitches at present, one of which is caused by how firefox handles manifest v3, where it perma-displays a notification dot.
- the other bug is that the extension sometimes lags if you search for something with more than one option, e.g. acolyte which can be both a monster and a background