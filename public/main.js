const number_of_words = 6;
const number_of_chars = 5;
let containerDiv = document.getElementById("container");

for (let i = 0; i < number_of_words; i++) {
  let word = document.createElement("div");
  word.className = "word";
  for (let j = 0; j < number_of_chars; j++) {
    let char = document.createElement("div");
    char.className = "char";
    word.appendChild(char);
  }
  containerDiv.appendChild(word);
}
let currentchar = 0;
let currentword = 0;

addEventListener("keydown", async  function (event)  {
  let letter = event.key;
  let wordiv = containerDiv.children[currentword];

  if (event.code == "Backspace") {
    let charToDel = wordiv.children[currentchar - 1];
    charToDel.innerHTML = "";
    currentchar--;
  } else if (event.code == "Enter") {
    if (currentchar == number_of_chars) {
      const word =getcurrentword();
      animateCSS(wordiv,"shakeY")
      const result =await(await fetch("/wordle/"+ word)).json();  
      for(let i=0; i<result.length ; i++){
        wordiv.children[i].style.background= result[i]
      }
      let counter = 0;
      for(let i=0; i<result.length ; i++){
        if(result[i] == "green"){
          counter++;
        }
      }
      if(counter == 5){
        await fetch("/change-word");
        location.reload();
      }
      currentword++;
      currentchar=0;
      
    }
  } else if (currentchar < number_of_chars && islatter(letter)) {
    let chararr = wordiv.children[currentchar];
    chararr.innerHTML = letter;
    currentchar++;
  }
});
function getcurrentword() {
  let word = "";
  let wordiv = containerDiv.children[currentword];
  for (let i = 0; i < number_of_chars; i++) {
    let chardiv = wordiv.children[i];
    word = word + chardiv.innerHTML;
  }
  return(word);
}


function islatter(str){
  return str.length===1 && str.match(/[a-z]/i)
}
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
   

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });