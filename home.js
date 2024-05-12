playBackgroundMusic();
async function startGame(){
    playSound();
    await new Promise(resolve => setTimeout(resolve, 1800));
    window.location.href = "game.html";
}
function playSound() {
    // Create a new audio object
     var audio = new Audio('sound-effects/run.mp3');
    audio.play();
}
function playBackgroundMusic() {
    // Create a new Audio object
    var audio = new Audio('sound-effects/home-background.wav');
    
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