playBackgroundMusic();
const imageArray=[
    {   id:1,
        name:"barney",
        url:"/img/Barney.png"
    },
    {   id:2,
        name:"bamm",
        url:"/img/Bamm.png"
    },
    {   id:3,
        name:"fed",
        url:"/img/Fred.png"
    },
    {   id:4,
        name:"slate",
        url:"/img/Slate.png"
    },
    {   id:5,
        name:"wilma",
        url:"/img/Wilma.png"
    },
    {   id:6,
        name:"betty",
        url:"/img/Betty.png"
    },
    {   id:7,
        name:"barney",
        url:"/img/Barney.png"
    },
    {   id:8,
        name:"bamm",
        url:"/img/Bamm.png"
    },
    {   id:9,
        name:"fred",
        url:"/img/Fred.png"
    },
    {   id:10,
        name:"slate",
        url:"/img/Slate.png"
    },
    {   id:11,
        name:"wilma",
        url:"/img/Wilma.png"
    },
    {   id:12,
        name:"betty",
        url:"/img/Betty.png"
    },
]

let openedCardCount=0;
let totalOpenedCount=0;
let correctOpenedCount=0;
let incorrectOpendCount=0;
imageArray.sort(()=>0.5-Math.random());
const gridDisplay= document.querySelector('#grid');
// gridDisplay.addEventListener(onclick,alert('hello2'))
// console.log(imageArray)
function createGameBox(){
    imageArray.forEach((image,index)=>{
        const card=document.createElement('img');
        card.setAttribute('data-id',index);
        card.addEventListener('click',flipCard)
        card.setAttribute('src','/img/Q.png');
        gridDisplay.appendChild(card);
    })
}
createGameBox();

async function flipCard(){
    // let image=imageArray[cardId];
    // console.log(this)
    if(this.classList.contains('hide')||this.classList.contains('opened')) return
    if((document.getElementsByClassName('opened')).length >= 2) return;
    playSound('flip');
    totalOpenedCount++;
    this.setAttribute('src',imageArray[this.getAttribute('data-id')].url);
    this.classList.add('opened');
    openedCardCount++;
    // console.log(openedCardCount)
    if(openedCardCount==2){
        await new Promise(resolve => setTimeout(resolve, 500));
        let opendCardList = document.getElementsByClassName('opened')
        let firstCard=opendCardList[0];
        let secondCard=opendCardList[1];
        
        // console.log(firstCard,secondCard)
        if(firstCard.getAttribute('src')===secondCard.getAttribute('src')){
            if(correctOpenedCount!=10)playSound('match');
            firstCard.classList.add('hide');
            secondCard.classList.add('hide')
            correctOpenedCount++;
        }else{
            playSound('unmatch');
            firstCard.setAttribute('src','img/Q.png');
            secondCard.setAttribute('src','img/Q.png');
            incorrectOpendCount++;
        }
        firstCard.classList.remove('opened');
        secondCard.classList.remove('opened');
        openedCardCount=0;
        // console.log("correct count: ",correctOpenedCount)
        if(correctOpenedCount==6){
            playSound('game-over');
            document.getElementById('final-score').innerText=Math.round(100/totalOpenedCount*12)+" %";
            document.getElementById('game-over-box').style.display ='flex'
            document.getElementById('restart-button').style.display ='none'      
        }
    }
    document.getElementById('turns').innerText=totalOpenedCount;
    document.getElementById('matches').innerText=correctOpenedCount;
    document.getElementById('umatches').innerText=incorrectOpendCount;
};

async function waitTime(time) {
    // console.log('Do something');
    await new Promise(resolve => setTimeout(resolve, time));
    // console.log('Do something after 2 seconds');
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