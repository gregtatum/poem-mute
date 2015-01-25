var localforage = require('localforage');
var EventEmitter = require('events').EventEmitter;
var muteUI = require('./ui');
var extend = require('extend');

var dispatchChanged = function( emitter, mutedValue ) {

	emitter.emit('change', mutedValue );
	
	if( mutedValue === true ) {
		emitter.emit('mute');
	} else {
		emitter.emit('unmute');
	}
};

var updateFromLocalStorage = function( exports, emitter ) {
	
	localforage.getItem('poem-mute', function( err, value ) {
		
		var currentMute = exports.muted();

		if( err || (value !== false && value !== true ) ) {
			exports.muted( false );
		} else {
		 	exports.muted( value );
		}
		
	}.bind(this));
	
};

var keyboardShortcut = function( state, toggle, config ) {
	
	if( config.keyCode !== false ) {
		
		window.addEventListener('keydown', function muteAudioByKeboard( e ) {
	
			if( e.keyCode !== config.keyCode ) return;
			toggle();
	
		});
	}
};

var getSetMuted = function( state, emitter ) {
	return function( value ) {
		
		if( value === true || value === false ) {
			if( value !== state.muted ) {
				
				state.muted = value;
				localforage.setItem( 'poem-mute', state.muted );
				dispatchChanged( emitter, state.muted );
				
			}
		}
		
		return state.muted;
	}
};

var mute = function( properties ) {
	
	var config = extend({
		muted : false,
		keyCode : 83
	});
	
	var state = {
		muted : config.muted
	};
	
	var emitter = new EventEmitter();
	var muted = getSetMuted( state, emitter );
	var toggle = function() { muted( !muted() ); }
	
	keyboardShortcut( state, toggle, config );
	
	var exports = {
		muted : muted,
		toggle : toggle,
		emitter : emitter,
		el : null
	};

	updateFromLocalStorage( exports, emitter );
	exports.el = muteUI( exports )
	
	return exports;
};

module.exports = mute;
