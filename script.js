let songs = [
    { songName: "One Love", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Kaayi", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Daylight", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Nee Singham Dhan", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" }
];

let currentSongIndex = 0;
const mainplay = document.getElementById("mainplay");
const audioElement = document.getElementById("audioPlayer");
const currentSongName = document.getElementById("currentSongName");
const prevSong = document.getElementById("prevSong");
const nextSong = document.getElementById("nextSong");
const myProgressBar = document.getElementById("myProgressBar");
const songIcons = document.querySelectorAll(".eachicon img"); // Select all song icons

let isPlaying = false;

// Function to update icons for all songs
function updateIcons() {
    // Reset all icons to play.svg
    songIcons.forEach((icon) => {
        icon.src = "play.svg";
    });

    // Set the current playing song's icon to pause.svg
    if (isPlaying) {
        songIcons[currentSongIndex].src = "pause.svg";
    }
}

// Function to play a song
function playSong(index) {
    // Pause currently playing song if a new song is selected
    if (isPlaying && currentSongIndex !== index) {
        pauseSong();
    }

    // Update the current song index and play the song
    currentSongIndex = index;
    audioElement.src = songs[index].filePath;
    audioElement.play();
    isPlaying = true;
    mainplay.src = "pause.svg";
    currentSongName.textContent = songs[index].songName;

    // Update the song icons
    updateIcons();
}

// Function to pause the current song
function pauseSong() {
    audioElement.pause();
    isPlaying = false;
    mainplay.src = "play.svg";

    // Update the song icons
    updateIcons();
}

// Play/pause toggle for the main play button
mainplay.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong(currentSongIndex);
    }
});

// Play the previous song
prevSong.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        currentSongIndex -= 1;
        playSong(currentSongIndex);
    }
});

// Play the next song
nextSong.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex += 1;
        playSong(currentSongIndex);
    }
});

// Update the progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Seek functionality for the progress bar
myProgressBar.addEventListener("input", (e) => {
    console.log(e.target.value)
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Add click event listeners to each song icon
songIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        if (currentSongIndex === index && isPlaying) {
            // If the clicked song is currently playing, pause it
            pauseSong();
        } else {
            // Otherwise, play the selected song
            playSong(index);
        }
    });
});
