var mouseX = null;
var mouseY = null;
var percentage = {
	width: null,
	height: null
};
var screenW = document.body.clientWidth;
var screenH = document.body.clientHeight;
var mouseActive = true;

var boundaries = {
	left: {
		min: 0,
		max: 100
	},
	top: {
		min: 0,
		max: 100
	}
}

var eye = document.querySelectorAll('.eye');
var iris = document.querySelectorAll(".iris");
var pupil = document.querySelectorAll(".pupil");
var emotionalStates = ['laugh', 'cry', 'crazy'];

document.body.addEventListener('mousemove', function(e){
	if(mouseActive){

		// --- OPTION A 
		// // console.log(e);
		// mouseX = e.pageX;
		// mouseY = e.pageY;
	
		// percentage.width = (e.pageX / screenW) * 100;
		// percentage.height = (e.pageY / screenH) * 100;
		// // log(percentage.width + ' ' + percentage.height + '');
		// moveEye(percentage.width, percentage.height);

		// --- OPTION B
		  var sW = window.innerWidth;
		  var sH = window.innerHeight;
		  var cW = sW / 2;
		  var cH = sH / 2;
		  var mX = e.clientX;
		  var mY = e.clientY;
		  
		  
		  for(var i = 0; i < eye.length; i++) {

		    // Gets the bounds for this eye
		    var el = eye[i].getBoundingClientRect();

		    // To get the center we first need to 
		    // add the "left" + "width" / 2
		    var eyeCenterX = el.left + el.width / 2;
		    var eyeCenterY = el.top + el.height / 2;

		    // console.log(eyeCenterX - mX);

		    // Get eye center
		    var dX = eyeCenterX - mX;

		    // This caps the X position
		    // if it goes over the threshhold
		    if(dX < -200) {
		      dX = -200;
		    } else if(dX > 200) {
		      dX = 200;
		    }
		    

		    // This caps the Y position
		    // if it goes over the threshhold
		    var dY = eyeCenterY - mY;
		    if(dY < -200) {
		      dY = -200;
		    } else if(dY > 200) {
		      dY = 200;
		    }
		    
		    // percentage X - Relative to over the eye
		    var pX = (dX) * 100 / 200;

		    if(i === 0){
		      console.log(pX);
		    }

		    // To move pupil and iris 
		    // {Number} * {%} / 100 * {Number} switch axis;
		    // The -1 switches the axis around
		    // so that it increments as you move the mouse down
		    var moveIrisX = 40 * pX / 100 * -1;
		    var movePupilX = 25 * pX / 100 * -1;

		    // Percentage Y - Relative to over the eye
		    var pY = (dY) * 100 / 200;

		    var moveIrisY = 30 * pY / 100 * -1;
		    var movePupilY = 25 * pY / 100 * -1;
		    
		    iris[i].style.transform = 'translate(' + moveIrisX + 'px, ' + moveIrisY + 'px)';
		    pupil[i].style.transform = 'translate(' + movePupilX + 'px, ' + movePupilY + 'px)';
		  };
	}
});

// HTMLDomElements
var thing = document.querySelectorAll(".thing");
var lips = document.querySelector('div.lips');
var head = document.querySelector('.head');
var bodyTag = document.body;
var tears = document.querySelectorAll(".tear");

// Buttons
var laughBtn = document.querySelector('div.btn.laugh');
var cryBtn = document.querySelector('div.btn.cry');
var crazyBtn = document.querySelector('div.btn.crazy');


// Event listeners
laughBtn.addEventListener('click', doLaugh)
cryBtn.addEventListener('click', doCry)
crazyBtn.addEventListener('click', beCrazee)

PrefixedEvent(lips, 'animationend', removeEmotionalStates);
PrefixedEvent(head, 'animationend', removeEmotionalStates);
PrefixedEvent(tears, 'animationend', removeEmotionalStates, true);
PrefixedEvent(bodyTag, 'animationend', removeEmotionalStates);

/**
 * Removes emotion classes from
 * Whereever the class needs to come from
 * @param {Object} animInfo: Receives this data from callback
 * @scope: this = {HTMLDomElement}
 */
function removeEmotionalStates(animInfo){
	console.log(animInfo);
	for (var i = 0; i < emotionalStates.length; i++) {
		if(this.classList.contains(emotionalStates[i])){
			this.classList.remove(emotionalStates[i]);
		}
	}
}

/**
 * Log something with styling
 * @param  {Number} left: Left position in %
 * @param  {Number} top: top position in %
 */
function moveEye(left, top){

	if(left > boundaries.left.max){
		left = boundaries.left.max;
	}
	else if(left < boundaries.left.min){
		boundaries.left.min
	}
	
	if(top > boundaries.top.max){
		top = boundaries.top.max
	}
	else if(top < boundaries.top.min){
		top = boundaries.top.min
	}
	
	for(i of thing){
		i.children[0].style.transform = 'translate(' + left + '%, ' + top +  '%)';
	}
	
}

function moveEyeAlt(){

}


function doLaugh(){
	lips.classList.add('laugh');
	head.classList.add('laugh');
}


function doCry(){
	lips.classList.add('cry');
	head.classList.add('cry');
	for (var i = 0; i < tears.length; i++) {
		tears[i].classList.add('cry');
	}
}

function beCrazee(){
	lips.classList.add('crazy');
	head.classList.add('crazy');
	bodyTag.classList.add('crazy');
}

function makeTearDrop(el, duration) {
    this.el = el;
    this.duration = duration;
}

// Helpers
/**
 * Log something with styling
 * @param  {String} message:  Message to be logged
 */
var log = function(message){
	console.log('--------');
	console.log(message);
}

/**
 * Prefix event for all platforms
 * @param  {HTMLDomElement} element: element being listened on
 * @param  {String} type: Listener type
 * @param  {Function} callback: Doy... Ofcourse this is you callback func fool
 */
function PrefixedEvent(element, type, callback, list) {

    var pfx = ["webkit", "moz", "MS", "o", ""];
 	
    if(list){
    	for(var i=0; i<element.length; i++){
    		console.log(element[i]);
			for (var p = 0; p < pfx.length; p++) {
				if (!pfx[p]) type = type.toLowerCase();
				element[i].addEventListener(pfx[p]+type, callback, false);
			}
    	}
    }
    else{
		for (var p = 0; p < pfx.length; p++) {

			if (!pfx[p]) type = type.toLowerCase();

			element.addEventListener(pfx[p]+type, callback, false);

		}
	}
}