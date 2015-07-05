
var cnt=0;
var PLAY_TIME = 4;
var BEAT= 4;
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


var time_img="./icons/time.png";
var cur_img="./icons/current.png";
var slot_img="./icons/slot.png";
var full_img="./icons/slotfull.png";



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
  }

function play(){
//  document.querySelector("#bass").currentTime=0;
//  document.querySelector("#tam1").currentTime=0;
  if((cnt-1)<0){
    time_imgs[PLAY_TIME*BEAT-1].src=time_img;
  }else{
    time_imgs[cnt-1].src=time_img;
  }
  time_imgs[cnt].src=cur_img;
  document.querySelector("#rhythm").play();

  if(bass[cnt]==true){
    console.log("bass");
    document.querySelector("#bass").play();
  }
  if(tam1[cnt]==true){
    console.log("tam1");
    document.querySelector("#tam1").play();
  }
  if(hat[cnt]==true){
    console.log("tam1");
    document.querySelector("#hat").play();
  }
  //document.querySelector("#bass").currentTime=0;
  //document.querySelector("#tam1").currentTime=0;
  tid = setTimeout(function(){
    play();
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
  console.log(tam1);
}
