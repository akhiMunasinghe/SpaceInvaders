import kaboom from "kaboom";

// initialize context
kaboom();

// load assets
loadSprite("sapceInvador", "sprites/spaceInvador.png");
loadSprite("wall", "sprites/wall.png");
loadSprite("spaceShip", "sprites/spaceShip.png")

//defining layers (obj-> for players , ui-> to store score. Obj is the default layer)
layer(['obj', 'ui'], 'obj')

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

//player movement
const MOVE_SPEED = 200;

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
});

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
});

//keeping the score of player
const score = add([
  text('0'),
  pos(300,300),
  layer('ui'),
  scale(2),
  {
    value : 0,
  }
])