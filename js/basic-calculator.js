/**
 * 
 * Codes by Henry Hale
 * 
 */

let _gridButton = [];

_gridButton = [
	/* first row */
	{
		name	: 'percent',
		value 	: '%',
		type 	: 'percent'
	},
	{
		name	: 'sqr',
		value 	: '√',
		type 	: 'sqroot'
	},
	{
		name	: 'sqe',
		value 	: 'x<sup>2</sup>',
		type 	: 'square',
		style 	: 'style="font-family: \'Lucida Calligraphy\', serif;"'
	},
	{
		name 	: 'rpl',
		value 	: '<sup>1</sup>/<sub style=\'position:relative;top:-1px;\'>x</sub>',
		type 	: 'reciprocal',
		style 	: 'style="font-family: \'Lucida Calligraphy\', serif;"'
	},
	/* first row */

	/* second row */
	{
		name	: 'cdl',
		value 	: 'CE',
		type 	: 'clear'
	},
	{
		name	: 'del',
		value 	: 'C',
		type 	: 'clear'
	},
	{
		name	: 'bsp',
		value 	: '<i class=\'fa fa-backspace\'></i>',
		type 	: 'clear',
		code 	: [8, null]
	},
	{
		name	: 'div',
		value 	: '÷',
		type 	: 'operand',
		code 	: [111, null]
	},
	/* second row */

	/* third row */
	{
		name	: 'num_7',
		value 	: 7,
		type 	: 'number',
		code 	: [55, 103]
	},
	{
		name	: 'num_8',
		value 	: 8,
		type 	: 'number',
		code 	: [56, 104]
	},
	{
		name	: 'num_9',
		value 	: 9,
		type 	: 'number',
		code 	: [57, 105]
	},
	{
		name	: 'tmz',
		value 	: '×',
		type 	: 'operand',
		code 	: [106, null]
	},
	/* third row */

	/* fourth row */
	{
		name	: 'num_4',
		value 	: 4,
		type 	: 'number',
		code 	: [52, 100]
	},
	{
		name	: 'num_5',
		value 	: 5,
		type 	: 'number',
		code 	: [53, 101]
	},
	{
		name	: 'num_6',
		value 	: 6,
		type 	: 'number',
		code 	: [54, 102]
	},
	{
		name	: 'mns',
		value 	: '-',
		type 	: 'operand',
		code 	: [109, null]
	},
	/* fourth row */

	/* fifth row */
	{
		name	: 'num_1',
		value 	: 1,
		type 	: 'number',
		code 	: [49, 97]
	},
	{
		name	: 'num_2',
		value 	: 2,
		type 	: 'number',
		code 	: [50, 98]
	},
	{
		name	: 'num_3',
		value 	: 3,
		type 	: 'number',
		code 	: [51, 99]
	},
	{
		name	: 'add',
		value 	: '+',
		type 	: 'operand',
		code 	: [107, null]
	},
	/* fifth row */

	/* sixth row */
	{
		name	: 'add',
		value 	: '±',
		type 	: 'negpos'
	},
	{
		name	: 'num_0',
		value 	: 0,
		type 	: 'number',
		code 	: [48, 96]
	},
	{
		name	: 'dot',
		value 	: '.',
		type 	: 'dot',
		code 	: [46, 110]
	},
	{
		name	: 'eqz',
		value 	: '=',
		type 	: 'equals',
		code 	: [13, null]
	}
];


let _calc_main_body = document.querySelector('.calc-main-body');

