
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [ 
    {songName: "Rolex BGM", filePath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName: "Ae Dill hai mushkil", filePath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName: "Jadogar", filePath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName: "Ram Siya Ram", filePath: "songs/4.mp3", coverpath: "covers/2.jpg"},
    {songName: "Ae Dill hai mushkil", filePath: "songs/5.mp3", coverpath: "covers/5.jpg"},


]

songItems.forEach((Element,i) => {
    Element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    Element.getElementsByClassName("songName")[0].innerText=songs[i].songName
})

//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0){
      audioElement.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');
      gif.style.opacity = 1;
    }  
    else{
        audioElement.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');

      gif.style.opacity = 0;
      
    }
});


//listen to events
audioElement.addEventListener('timeupdate',() => {
   
   //update seekbar
   progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   console.log(progress);
   myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

 const makeAllPlays = () => {

  Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
    Element.classList.remove('bi-pause-circle');
     Element.classList.add('bi-play-circle');
    })
}


  Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
  Element.addEventListener('click',(e)=>{
    console.log(e.target);
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('bi-play-circle');
    e.target.classList.remove('bi-pause-circle');
     audioElement.src = `songs/${songIndex+1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     gif.style.opacity = 1;
     masterPlay.classList.remove('bi-play-fill');
     masterPlay.classList.add('bi-pause-fill');

})

})

  document.getElementById('next').addEventListener('click',() => {
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
  })

  document.getElementById('previous').addEventListener('click',() => {
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
  })