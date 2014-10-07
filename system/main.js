var mSecond = 0;
var sec=0;
var min=0;
var hrs=0;
function iniTime(){
	var now = new Date(); 
	mSecond=now.getTime();
}
function miliSeconds(temp){
	var now2 = new Date();
	var nSecond=now2.getTime()+temp;
	return (nSecond-mSecond)
}
function getDateTime() {
	mSec=miliSeconds(tempmS);
	sec=Math.floor(mSec/1000);
	min=Math.floor(sec/60);
	hrs=Math.floor(min/60);
	showDateTime(hrs,min,sec,mSec)
}
function showDateTime(hrs,min,sec,mSec){
	mSec=mSec%1000;
	sec=sec%60
	min=min%60
	if(mSec<10){
		mSec="00"+mSec
	}else if(mSec<100){
		mSec="0"+mSec
	}else{
		mSec=""+mSec
	}
	if(hrs<10){
		hrs="0"+hrs
	}
	if(min<10){
		min="0"+min
	}
	if(sec<10){
		sec="0"+sec
	}
	dateTime=hrs+":"+min+":"+sec+":"+mSec;
	document.getElementById("current").innerHTML = dateTime;
}
var interval=null;
var running=0;
var paused=0;
var tempmS=0;
var prevRecords = [];
function startWatch(){
	running=1;
	paused=0;
	tempmS=0;
	iniTime();
	interval = setInterval(getDateTime,1)
	document.getElementById("start").style.display = "none"
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("stop").style.display = "inline-block";
}
function stopWatch(){
	paused=0;
	running=0;
	clearInterval(interval);
	document.getElementById("pause").style.display = "none";
	document.getElementById("stop").style.display = "none";
	document.getElementById("continue").style.display = "none";
	document.getElementById("start").style.display = "block";
	prevRecords.push(document.getElementById("current").innerHTML);
	showPrevRecords();
}
function pauseWatch(){
	running=0;
	paused=1;
	tempmS=mSec
	clearInterval(interval);
	document.getElementById("pause").style.display = "none";
	document.getElementById("continue").style.display = "inline-block";
}
function continueWatch(){
	paused=0;
	running=1;
	iniTime();
	interval = setInterval(getDateTime,1);
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("continue").style.display = "none";
}
function showPrevRecords(){
	document.getElementById("prev").style.display = "block";
	document.getElementById("showPrev").style.display = "block";
	document.getElementById("showPrev").innerHTML = "";
	for(var i in prevRecords){
		document.getElementById("showPrev").innerHTML = document.getElementById("showPrev").innerHTML + "<li>"+prevRecords[prevRecords.length-i-1]+"</li>";
	}
}
function clrRec(){
	prevRecords=[];
	showPrevRecords();
}