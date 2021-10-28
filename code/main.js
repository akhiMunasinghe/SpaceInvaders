import kaboom from "kaboom";

// initialize context
kaboom();

// load assets
loadSprite("sapceInvador", "sprites/spaceInvador.png");
loadSprite("wall", "sprites/wall.png");
loadSprite("spaceShip", "sprites/spaceShip.png")

//add levels to the game
addLevel([
  '!^^^^^^^^^^^^   &',
  '!^^^^^^^^^^^^   &',
  '!^^^^^^^^^^^^   &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
],{
  width : 30,
  height : 22,
  '^' : () => [
    sprite("sapceInvador"),
    scale(0.7)
  ],
  '!' : () => [
    sprite("wall"),
    'left-wall'
  ],
  '&' : () => [
    sprite("wall"),
    'right-wall'
  ],
});

//add players
const player = add([
  sprite('spaceShip'),
  pos(width()/2, height()/2),
  origin('center')
]);