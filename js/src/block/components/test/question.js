/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Question } from '../';

test( 'question block', () => {
	const props = {
		attributes: {
			category: 'FAQ',
			className: 'example-class',
			postId: '56',
			textSource: 'category',
		},
	};

	render( <Question { ...props } /> );
	expect( screen.getByText( 'Ask a question' ) ).toBeInTheDocument();
} );