let drawBtnGrid = function (options) {
	let btnArr = options.btns || _gridButton;
	let calMode = options.mode || 'basic';
	// Modes
	let cMode = 0;
	switch(calMode) {
		case 'basic':
			cMode = 0;
			break;
		case 'advanced':
			cMode = 1;
			break;

		default: 
			cMode = 0;
			break;
	}

	for (let i = 0; i < btnArr.length; i++) {
		let _btn_hover = 'w3-hover-light-grey';
		let _btn_bg = 'w3-glass';
		let _btn_style = '';
		let _btn_value = '';
		// hover
		if (btnArr[i].type=='operand' || btnArr[i].type=='equals') {
			_btn_hover = 'w3-hover-blue';
			_btn_value = btnArr[i].value;
		}
		// bgcolor
		if (btnArr[i].type=='number') {
			_btn_bg = 'w3-white';
			_btn_style += '  font-weight:bold;  ';
			_btn_value = btnArr[i].value;
		} else {
			_btn_style += '  font-weight:lighter;  ';
		}
		if (btnArr[i].type=='dot' || btnArr[i].type=='percent' || btnArr[i].type=='sqroot' || btnArr[i].type=='reciprocal' || btnArr[i].type=='clear') {
			_btn_value = btnArr[i].value;
		}
		//if (btnArr[i].mode==cMode) {
			_calc_main_body.innerHTML += '<button style="'+_btn_style+'" class="w3-button '+btnArr[i].type+' '+_btn_bg+' '+_btn_hover+'" value="'+_btn_value+'">'+btnArr[i].value+'</button>';
		/*} else {
			continue;
		}*/
	}

}
	

// display
drawBtnGrid({
	mode : 'basic',
	btns : _gridButton
});

// events
let solutionDisplay = document.querySelector('#solutionDisplay');
let currentDisplay = document.querySelector('#currentDisplay');

// refresh
let addNewValue = false;

// click
// numbers
let _numbers = document.querySelectorAll('.number');
_numbers.forEach(function(b){
	b.addEventListener('click', function(){
		addInputValue(b.value);
		addNewValue = false;
	});
});

// decimal
let _dot = document.querySelector('.dot');
_dot.addEventListener('click', function(){
	if (currentDisplay.value.indexOf('.') > -1) {
		return;
	}
	addInputValue(_dot.value);
});

// operators
let _operands = document.querySelectorAll('.operand');
_operands.forEach(function(c){
	c.addEventListener('click', function(){
		
		if (solutionDisplay.value==0) {
			solutionDisplay.value = " " + currentDisplay.value + " " + c.value + " ";
		} else {
			solutionDisplay.value += " " +  currentDisplay.value + " " + c.value + " ";	
		}
		evalAndReturn(sanitizeStep(solutionDisplay.value));
		addNewValue = true;
	});
});

// negative(x)
let negPos = document.querySelector('.negpos');
negPos.addEventListener('click', function(){
	let aValue = currentDisplay.value;
	if(aValue != 0){
		let _negx = aValue.split('');
		if (aValue.includes('-')) {
			_negx.shift();
		} else {
			_negx.unshift('-');
		}
		currentDisplay.value = _negx.join('');
	}
});

// decimal
let _percent = document.querySelector('.percent');
_percent.addEventListener('click', function(){
	currentDisplay.value /= 100;
});

// square root
let _sqroot = document.querySelector('.sqroot');
_sqroot.addEventListener('click', ()=>{
	let aValue = currentDisplay.value;
	if(aValue == '' || aValue == 0){
		currentDisplay.value = 0;
	} else {
		currentDisplay.value = Math.sqrt(currentDisplay.value);
	}
});

// square x^2
let _square = document.querySelector('.square');
_square.addEventListener('click', ()=>{
	const aValue = currentDisplay.value;
	if(aValue == '' || aValue == 0){
		currentDisplay.value = 0;
	} else {
		currentDisplay.value = Math.pow(currentDisplay.value, 2);
	}
});

// reciprocal
let _reciprocal = document.querySelector('.reciprocal');
_reciprocal.addEventListener('click', ()=>{
	const aValue = currentDisplay.value;
	if(aValue == '' || aValue == 0){
		currentDisplay.value = 0;
	} else {
		currentDisplay.value = (1 / currentDisplay.value);
	}
});

// delete
let _clearBtn = document.querySelectorAll('.clear');

_clearBtn[0].addEventListener('click', function(){
	currentDisplay.value = '0';
});

_clearBtn[1].addEventListener('click', function(){
	currentDisplay.value = '0';
	solutionDisplay.value = null;
});

_clearBtn[2].addEventListener('click', function(){
	const solString = currentDisplay.value;
	if (!solString || typeof solString == 'undefined' || solString==null || solString.length <= 1) {
		currentDisplay.value = '0';
		return;
	}
	const _str = solString.substring(0, (solString.length - 1));
	if (_str=='') {
		currentDisplay.value = '0';
	} else {
		currentDisplay.value = _str;
	}
});

