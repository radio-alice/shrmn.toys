const finalDirs = [
  `shake it up like there's a little bug in there you're trying to kill!`,
  `put ur dick in it and gently stir.`,
  `tongue it like you're lapping it up but just let it dribble back out of
  your mouth into the cup.`,
  `call your racist uncle and ask him what he thinks about unions then hold
  your phones speaker up to the cup to let his thoughts permeate your drink`
];

const nameFinals = ['Boot', 'Hulk', 'Hammer', 'Lube', 'Bomb', 'Velvet',
                    'Smoothie', 'Corruption Scandal', 'Revenue', 'Environment',
                    'Fuckshake', 'Rectum', 'Fizz', 'Bird', 'Bastard', 'Funk',
                    'Killer', 'Infection', 'Epidemic', 'Mycorrhizae', 'Worm',
                    'Slammer', 'Foot Fetish', 'Angst', 'Bong Water', 'Hi-fi'];

function onSubmit() {
  const sour = document.getElementsByName("sour")[0].value;
  const sweet = document.getElementsByName("sweet")[0].value;
  const liq = document.getElementsByName("liq")[0].value;
  const name = nameCock(sour, sweet, liq);
  renderRecipe(name, sour, sweet, liq);
}

function nameCock(sour, sweet, liq){
  const ingredients = [sour, sweet, liq];
  const ingredient = ingredients[Math.floor(Math.random() * 3)].toUpperCase();
  const end = nameFinals[Math.floor(Math.random() * nameFinals.length)];
  return ingredient + ingredient[ingredient.length - 1]
          + "Y " + end.toUpperCase();
}

function renderRecipe(name, sour, sweet, liq){
  if (sour == "" || sweet == "" || liq == ""){
    window.alert("TRY AGAIN");
    return;
  }
  const main = document.getElementsByTagName('main')[0]
  const recipe = [
    "First add .75 oz of " + sour,
    "Next add .75 ounces of " + sweet,
    "Then fuck it up with 2 ounces of " + liq
  ];
  const final = "Finally, " +
                finalDirs[Math.floor(Math.random() * finalDirs.length)];

  document.getElementById('recipe').innerHTML =
   `<h1>${name}</h1>
    <ul>
      <li>${recipe[0]}</li>
      <li>${recipe[1]}</li>
      <li>${recipe[2]}</li>
      <li>${final}</li>
    </ul>`
}