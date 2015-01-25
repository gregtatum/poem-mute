var fs = require('fs');
var ClassList = require("class-list");
var insertCss = require('insert-css');

var _html = fs.readFileSync( __dirname + "/template.html" );
var _css = fs.readFileSync( __dirname + "/style.css" );
var _cssInserted = false;


function createElement( html, className ) {
	var div = document.createElement('div');
	div.innerHTML = html;
	return div.getElementsByClassName( className )[0]
}

module.exports = function muteEl( mute ) {
	
	var el = createElement( _html, 'poem-mute' );
	var elClass = ClassList( el );
	
	if( !_cssInserted ) {
		insertCss( _css );
		_cssInserted = true;
	}
	
	var updateClass = function() {
		if( mute.muted() ) {
			elClass.remove('poem-mute-unmuted');
			elClass.add('poem-mute-muted');		
		} else {
			elClass.remove('poem-mute-muted');
			elClass.add('poem-mute-unmuted');
		}
	};
		
	mute.emitter.on( 'change', updateClass );
	updateClass();
	
	
	el.addEventListener( 'click', function( e ) {
		mute.toggle();
		updateClass();
		
		e.preventDefault();
		e.stopImmediatePropagation();
	}, true);
	
	return el;
};