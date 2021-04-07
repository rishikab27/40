class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset= createButton("RESET")
  
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);
    

    this.input.position(displayWidth/2 -160 , displayHeight/2 - 50);
    this.input.style("width","500px")
    this.input.style("height","70px");
    this.input.style("font-size","40px")

    this.button.position(displayWidth/2 - 40, displayHeight/2+60);
    this.button.style("width","300px")
    this.button.style("height","70px")
    this.button.style("font-size","40px")

    this.reset.position(displayWidth-300,50);
    this.reset.style("width","170px")
    this.reset.style("height","50px")
    this.reset.style("font-size","30px")

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      
    });



    this.reset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
      player.updateRank(0);
      database.ref("/").update({
        players :null
      })
    })

    

  }
    
  
    
 
}
