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
    scale(0.7),
    area(),
    'space-invader'
  ],
  '!' : () => [
    sprite("wall"),
    area(),
    'left-wall'
  ],
  '&' : () => [
    sprite("wall"),
    area(),
    'right-wall'
  ],
});

//add players
const player = add([
  sprite('spaceShip'),
  pos(width()/2, height()/2),
  origin('center'),
  area(),
  'space-ship'
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
  pos(300,250),
  layer('ui'),
  scale(1.5),
  {
    value : 0,
  }
]);

//keeping track of time
const TIME_LEFT = 20;

const timer = add([
  text('0:00'),
  pos(300, 350),
  layer('ui'),
  scale(1),
  {
    time : TIME_LEFT
  }
]);

timer.action( ()=> {
  timer.time -= dt();
  timer.text = timer.time.toFixed(2);
  if(timer.time <= 0) {
    go('lose', score.value); //go to the scene 'lose' and pass the score value
    timer.text = "GAME OVER";
  }
})

//adding actions to space invaders
const INVADER_SPEED = 150;
let CURRENT_SPEED = INVADER_SPEED;
const LEVEL_DOWN = 250;

action('space-invader', (invader) => {
  invader.move(CURRENT_SPEED, 0)
});

collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED;
  every('space-invader', (invader) => {
    invader.move(0, LEVEL_DOWN);
  })
});

collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED;
  every('space-invader', (invader) => {
    invader.move(0, LEVEL_DOWN);
  })
});


//action when player collides with space invader
collides('space-invader', 'space-ship', () => {
  go('lose', score.value);
});

//end the game when space invaders are below  a certain point
action('space-invader', (s) => {
  if(s.pos.y >= height()/2){
    go('lose', score.value);
  }
})



/*************LOSE SCENE****************/
scene("lose", (score) => {
  add([
  text("Final score: " + score),
  origin('center'),
  scale(0.6),
  pos(width()/2, height()/2)
])
});