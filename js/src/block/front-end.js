/* global machineLearningProps */

/**
 * External dependencies
 */
import * as React from 'react';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Question } from './components';
import { BLOCK_CLASS } from './constants';

// Finds the block containers, and renders the React component in them.
document.querySelectorAll( `.${ BLOCK_CLASS }` ).forEach( ( blockContainer ) => {
	const instanceId = blockContainer.getAttribute( 'data-block-instance' );
	// @ts-ignore global variable
	const props = machineLearningProps[ instanceId ];
	if ( ! props ) {
		return;
	}

	render(
		<Question { ...props } />,
		blockContainer
	);
} );
