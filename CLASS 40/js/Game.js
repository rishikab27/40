class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1I);
    car2 = createSprite(300,200);
    car2.addImage(car2I);
    car3 = createSprite(500,200);
    car3.addImage(car3I)
    car4 = createSprite(700,200);
    car4.addImage(car4I);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    background("black");

    image(trackI,0 ,-displayHeight*4  ,displayWidth ,displayHeight*5  )

    Player.getPlayerInfo();
    player.getRank();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 270;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 310;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          ellipse(x,y,70,70)
         

          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        fill(255)
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name,x,y+80);
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    console.log(player.distance)



   if(player.distance>200){
      gameState=2;
      rank= rank+1;
      player.rank = rank;
      player.update()
      player.updateRank(rank)
    }
    drawSprites();
  }




  end(){
    background("gold")

    
    image(pod,displayWidth/2-350,displayHeight/2);

    textSize(20);
    fill("black")
    for(var plr in allPlayers){

      if(allPlayers[plr].rank ===1){
        text(allPlayers[plr].name,displayWidth/2,displayHeight/2-400)
      }

      else if(allPlayers[plr].rank ===2){
        
        text(allPlayers[plr].name,displayWidth/2-100,displayHeight/2-400)
      }

      else if(allPlayers[plr].rank ===3){
        text(allPlayers[plr].name,displayWidth/2+100,displayHeight/2-400)
        
      }

     


    }

    
    

  }
}
