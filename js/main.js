const feeds = [
    "https://s1-bos.liveatc.net/rjtt_control?nocache=2025012621072571077",
    "https://s1-bos.liveatc.net/eidw8?nocache=2025012621080842797",
    "https://s1-fmt2.liveatc.net/einn2_high1?nocache=2025012621130068055",
    "https://s1-fmt2.liveatc.net/usdd1?nocache=2025012621123514037",
    "https://s1-bos.liveatc.net/lhbp_twr3?nocache=2025012621191925036",
    "https://s1-bos.liveatc.net/ltba_s?nocache=2025012621094646498",
    "https://s1-bos.liveatc.net/uhhh2?nocache=2025012621172158490", 
    "https://s1-bos.liveatc.net/opla_atis?nocache=2025012621150324346",
    "https://s1-fmt2.liveatc.net/ltfj2?nocache=2025012621445312087",
    "https://s1-bos.liveatc.net/vhhh5?nocache=2025012621484253371",
    "https://s1-bos.liveatc.net/sazn_twr?nocache=2025012621502528156",
    "https://s1-bos.liveatc.net/ksgf2_app?nocache=2025021722362081063",
    "https://s1-bos.liveatc.net/epkk_app?nocache=2025021722393194100"

];

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let audioPlayers = [];

// Helper function to get three random feeds
function getRandomFeeds() {
    const shuffled = feeds.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
}

// Play the selected feeds
startButton.addEventListener('click', () => {
    const selectedFeeds = getRandomFeeds();
    audioPlayers = selectedFeeds.map(feed => {
        const audio = new Audio(feed);
        audio.loop = true; // Loop the audio indefinitely
        audio.play();
        return audio;
    });

    startButton.style.display = 'none';
    stopButton.style.display = 'inline';
});

// Stop all playing feeds
stopButton.addEventListener('click', () => {
    audioPlayers.forEach(player => {
        player.pause();
        player.src = ""; // Clear the source to stop loading
    });
    audioPlayers = [];

    stopButton.style.display = 'none';
    startButton.style.display = 'inline';
});