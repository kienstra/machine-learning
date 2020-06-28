/* global easySurveyProps */

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import View from './components/view';
import { BLOCK_CLASS } from './constants';

// Finds the block containers, and render the React component in them.
document
	.querySelectorAll( `.${ BLOCK_CLASS }` )
	.forEach( ( blockContainer ) => {
		const instanceId = blockContainer.getAttribute( 'data-block-instance' );
		const props = easySurveyProps[ instanceId ];
		if ( ! props ) {
			return;
		}

		render( <View { ...props } />, blockContainer );
	} );
