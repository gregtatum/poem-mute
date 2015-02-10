#poem-mute

A simple mute button for visualizations. It uses localforage to store the last known mute state.

Part of the [programming-poem](https://www.npmjs.com/browse/keyword/programming-poem) module series.

## Usage:

	var createMuteButton = require('poem-mute');
	
	var mute = createMuteButton({
		
		muted : false, // start muted or not
		keyCode : 83 // keycode to mute, default is "S"
		
	});

## Interface

### `mute.muted()` function

Get or set the muted state.

	// Mute
	mute.muted( true );
	
	// Un-mute
	mute.muted( false );
	
	console.log( mute.muted() );
	// > false

### `mute.toggle()` function

Toggle the mute state

### `mute.emitter` EventEmitter

	mute.emitter.on('mute', handleMute);
	mute.emitter.on('unmute', handleUnmute);
	
	mute.emitter.on('changed', function( muted ) {
		video.muted = muted;
	});

### `mute.el` HTML Element

The SVG element to be added to the DOM.

## CSS

The button is an SVG, so the color of the button can be changed via CSS. The default CSS is below which can be easily overwritten.

	.poem-mute-svg {
	    fill: #fff;
		opacity:0.8;
	}
	.poem-mute-muted .poem-mute-wave {
	    display: none;
	}
	.poem-mute-unmuted .poem-mute-x {
	    display: none;
	}
	.poem-mute-x {
	    fill: red;
	}
	.poem-mute-svg:hover {
	    opacity:1;
	}