/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Edit } from '../';

// Mocks the <InspectorControls> component only, so that the other components in this package behave as usual.
jest.mock( '@wordpress/block-editor', () => {
	const original = jest.requireActual( '@wordpress/block-editor' );
	return {
		...original,
		InspectorControls: ( { children } ) => children,
	};
} );

test( 'question block', async () => {
	window.fetch = () => new Promise( ( resolve ) => resolve( [] ) );

	const props = {
		attributes: {
			category: 'FAQ',
			className: 'example-class',
			textSource: 'category',
		},
		setAttributes: jest.fn(),
	};

	render( <Edit { ...props } /> );
	expect( screen.getByLabelText( 'Analyze text from' ) ).toBeInTheDocument();
} );
