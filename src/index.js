const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score= document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay= document.querySelector('#timer'); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";
let previousHole = "";
let duration = 0;

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  console.log("SETDELAY" , difficulty);
  if (difficulty === 'easy'){
    // setDelay("easy");
    return 1500;
  } else if (difficulty === 'normal'){
    //  setDelay("normal");
      return 1000; 
  } else {
    // setDelay("hard");
    return randomInteger(700, 856);
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {
  console.log("CHOOSEHOLES", holes);
  // TODO: Write your code here.
  // const holes = document.querySelectorAll('.hole');
  // if hole === lastHole then call chooseHole(holes) again;
  // if hole is not the same as the lastHole then keep track of 
  // it (lastHole = hole) and return the hole;
  // chooseHole(holes);
    const index = randomInteger(0, 8);
    const hole = holes[index];
    if (hole === lastHole) {
      return chooseHole(holes);
    }
    lastHole = hole;
    return hole;
  }

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  console.log("GAMEOVER");
  // TODO: Write your code here
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId;
  } else {
    gameStopped = stopGame();
    return gameStopped;
  }
  
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  console.log("SHOWUP");
  let delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  let hole = chooseHole(holes);  // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
       toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class
    //  when the timer times out.
    toggleVisibility(hole);  
  console.log("TIME2", time);
  if (stopGame) {
    console.log("GAMEOVER" );
  
     gameOver();
   }
  }, delay); 
  // TODO: change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  // if hole has the 'show' class then remove it, else add it
  if (hole.classList.contains('show')) {
    hole.classList.remove('show');
  } else {
    hole.classList.add('show');
  }
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  console.log("UPDATESCORE")
  // TODO: Write your code here
// let points = 0; increment by 1point 

// console.log("SCORE", score) 
  // let points = 0;
  // points = points+1;
  points+=1;
  console.log("POINTS", points);
  console.log("SCORE", score);
  score.textContent = points;
  return points;
}


/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  console.log("CLEARSCORE")
  // TODO: Write your code here
  points = 0;
  score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  console.log("UPDATETIMER")
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  if (time > 0){
    time -= 1;
    // console.log("TIMERDISPLAY", timerDisplay)
    timerDisplay.textContent = time;
  }
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  console.log("STARTTIMER")
  // TODO: Write your code here
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  console.log("WHACK")
  // TODO: Write your code here.
  // call updateScore()
  // 
  updateScore();
  // moles.addEventListener('click', whack);
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  console.log("setEventListeners");
  // TODO: Write your code here
 // forEach mole add the whack event handler when a player clicks on the mole.
    // return moles; 
  // for (let i = 0; i < moles.length; i++) {
  //   moles[i].addEventListener('click', whack);    
  // }
  moles.forEach(mole => mole.addEventListener('click', whack));
    return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  console.log("SETDURATION", duration);
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
* This function starts the game when the `startButton` is clicked and initializes the game by performing the following steps: 

 * 1. Clears the score using `clearScore()`. 

 * 2. Sets the game duration using `setDuration()`. 

 * 3. Sets up event listeners on the moles using `setEventListeners()`.

 * 4. Starts the game timer by calling `startTimer()`.  

 * 5. Begins the game loop by calling `showUp()` to display moles. 


 * Note: Simply uncommenting `setDuration(10);` and `showUp();` is not enough. 
To make the game work, ensure all necessary functions listed above are called to
 initialize the score, timer, event listeners, and mole appearances. 
*/
function startGame(){
  setDuration(20);
  
  // stopGame();   //optional
  
  showUp();
  setEventListeners();
  startTimer();
  clearScore();
  
  return "game started";
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
