

- also need to remove the last | from any combined divs since it looks messy








***DONE***:

- change the users entry to remove spaces
- search the json for exact matches first (avoid e.g. someone searching bard and getting bardic inspiration back)
- THEN search the json for anything that contains their query (avoid someone searching bardic inspiration and getting no results since they didn't do bardic inspiration d6 exactly)
- fetch it from the dnd5eapi
- get the type (spell, monster, etc) by substringing by the slashes and getting the second one, removing API and the name 
- switch case based on type to call functions
- the functions then pass the data to the HTML file in the appropriate format by looking for the correct subtypes in the json e.g. desc, size, weight 


***
- need to add a function so if there's an exact match for more than two for the pattern /api/%any%/$query then the user can pick the relevant one based on type
-- e.g. "did you mean halfling (race) or halfling (language)"
- fix hideous css styling
-- maybe make background colour red and the divs white instead