//evaluate
let _evalBtn = document.querySelectorAll('.equals');
_evalBtn[0].addEventListener('click', function(){
	if (currentDisplay.value!='0' && solutionDisplay.value!='') {
		solutionDisplay.value += currentDisplay.value;
		evalAndReturn(solutionDisplay.value);
	}
	// helper to prevent a bug which a number is click after this action
	solutionDisplay.value = null;
});

/* HELPERS */
let addInputValue = function (cval) {
	let _maxLength = currentDisplay.getAttribute('maxlength') || 9;
	if (currentDisplay.value.length > _maxLength) {
		return;
	}

	if (cval && currentDisplay) {
		if (currentDisplay.value==0 && addNewValue==false) {
			if (cval=='.') {
				currentDisplay.value = 0 + cval;
			} else {
				if (currentDisplay.value.indexOf('.') > -1) {
					currentDisplay.value += cval;
				} else{
					currentDisplay.value = cval;
				}
			}
		} else {
			if (addNewValue==true) {
				if (cval.indexOf('.') > -1) {
					currentDisplay.value += cval;
				} else{
					currentDisplay.value = cval;
				}
			} else {
				currentDisplay.value += cval;
			}
		}
	} 
}

let sanitizeStep = function(t) {
	let _work = t;
	_work = _work.substring(0, (_work.length - 2));
	//console.log(work);
	return _work;
}

let isNumOdd = function(x){
	if (x % 2 == 0) {
		return true;
	}
	return false;
}

let evalAndReturn = function (cvl) {
	let work = cvl;
	//console.log(work); 
	let workShow;

	let checkTimes = work.indexOf('×') || null;
	let checkDiv = work.indexOf('÷') || null;

	workShow = work;

	if(checkTimes!=null) {
		workShow = workShow.split('×').join('*');
	} 

	if(checkTimes!=null) {
		workShow = workShow.split('÷').join('/');
	}

	let answerDerived = eval(workShow);

	/* fixed to 5dps in the display area */
	if (String(answerDerived).indexOf('.') > 0) {
		currentDisplay.value = answerDerived.toFixed(5);
	} else {
		currentDisplay.value = answerDerived;
	}
	/* not fixed dps in the history area */
	if (cvl.trim().length > 4) {
		createHistoryPill({
			solution : cvl,
			answer : answerDerived
		});
	}
	
}

// save history
let refreshHistoryTab = function () {
	let _anyPills = document.querySelectorAll('.history-pill');
	if (!_anyPills.length) {
		document.querySelector('#historyTab').innerHTML = '<span id="emptyPill">There\'s no history yet</span>';
	} else {
		document.querySelector('#historyClear').style.display = 'inline-block';
	}
};

// load
window.addEventListener('load', function(){
	handleLayoutNow();
	refreshHistoryTab();
	currentDisplay.value = '0';
	solutionDisplay.value = null;
});

// handle device layout
let handleLayoutNow = function() {

	let _isMobile = false;
	if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Mobile') > -1 ) {
		_isMobile = true;
	}

	let _layoutDiv = document.getElementById('layoutDiv');
  	if (_isMobile) {
    	// if we are on Mobile OS we activate 12 Block CSS Grid Layout
    	_layoutDiv.classList+=` w3\-row `;
		if (_layoutDiv.hasChildNodes()) {
			//console.log('hasChildNodes');
			let _childArr = _layoutDiv.children;
			if (_childArr.length>1) {
				for (let i = 0; i < _childArr.length; i++) {
					_childArr[i].classList+= ` w3\-col s3 `;
					_childArr[i].style.padding = 'padding:calc((100vh - 220px)/ 30)';
					//console.log(i+':'+_childArr[i].classList);
				}
			}
		}
    }

}

let clearHistoryBtn = document.querySelector('#historyClear');
clearHistoryBtn.addEventListener('click', function() {
	document.querySelector('#historyTab').innerHTML = '<span id="emptyPill">There\'s no history yet</span>';
});

