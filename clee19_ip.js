
//because all the timer packages in meteor is not working or does not suit my purpose, I have developed my own by
//referring to http://stackoverflow.com/questions/15229141/simple-timer-in-meteor-js

var clock = 60;
//var timeUp = false; //add this variable to code for what happens when the game is over;

var timeLeft = function() {
    var user = Meteor.user().profile;
    if (clock > 0) {
        clock--;
        Session.set("time", clock);
        $('#clock').text(clock);
        } else { //when the yimr is up
            console.log("Time is up!");
            $('#alertmessage').text("Gmae Over!"); //if time is up, display the message that the game is over
            if(user.highscore < score){
                Meteor.users.update( { _id: Meteor.userId() }, {$set:{ "profile.highscore": score}}); //save the user highscore if the 
                //current score is higher than user's previous score
            }
            //the user will level up everytime the user has accumulated 5000 points 
            var currentlevel = user.level;
            var newAccumP = user.accumPoints + score;
            var newlevel = Math.floor((newAccumP/5000))+1;
            console.log(newlevel);
            if (newlevel > currentlevel) {
                //if the user has accumulated 5000 points, the user will be notified the level up
                $('#levelup').text("Congratulations! You have leveled up. You are now level "+newlevel+".");
                Meteor.users.update( { _id: Meteor.userId() }, {$set:{ "profile.level": newlevel}})
            } else {
                //the user will be notified how many points is left for the next level up 
                var nextlev = (newlevel)*5000;
                var untilnext = nextlev - newAccumP;
                $('#levelup').text("You have "+untilnext+"points remaining until next Levelup.");
            
            }
            //save the data of user accumulated points
            Meteor.users.update( { _id: Meteor.userId() }, {$set:{ "profile.accumPoints": newAccumP}})
            $('#myModal').foundation('reveal', 'open');
            return Meteor.clearInterval(interval);
        }
    };

var interval = Meteor.setInterval(timeLeft, 1000);

