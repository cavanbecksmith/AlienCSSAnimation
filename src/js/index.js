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

var emotionalStates = ['laugh', 'cry'];

document.body.addEventListener('mousemove', function(e){
	if(mouseActive){
		// console.log(e);
		mouseX = e.pageX;
		mouseY = e.pageY;
	
		percentage.width = (e.pageX / screenW) * 100;
		percentage.height = (e.pageY / screenH) * 100;
		// log(percentage.width + ' ' + percentage.height + '');
		moveEye(percentage.width, percentage.height);
	}
});

// HTMLDomElements
var thing = document.querySelectorAll(".thing");
var lips = document.querySelector('div.lips');
var head = document.querySelector('.head');

// Buttons
var laughBtn = document.querySelector('div.btn.laugh');
var cryBtn = document.querySelector('div.btn.cry');


// Event listeners
laughBtn.addEventListener('click', doLaugh)
cryBtn.addEventListener('click', doCry)

PrefixedEvent(lips, 'animationend', removeEmotionalStates);
PrefixedEvent(head, 'animationend', removeEmotionalStates);


// PrefixedEvent(lips, 'animationstart', removeEmotionalStatesI);
// PrefixedEvent(head, 'animationstart', removeEmotionalStatesI);
// function removeEmotionalStatesI (animInfo) {
// 	var emotion = animInfo.animationName.replace(/(-)\w+/g, '');
// 	for (var i = 0; i < emotionalStates.length; i++) {
// 		if(emotionalStates[i] != emotion){
// 			this.classList.remove(emotionalStates[i]);	
// 		}
// 	}
// }


/**
 * Removes emotion classes from
 * Whereever the class needs to come from
 * @param {Object} animInfo: Receives this data from callback
 * @scope: this = {HTMLDomElement}
 */
function removeEmotionalStates(animInfo){
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

	// console.log(left, top);
	
	
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


function doLaugh(){
	lips.classList.add('laugh');
	head.classList.add('laugh');
}


function doCry(){
	lips.classList.add('cry');
	head.classList.add('cry');
}

function beCrazee(){

}


function makeTearDrop(){}

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
function PrefixedEvent(element, type, callback) {

    var pfx = ["webkit", "moz", "MS", "o", ""];
 
	for (var p = 0; p < pfx.length; p++) {

		if (!pfx[p]) type = type.toLowerCase();

		element.addEventListener(pfx[p]+type, callback, false);

	}
}