let createHistoryPill = function (_data) {
	let _solution = _data.solution || null;
	let _answer = _data.answer || null;

	// delete empty pill
	let empty_pill = document.querySelector('#emptyPill');
	if (empty_pill) {
		empty_pill.style.display='none';
	}

	// create
	let paraDiv = document.createElement("div");
	paraDiv.setAttribute("class","w3-bar-item w3-right-align w3-hover-light-grey history-pill");

	let soluDiv = document.createElement("div");
	soluDiv.setAttribute("class","w3-block w3-opacity"); 

	let answDiv = document.createElement("div");
	answDiv.setAttribute("class","w3-block fa-2x"); 

	let _solutionTxt = document.createTextNode(_solution+' =');
	let _answerTxt = document.createTextNode(_answer);

	let _historyParent = document.querySelector('#historyTab');

	if (_answer!=null && _solution!=null) {

		_historyParent.appendChild(paraDiv);

		paraDiv.appendChild(soluDiv);
		paraDiv.appendChild(answDiv);

		answDiv.appendChild(_answerTxt);
		soluDiv.appendChild(_solutionTxt);

		return;

	}

	return;
}

/* toggle dropdown */
function w3_dropdown(id) {
  let x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {  
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

/* toggle side menu */
let openMoreModal = document.getElementById('openMoreModal');
let closeMoreModal = document.getElementById('closeMoreModal');
let myOverlay = document.getElementById('myOverlay');
let mySidebar = document.getElementById('mySidebar');
openMoreModal.addEventListener('click',function () {
	myOverlay.style.display = 'block';
	mySidebar.style.display = 'block';
});
closeMoreModal.addEventListener('click',function () {
	myOverlay.style.display = 'none';
	mySidebar.style.display = 'none';
});
myOverlay.addEventListener('click', function () {
	closeMoreModal.click();
})


/* FullScreen */
let toggleFullScreen = function () {
        if (
        		(document.fullScreenElement && document.fullScreenElement !== null) ||    
        		// alternative standard method
            	(!document.mozFullScreen && !document.webkitIsFullScreen)
            ) 
           	{               // current working methods
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.documentElement.oRequestFullScreen) {
            	document.documentElement.oRequestFullScreen();
            } else if (document.documentElement.msRequestFullScreen) {
            	document.documentElement.msRequestFullScreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.oCancelFullScreen) {
                document.oCancelFullScreen();
            } else if (document.msCancelFullScreen) {
                document.msCancelFullScreen();
            }
        }
    };

// Fullscreen handler
let _fullScreenBtn = document.getElementById('fullScreenBtn');
if (_fullScreenBtn) {
	_fullScreenBtn.addEventListener('click',function () {
		closeMoreModal.click();
		toggleFullScreen();
	});
}

/* Dark Mode / Light Mode */
let _htmlTag = document.documentElement;
/*
	using body gave me a bug on my Android, 
	to fix that i used html tag and
	assign the darkmode class to html 

	LIKE =>

		html.calc-darkmode,
		.calc-darkmode body 
		{
			background: #111;
  			color: #ff974a;
		}

	...
*/
let _htmlBody = document.body;
let _toggleDLMode = document.getElementById('darkModeBtn');
if (_toggleDLMode) {
	_toggleDLMode.addEventListener('click',function(){
		_htmlTag.classList.toggle('calc-darkmode');
		if (_htmlTag.classList.contains('calc-darkmode')) {
			// console.log('Dark Mode');
			_toggleDLMode.innerHTML = '<i class="fa fa-moon"></i>&nbsp;Dark Mode';
			//document.body.classList.replace('calc-darkmode', 'w3-light-grey');
			if (localStorage) {
				try {
					localStorage.setItem("calc-dark-mode", "true");
				} catch (error){
				  	//console.log('Enable cookies in your browser');
				}
			}
		} else if (_htmlTag.classList.contains('w3-light-grey')) {
			// console.log('Light Mode');
			_toggleDLMode.innerHTML = '<i class="fa fa-sun"></i>&nbsp;Light Mode';
			//_htmlTag.classList.replace('w3-light-grey', 'calc-darkmode');
			if (localStorage) {
				try {
					localStorage.setItem("calc-dark-mode", "false");
				} catch (error){
				  	//console.log('Enable cookies in your browser');
				} 
			}
		}
	});
} 

/* store Dark Mode value in Local Storage */
window.addEventListener('load', function () {
	if (localStorage && localStorage.getItem("calc-dark-mode") === "true") { 	
		if (_toggleDLMode) {
			_toggleDLMode.click();
		}
	}
});



/* ADJUSTMENTS */

/* History Shade for Mobile */
let _toggleHistoryShade = document.getElementById('toggleHistoryShade');
let _historyShade = document.getElementById('historyShade');
let _buttonShade = document.getElementById('buttonShade');
let _historyVClear = document.getElementById('historyVClear');
let _historyShadeBack = document.getElementById('toggleHistoryShadeBack');
if (_toggleHistoryShade && _historyShade && _buttonShade && _historyVClear && _toggleHistoryShade && _historyShadeBack ) {
	_toggleHistoryShade.addEventListener('click',function(){
		if (_historyShade.classList.contains(`w3-hide-small`)) {
			let _tArr = _historyShade.className.split(' ');
			_tArr.pop();
			_historyShade.className = _tArr.join(' ');
		}
		_historyVClear.style.display = 'block';
		_toggleHistoryShade.style.display = 'none';
		_historyShadeBack.style.display = 'inline-block';
		_buttonShade.style.display = 'none';
		_historyShade.style.display = 'block';
	});

	_historyShadeBack.addEventListener('click',function() {
		_historyVClear.style.display = 'none';
		_toggleHistoryShade.style.display = 'block';
		_buttonShade.style.display = 'block';
		_historyShade.style.display = 'none';
		_historyShadeBack.style.display = 'none';
	});

	_historyVClear.addEventListener('click',function() {
		clearHistoryBtn.click();
	});
}


/* Keyboard Control */
window.addEventListener('keydown',function (e) {
	
	//console.log(e.which);

	e.preventDefault();

	let _theCharCode;
	if (e.which) {
		_theCharCode = e.which;
	} else {
		_theCharCode = e.keyCode;
	}

	/*
	// mapping
	// has a bug, it doesn't return new array

	let _expectedKeys = _gridButton.map(function (value, index, arr) {
		if (value.code) {
			//console.log(value);
			return value.code;
		}
	});*/

	/* 
	// filtering
	*/
	let _expectedKeys = _gridButton.filter(function (nxt) {
		return nxt && nxt.code;	
	});
	if (_expectedKeys) {
		//console.log(_expectedKeys);
		for (let i = 0; i < _expectedKeys.length; i++) {
			if (_expectedKeys[i].code[0] != null) { 
				if ( (_expectedKeys[i].code[0] == _theCharCode) || (_expectedKeys[i].code[1] ==  _theCharCode) ) {

					/* general flow to capture */
					//console.log(_expectedKeys[i].name);
					let _idElem = null;
					if(_expectedKeys[i].type == 'number'){
						_idElem = '.number[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'operand') {
						_idElem = '.operand[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'clear') {
						_idElem = '.clear[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'dot') {
						_idElem = '.dot[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'equals') {
						_idElem = '.equals[value="'+_expectedKeys[i].value+'"]';
					}

					if (_idElem!=null) {
						let _catchElem = document.querySelector(_idElem);
						if (_catchElem) {
							_catchElem.click();
						}
					}

					break;
				} 
			} else if (_expectedKeys[i].code[0] == null) {
				if ( (_expectedKeys[i].code[1] ==  _theCharCode) ) {

					// Cloned the first case
					/* general flow to capture */
					//console.log(_expectedKeys[i].name);
					let _idElem = null;
					if(_expectedKeys[i].type == 'number'){
						_idElem = '.number[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'operand') {
						_idElem = '.operand[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'clear') {
						_idElem = '.clear[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'dot') {
						_idElem = '.dot[value="'+_expectedKeys[i].value+'"]';
					} else if (_expectedKeys[i].type == 'equals') {
						_idElem = '.equals[value="'+_expectedKeys[i].value+'"]';
					}

					if (_idElem!=null) {
						let _catchElem = document.querySelector(_idElem);
						if (_catchElem) {
							_catchElem.click();
						}
					}

					break;
				} 
			}

			continue;

		}
	}

});
	