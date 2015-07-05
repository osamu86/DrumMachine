
var cnt=0;
var PLAY_TIME = 8;
var BEAT= 4;
var BPM = 60;
var tid;
var pl = new Array(PLAY_TIME*BEAT);//cnt stay in
var time_imgs = new Array(PLAY_TIME*BEAT);//images of tempo
var cur_imgs = new Array(PLAY_TIME*BEAT);
var bass_imgs = new Array(PLAY_TIME*BEAT);//bassのフラグ

var bass = new Array(PLAY_TIME*BEAT);//bassのフラグ
var tam1 = new Array(PLAY_TIME*BEAT);//tam1のフラグ

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

      var cur=document.createElement('img');
      cur.src=slot_img;
      document.getElementById("tam1_field").appendChild(cur);
      cur_imgs[i]=cur;

      bass[i]=false;
      tam1[i]=false;
    }
  }

function play(){
  console.log(cnt);
  if((cnt-1)<0){
    time_imgs[PLAY_TIME*BEAT-1].src=time_img;
  }else{
    time_imgs[cnt-1].src=time_img;
  }
  time_imgs[cnt].src=cur_img;
  document.querySelector("#rhythm").play();
  console.log(bass[cnt]);
  if(bass[cnt]){
    console.log(cnt);
    document.querySelector("#bass").play();
  }
  if(tam1[cnt]){
    document.querySelector("#tam1").play();
  }
  document.querySelector("#bass").currentTime=0;
  document.querySelector("#tam1").currentTime=0;
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
