const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button, blower;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr, rope2;

var bg_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bg_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    W = displayWidth;
    H = displayHeight;
    createCanvas(displayWidth+50,displayHeight+50)

  }else{
    W = windowWidth;
    H = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  frameRate(80);

  bg_song.play();
  bg_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(100, 30);
  button.size(50, 50);
  button.mouseClicked(drop);
  
  button3 = createImg('cut_button.png')
  button3.position(250,30)
button3.size(50,50);
button3.mouseClicked(drop1)

buttonr = createImg('cut_btn.png');
buttonr.position(280,200);
buttonr.size(50,50);
buttonr.mouseClicked(drop2);

  button1 = createImg('balloon.png')
  button1.position(80,200);
  button1.size(90,100);
  button1.mouseClicked(fruitFall);

  button2 = createImg('mute.png');
  button2.position(350,30);
  button2.size(30,30);
  button2.mouseClicked(soundmute)

  rope = new Rope(7, { x: 105, y: 30 });
  rope1 = new Rope(7,{x:275,y:30});
  rope2 = new Rope(7,{x:300,y:200})
  ground = new Ground(width/2, 690, width, 20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(W/2, H/2, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
fruit_corn = new Link(rope1,fruit);
fruit_corrn = new Link(rope2,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, windowWidth, windowHeight);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  rope.show();
  rope1.show()
  rope2.show();
  
  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');
    eating_sound.play()
  }


  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    bg_song.stop()
    sad_sound.play();
    fruit = null;

  }


}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play()
}
function drop1(){
rope1.break()
fruit_corn.detach();
fruit_corn = null;
cut_sound.play()
}
function drop2(){
  rope2.break()
  fruit_corrn.detach();
  fruit_corrn = null;
  cut_sound.play()
  }

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}
function fruitFall(){

Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
air.play();}

function soundmute(){
if(bg_song.isPlaying()){
  bg_song.stop()
}else{
  bg_song.play();
}}