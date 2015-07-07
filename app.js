
var cnt=0;
var PLAY_TIME = 2;
var BEAT= 8;
var BPM = 60;
var tid;
var pl = new Array(PLAY_TIME*BEAT);//cnt stay in
var time_imgs = new Array(PLAY_TIME*BEAT);//images of tempo
var cur_imgs = new Array(PLAY_TIME*BEAT);
var bass_imgs = new Array(PLAY_TIME*BEAT);
var tam1_imgs = new Array(PLAY_TIME*BEAT);
var hat_imgs = new Array(PLAY_TIME*BEAT);

var bass = new Array(PLAY_TIME*BEAT);//bassのフラグ
var tam1 = new Array(PLAY_TIME*BEAT);//tam1のフラグ
var hat = new Array(PLAY_TIME*BEAT);//hatのフラグ
//音源のロード関係の変数

var time_img="./icons/time.png";
var cur_img="./icons/current.png";
var slot_img="./icons/slot.png";
var full_img="./icons/slotfull.png";

var audioctx;
var bufferLoader;

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}


function init(){
  console.log("init");
  for(i=0; i<PLAY_TIME*BEAT; i++){
    var img=document.createElement('img');
    img.src=time_img;
    document.getElementById("time_field").appendChild(img);
    time_imgs[i]=img;

    var bass_slot=document.createElement('img');
    bass_slot.src=slot_img;
    document.getElementById("bass_field").appendChild(bass_slot);
    bass_imgs[i]=bass_slot;

    var tam1_slot = document.createElement('img');
    tam1_slot.src=slot_img;
    document.getElementById("tam1_field").appendChild(tam1_slot);
    tam1_imgs[i]=tam1_slot;

    var hat_slot = document.createElement('img');
    hat_slot.src=slot_img;
    document.getElementById("hat_field").appendChild(hat_slot);
    hat_imgs[i]=hat_slot;

    bass[i]=false;
    tam1[i]=false;
    hat[i]=false;
  }

  //AudioContextの作成
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioctx = new AudioContext();
  //音楽のロード
  bufferLoader = new BufferLoader(
    audioctx,
    [
      './music/rhythm.wav',
      './music/bass.wav',
      './music/tam1.wav',
      './music/hat.wav',
    ],
    function(){
      console.log("finish load.");
    }
  );
  bufferLoader.load();
}
function Play(buf) {
    var src = audioctx.createBufferSource();
    src.buffer = buf;
    src.connect(audioctx.destination);
    src.start(0);
}


function start(){

  if((cnt-1)<0){
    time_imgs[PLAY_TIME*BEAT-1].src=time_img;
  }else{
    time_imgs[cnt-1].src=time_img;
  }
  time_imgs[cnt].src=cur_img;
  //document.querySelector("#rhythm").play();
  Play(bufferLoader.bufferList[0]);

  if(bass[cnt]==true){
    console.log("bass");
    //document.querySelector("#bass").play();
    Play(bufferLoader.bufferList[1]);
  }
  if(tam1[cnt]==true){
    console.log("tam1");
    //document.querySelector("#tam1").play();
    Play(bufferLoader.bufferList[2]);
  }
  if(hat[cnt]==true){
    console.log("tam1");
    //document.querySelector("#hat").play();
    Play(bufferLoader.bufferList[3]);

  }
  //document.querySelector("#bass").currentTime=0;
  //document.querySelector("#tam1").currentTime=0;
  tid = setTimeout(function(){
    start();
    cnt++;
    if(cnt==PLAY_TIME*BEAT){
      cnt=0;
    }
  },1000/BEAT);
}

function pause(){
  clearTimeout(tid);
  tid=null;
}

function bassChange(){
  bass[cnt]=!bass[cnt];
  console.log("bt"+cnt);
  console.log(bass[cnt]);
  if(bass[cnt]){
      bass_imgs[cnt].src=full_img;
  } else{
      bass_imgs[cnt].src=slot_img;
  }
}
function tam1Change(){
  tam1[cnt]=!tam1[cnt];
  console.log("bt"+cnt);
  console.log(bass[cnt]);
  if(tam1[cnt]){
      tam1_imgs[cnt].src=full_img;
  } else{
      tam1_imgs[cnt].src=slot_img;
  }
}
function hatChange(){
  hat[cnt]=!hat[cnt];
  console.log("bt"+cnt);
  console.log(bass[cnt]);
  if(hat[cnt]){
      hat_imgs[cnt].src=full_img;
  } else{
      hat_imgs[cnt].src=slot_img;
  }
}

function truthCheck(){
  console.log(bufferLoader.urlList);
  console.log(bufferLoader);
}
