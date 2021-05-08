//Create variables here
var dog, happyDog;
var foodS,foodStock
var dataBase;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10)
  dog.addImage(dogImg)
  dog.scale = 0.3
  //happyDog = createSprite(250,250,10,10)
  //happyDog.addImage(dogImg1)
  database = firebase.database()
  foodStock = database.ref('food')
  foodStock.on("value",readStock);
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  
  background(46,139,87);

  foodObj.display()

  fedTime = dataBase.ref("lastFed");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  drawSprites();
  //add styles here
  fill("white")
  textSize(20)
  text("Food remaining : "+foodS,170,100);


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

 
  database.ref('/').update({ food:x })
}
