playBackgroundMusic();
const imageArray=[
    {
        name:"barney",
        url:"/img/F Barney.png"
    },
    {
        name:"bamm",
        url:"/img/F Bamm.png"
    },
    {
        name:"fed",
        url:"/img/F Fred.png"
    },
    {
        name:"slate",
        url:"/img/F Slate.png"
    },
    {
        name:"wilma",
        url:"/img/F Wilma.png"
    },
    {
        name:"betty",
        url:"/img/F Betty.png"
    },
    {
        name:"barney",
        url:"/img/F Barney.png"
    },
    {
        name:"bamm",
        url:"/img/F Bamm.png"
    },
    {
        name:"fred",
        url:"/img/F Fred.png"
    },
    {
        name:"slate",
        url:"/img/F Slate.png"
    },
    {
        name:"wilma",
        url:"/img/F Wilma.png"
    },
    {
        name:"betty",
        url:"/img/F Betty.png"
    },
]

let openedCardCount=0;
let totalOpenedCount=0;
let correctOpenedCount=0;
let incorrectOpendCount=0;
imageArray.sort(()=>0.5-Math.random());
const gridDisplay= document.querySelector('#grid');
// gridDisplay.addEventListener(onclick,alert('hello2'))
console.log(imageArray)
function createGameBox(){
    imageArray.forEach((image,index)=>{
        const card=document.createElement('img');
        card.setAttribute('data-id',index);
        card.addEventListener('click',flipCard)
        card.setAttribute('src','/img/stone1.png');
        gridDisplay.appendChild(card);
    })
}
createGameBox();

async function flipCard(){
    // let image=imageArray[cardId];
    console.log(this)
    if(this.classList.contains('hide')) return
    if((document.getElementsByClassName('opened')).length >= 2) return;
    playSound('flip');
    totalOpenedCount++;
    this.setAttribute('src',imageArray[this.getAttribute('data-id')].url);
    this.classList.add('opened');
    openedCardCount++;
    console.log(openedCardCount)
    if(openedCardCount==2){
        await new Promise(resolve => setTimeout(resolve, 500));
        let opendCardList = document.getElementsByClassName('opened')
        let firstCard=opendCardList[0];
        let secondCard=opendCardList[1];
        console.log(firstCard,secondCard)
        if(firstCard.getAttribute('src')===secondCard.getAttribute('src')){
            if(correctOpenedCount!=10)playSound('match');
            firstCard.classList.add('hide');
            secondCard.classList.add('hide')
            correctOpenedCount++;
        }else{
            playSound('unmatch');
            firstCard.setAttribute('src','img/stone1.png');
            secondCard.setAttribute('src','img/stone1.png');
            incorrectOpendCount++;
        }
        firstCard.classList.remove('opened');
        secondCard.classList.remove('opened');
        openedCardCount=0;
        console.log("correct count: ",correctOpenedCount)
        if(correctOpenedCount==6){
            playSound('game-over');
            document.getElementById('final-score').innerText=Math.round(100/totalOpenedCount*6)+" %";
            document.getElementById('game-over-box').style.display ='flex'
            document.getElementById('restart-button').style.display ='none'      
        }
    }
    document.getElementById('turns').innerText=totalOpenedCount;
    document.getElementById('matches').innerText=correctOpenedCount;
    document.getElementById('umatches').innerText=incorrectOpendCount;
};

async function waitTime(time) {
    console.log('Do something');
    await new Promise(resolve => setTimeout(resolve, time));
    console.log('Do something after 2 seconds');
};
function restartGame(){
    location.reload();
}
function playSound(eventName) {
    // Create a new audio object
     if (eventName == 'flip') var audio = new Audio('sound-effects/flip-card.wav');
     if (eventName == 'match') var audio = new Audio('sound-effects/match-card.wav');
     if (eventName == 'unmatch') var audio = new Audio('sound-effects/unmatch-card.wav');
     if (eventName == 'game-over') var audio = new Audio('sound-effects/game-over.wav');
    // Play the sound
    audio.play();
}

function playBackgroundMusic() {
    // Create a new Audio object
    var audio = new Audio('sound-effects/background.wav');
    
    // Function to play the audio and loop when it ends
    function playLoop() {
        audio.play(); // Play the audio
        audio.volume=0.25;
        audio.addEventListener('ended', function() {
            // When the audio ends, play it again
            playLoop();
        });
    }
    
    // Start playing the audio continuously
    playLoop();
}