if (Meteor.isClient) {
    //this is for the battle mode: myMatcher = new RandomOpponentMatcher('my-matcher')
 
    //this function is to dynamically display the countdown
    Template.registerHelper("time", function() {
    return Session.get("time");
  });
    
    //I used session values to make my meteor app a single page app by dynamically showing different templates
    Session.setDefault('page', 'menu');

    UI.body.helpers({
        isPage: function(page){
            return Session.equals('page', page)
        }
    });

    UI.body.events({
        'click #start': function(event, template){
            Session.set('page', 'start')
        },
        'click #start2': function(event, template){
            Session.set('page', 'start')
        },
        'click #achieve': function(event,template){ //to be updated
            Session.set('page', 'achieve')
        },
         'click #about': function(event,template){
            Session.set('page', 'about')
        },
         'click #points': function(event,template){
            Session.set('page', 'points')
        },
        'click #reviewNote': function(event,template){
            Session.set('page', 'review')
        },
        'click #reviewNote2': function(event,template){
            Session.set('page', 'review')
        },
        'click #previewNote': function(event,template){
            Session.set('page', 'preview')
        },
        'click #Tournament': function(event,template){
            Session.set('page', 'tournament')
        },
         'click #menu1': function(event,template){
            Session.set('page', 'menu')
        },
        'click #menu2': function(event,template){
            Session.set('page', 'menu')
        },
        'click #menu3': function(event,template){
            Session.set('page', 'menu')
        },
        'click #menu4': function(event,template){
            Session.set('page', 'menu')
        },
        'click #menu5': function(event,template){
            Session.set('page', 'menu')
        },
        'click #menu6': function(event,template){
            Session.set('page', 'menu')
        },
        'click #battle': function(event,template){ //to be implemented
            Session.set('page', 'battle')
        }
    });
    //------------------------------------------------------------------------------------------------------------
    
    //the body helpers allow me to set up user profile options and retrieve date from the user profiles
    Template.body.helpers({
           firstName: function(){
            var user = Meteor.user(); 
            if (user) {
                return user.services.facebook.first_name;    
            } 
        },
   
        profileURL: function() {
            var user = Meteor.user(); 
            if (user) {
                return user.services.facebook.picture; 
            } 
        },
        initializePoints: function(){
            var name = Meteor.user().services.facebook.name;
            var photo = Meteor.user().services.facebook.picture;
            console.log("first time user, updating fields")
            Meteor.users.update({_id:Meteor.user()._id}, {$set:{profile: {highscore: 0, level: 1, accumPoints: 0, name: name, photo: photo}}});
        },
        
        pointsImplemented: function(){
            console.log("You have already initialized the points");
        },
        
        userhaspoints: function(){
            var you = Meteor.user().profile;
            console.log(you);
            if (you.hasOwnProperty("highscore")){
                return true;
                } else{
                return false;
                }
        },
        
         myPoints: function() {
            return Meteor.user().profile;
        },
        
        level: function(){
            var you = Meteor.user().profile;
            return you.level;
        }
        
    });

    
    var submittedWords = [];
    var score = 0;
    var c1="ㄱ";
    var c2="ㄱ";
    
    Template.start.helpers({
        //the following helper function is needed to give and display the players 2 random consonants needed for the game
        'consonant1': function(){
            //returns two random consonants from the seleciton 
            var consonants = ["ㄱ","ㄴ","ㄷ", "ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅍ","ㅎ"]; //selected common consonants used in the korean language
            var randomnum1 = Math.floor(Math.random()*consonants.length);
            var randomitem1 = consonants[randomnum1];
            c1 = randomitem1;
            return randomitem1;
        },
        'consonant2': function(){
            //returns two random consonants from the seleciton 
            var consonants = ["ㄱ","ㄴ","ㄷ", "ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅍ","ㅎ"]; //selected common consonants used in the korean language
            var randomnum1 = Math.floor(Math.random()*consonants.length);
            var randomitem1 = consonants[randomnum1];
            c2 = randomitem1;
            return randomitem1;
        }
    
    });
    
    Template.menu.events({
          //everytime the user clicks start the clock will start at 60
        'click #start': function(){
            clock = 60;
    }
       
   });

    
Template.start.events({
    //the following code is the major part of the game functionality 
      'submit .word': function (event) {// This function is called everytime a word is submitted in the text form by the user
          
//-----------the following code is from: http://zetawiki.com/wiki/UTF-8_한글_초성_추출_(자바스크립트)
          var text = event.target.text.value;
          //to check if the word submitted by the user has the given consonant I will use the following code to seperate the consonants
          //from theuser input
          var cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
          var result = "";
            for(i=0;i<text.length;i++) {
                code = text.charCodeAt(i)-44032;
                if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
            }
//----the code ends here--------------------------------------------------------------------------------

          
//-----the following code checks if the given consonant is included in the user input and uses the wiktionary api to determine if the word exists
        var given= c1+c2;
          console.log(given);
         
          var baseURL = 'http://ko.wiktionary.org/w/api.php?&format=json&action=query&titles='; //the korean wicktionary in json format
          var searchURL = baseURL + text + "&rvprop=content&prop=revisions&redirects=1";
          var keyId = 0;
           $.ajax({
    	url: searchURL,
    	dataType: 'jsonp',
    	success: function(data){
			console.log("Checking if the word exists in Wiktionary...");
            var wordData = data.query.pages
			keyId = Object.keys(wordData)[0];
            if (text == ""){ //when nothing is submitted
              $('#alertmessage').text("Please enter a word"); //this alerts the user to type in the word
            } else if (result == given) { //if the submitted word has the given consonant the words 
              if(submittedWords.indexOf(text) >= 0){ //check if the word was already submitted or not
                  console.log("the word has already been submitted");
                  $('#alertmessage').text("The word has already been submitted -30points");
                  score = score - 30; //the user will lose 50 points if they repeat a word
                    $('#score').text(score);
              } else {// if not check if the word exists
                  if(keyId > 0) { //if the word exists it will be added to the submitted word list  
                      //the keyId is -1 for words that do not exist
                      console.log("A new word is submitted and it exists in the Wictionary data");
                      $('#alertmessage').text("Good Job!" + text + ", +200 Points" );
                      submittedWords.push(text);
                      score = score + 200; //the player will earn 200 points
                      $('#score').text(score);
                      $('#ys').text(score);
                      $('#submittedwords').text(submittedWords);
                  } else {
                  console.log("the word does not exist");
                  $('#alertmessage').text("The word does not exist in the Dictionary. -50 Points");
                  score = score - 50; //if the word does not exist, the player will lose 30 points;
                  $('#score').text(score);
                  }
              }
              
              
          } else { //if the word is submitted without the given consonant is submitted it will reduce the point by 30 points 
             console.log("wrong word");
              $('#alertmessage').text("The word does not include the given consonant. -100 Points")
             score = score - 100;
             $('#score').text(score);
          }
            
            
        }
 });
    
 
    event.target.text.value = ""; //clears form everytime a word is submitted

    // Prevent default form submit
    return false;
  }
    
});
            
//---------------------------------------------------------------------------------------------------------

    
  
    Template.points.helpers({
        //these helper functions return the necessary user information needed to be displayed in the leaderboard
        pointInfo: function() {
            return Meteor.users.find({}, {sort:{profile: {highscore: -1, name: 1}}});
        },
        users: function(){
            return Meteor.users.find({}, {"services.facebook.name": 1, 
                             "services.facebook.picture": 1,
                                         });
        },
    
        username: function(){
            return this.profile.name;
        },
    
        photoURL: function(){
            return this.profile.photo;
        },
        
        userHighscore: function(){
            var you = Meteor.user().profile;
            return you.highscore;
        },
        you: function(){
            return Meteor.user().services.facebook.name;
        },
        level: function(){
            return Meteor.user.profile.level;
        }

        
                                      
    });
    
    Template.body.events({
        "click #startmenu": function(){ 
            //I needed this button to reload the meteor page to go back to the menu page so the timer works by reseting the timeleft interval
            //also it ensures me that the submitted word list and score will be reset as well 
            location.reload();
        }
    })
    
   /* This code will be worked on over the summer to implement battle mode  
   Template.battle.events({
         'click .clickMatchesWithOpponent': function(event, template){
             console.log("you are matched");
             myMatcher.add()
        }
    }); */
    
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
    //Meteor.users.remove([]);
    Accounts.onCreateUser(function(options, user) {
    if (typeof(user.services.facebook) != "undefined") {
        user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    };
    return user;
});
    
    /* This code is for the realtime battle mode
    I am using peppelg:random-opponent-matcher package to randomly match two users and the code was developed in reference to 
    http://stackoverflow.com/questions/28733243/meteor-realtime-game-match-two-players-according-to-their-score
    new RandomOpponentMatcher('my-matcher', {name: 'fifo'}, function(user1, user2){
    Create the match/game they should play.
        
}) */
}
