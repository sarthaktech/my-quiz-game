class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()

    //write code to change the background color here
    background("Yellow")

    //write code to show a heading for showing the result of Quiz
    textSize(25)
    text("Result of quiz",340,50)

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()

    
    //write condition to check if contestantInfor is not undefined
    if(allContestant!==undefined){
      var displayAnswer=230
      fill("Blue")
      textSize(15)
      text("*Note--Contestant Who Answered Correct Is Highlighted In Green Color",130,230)

      for(var plr in allContestant){
        var correctans="2"
        if(correctans===allContestant[plr].answer){
          fill("green")
        }else{
          fill("red")}
          displayAnswer+=30
          textSize(25)
          text(allContestant[plr].name + ": " + allContestant[plr].answer,250,displayAnswer)
        
      }
    }

    
  }

}
