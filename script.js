let songs = [
    { sName: "All Time Low", singer: "Jon Bellion", time: "3:35" },
    { sName: "Boulevard Of Broken Dreams", singer: "Green Day", time: "4:39" },
    { sName: "Easier", singer: "5 Seconds of Summer", time: "2:57" },
    { sName: "God Is A Woman", singer: "Ariana Grande", time: "3:12" },
    { sName: "Grenade", singer: "Bruno Mars", time: "3:43" },
    { sName: "Like I'm Gonna Lose You", singer: "Meghan Trainor ft. John Legend", time: "3:24" }
];


let songIdx = 0;
let audioElement = new Audio('music/1.mp3');
let seekbar  =  document.getElementById('seekbar');
let play =      document.querySelector('.play-pause');
let prev =      document.querySelector('.prev');
let next =      document.querySelector('.next');
let plIcon =    document.querySelector('.pl-icon');
let closeIcon = document.querySelector('.close-icon');
let container = document.querySelector('.container');
let myLibrary = document.querySelector('.myLibrary');
let dur = document.querySelector('.dur');
let curr = document.querySelector('.curr');
let songList = document.querySelectorAll('.songList');
let songName =  document.querySelector('.song-name')
let songSinger =  document.querySelector('.song-singer')



let pauseIcon = '<i class="fa-solid fa-pause"></i>'
let playIcon = '<i class="fa-solid fa-play"></i>'
let thumbnail =  document.querySelector('.thumbnail');


//! Play-Pause

play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        play.innerHTML = pauseIcon
        thumbnail.classList.add('rot');
    }
    else{
        audioElement.pause();
        play.innerHTML = playIcon
        thumbnail.classList.remove('rot');
    }
});

plIcon.addEventListener('click', () =>{
    myLibrary.style.display = 'block';    
});

closeIcon.addEventListener('click', () =>{
        myLibrary.style.display = 'none';
    });
    
    
  
    // Function to format time in minutes:seconds
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        if (secs < 10) secs = "0" + secs;
        return `${minutes}:${secs}`;
    }
    
function updateseeking(){
    // Update the seekbar's max value when metadata is loaded (duration is available)
    audioElement.addEventListener('loadedmetadata', () => {
        seekbar.max = audioElement.duration;
        dur.textContent = formatTime(audioElement.duration);
    });

    // Update the seekbar as the audio plays
    audioElement.addEventListener('timeupdate', () => {
        seekbar.value = audioElement.currentTime;
        curr.textContent = formatTime(audioElement.currentTime);
    });

    // Seek to a new position in the audio when the user interacts with the seekbar
    seekbar.addEventListener('input', () => {
        audioElement.currentTime = seekbar.value;
    });
}
updateseeking();
    // myLibrary Ke naam updating

    songs.forEach((e, index) =>{
        if (songList[index]){
        songList[index].querySelector('.name').textContent = e.sName;
        songList[index].querySelector('.singer').textContent = e.singer;
        songList[index].querySelector('.time').textContent = e.time;
        }
    })

    function removeBoxShadowFromAll() {
        Array.from(document.getElementsByClassName('songList')).forEach((e) => {
            e.style.boxShadow = ""; // or "none" to remove shadow completely
        });
    }

   Array.from(document.getElementsByClassName('songList')).forEach((e)=>{
       e.addEventListener('click', (item)=>{
           item.stopPropagation();

           removeBoxShadowFromAll()
           
           if (audioElement.play()){
               audioElement.pause();
            }
            e.style.boxShadow = "2px 2px 7px black inset, -2px -2px 7px #0093E9 inset";
            
            console.log(e.id)
            
            let itemIndex =  e.id;
            audioElement = new Audio(`music/${itemIndex}.mp3`);
            audioElement.play();
            play.innerHTML=pauseIcon;
            updateseeking();
            function namekaran(){
            songName.textContent = songs[itemIndex-1].sName;
            songSinger.textContent = songs[itemIndex-1].singer;
        }
        namekaran();
        next.addEventListener('click', ()=>{
            audioElement.pause()
            removeBoxShadowFromAll()
            if (itemIndex>=0 && itemIndex<6){itemIndex++;}
            audioElement = new Audio(`music/${itemIndex}.mp3`);
            audioElement.play();
            namekaran();
            updateseeking();
            if (songList[itemIndex-1]) {
                songList[itemIndex-1].style.boxShadow = "2px 2px 7px black inset, -2px -2px 7px #0093E9 inset";
            }            
        });
        prev.addEventListener('click', ()=>{
            removeBoxShadowFromAll()
            audioElement.pause()
            if (itemIndex>1 && itemIndex<6){itemIndex--;}
            audioElement = new Audio(`music/${itemIndex}.mp3`);
            audioElement.play();
            namekaran();
            updateseeking();
            if (songList[itemIndex-1]) {
                songList[itemIndex-1].style.boxShadow = "2px 2px 7px black inset, -2px -2px 7px #0093E9 inset";
            }            
            });

        });
    });



