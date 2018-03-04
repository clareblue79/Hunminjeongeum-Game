# Hunminjeongeum: The Korean Language Game
## Wellesley CS249 Web Mashup Individual Project

**By Clare Lee**

Please check out the demo: https://youtu.be/8CVxSdKdVDE (with Voiceover)

_Design Update_: https://youtu.be/ILQ50aym3y4


_How the Game Works_: Each round is played for 60 seconds while the player insers as many words as possible that contains the given consonant. The consonants are given randomly using the math random function to return random consonants from an array of commonly occuring consonant combinations. The consonants are displayed with a customized image I developed using photoshop; the images use the colors commonly used in Korean traditional paintings, and the font was downloaded from naver.com. The inserted words are all displayed and updated dynamically below the input box, and the scores is evaluated and updated depending on the inserted words. To help the players understand how the score is being evaluated, a message is displayed on top of the input box everytime the player inserts a word. 

When a word is inserted, the word is first checked if it includes the given consonant; if the given word does not include the given consonant the score is deducted by 100 points. If the word includes the given consonant, the word is then checked if it has already been submitted. If it has been submitted before, the score is deducted by 50 points. Finally, if the word includes the given consonant and also the has NOT been submitted, the game talks to the Wiktionary API to check if the word exists. If the word does not exist, the score is deducted by 30 points. If the word fulfills all the conditions, the player earns 200 points. When the time is up, the current score is saved, checked if the score is the player's new highscore, and accumulated to calculate the player's level.


_The Timer_: Because the timer packages in meteor does not work for the application, I developed my own by referring to this [page](https://stackoverflow.com/questions/15229141/simple-timer-in-meteor-js). The timer uses the session value, to dynamically change the number, counting down per second (which uses the interval function). When the time is up, the interval function is cleared so the timer does not go below 0. When the timer reaches 0, a modal is revealed to display the player's final score and current level. The message in the modal is determined by rather the user has scored a new highscore, or leveled up. If the player has not leveled up, the message displays how much more points the player needs to accumulate to level up to the next level.


_The Consonants_: For each word input, the word is seperated by its consonants and vowels based on the Korean UTF code. I used the code from this [site](http://zetawiki.com/wiki/UTF-8_%ED%95%9C%EA%B8%80_%EC%B4%88%EC%84%B1_%EC%B6%94%EC%B6%9C_(%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)) to separate the consonants from a player's input. Seperating the consonants is important because I need the result to determine rather the input includes the given consonant or not.


_The UI/UX_: The application uses the "accounts:ui" package and the "accounts:facebook" package to have the users login to the application through their facebook accounts. The application also be uses the "ewall:foundation" package to enhance the user interface. After the player's facebook login, the app displays the main page. This application is a one page app using Meteor.js, which allows dynamic display of different templates as the player clicks the menu buttons. The game has three templates, the game interface, leaderboard, and finally the instructions page.

In order to display the templates dynamically, the app uses the "Sessions" variable, setting the session page variable to different values as the player clicks the menu button. When each button is clicked, there is a menu button on the top right corner, which reloads the page to display the main page. Reloading the page allows to display the main page as the session variable is set to default onload, which is the main menu template. Reloading the page also allows the game to reset the timer, score, and other values, so the player can play the game in a fresh state. The whole user interface is in Korean, as the target audience is Korean users who are interested in Korean language games.

_The Wiktionary API_: Despite my extensive research, there is no open data sources for the Korean Language. Thus, I used the Wiktionary API for the Korean Wiktionary data. The applications makes an ajax request to talk to the Korean Wiktionary API everytime a player submits a word. When the submitted word is searched, the ajax request returns an object with a keyId that pertains to the word. For words that do not exist in the Wiktionary data, the keyId is returned as -1. Thus, I determined rather the word exists or not by checking rather the keyID is bigger than 0 or not. The problem with the usage of this API is that the Korean Wiktionary is yet to be developed. There are words that have not been submitted in the korean Wiktionary data, while it exists in the official Korean Dictionary. 
