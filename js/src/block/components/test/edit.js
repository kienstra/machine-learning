/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../edit';

/**
 * Sets up the test by rendering the component.
 *
 * @param {Object} props The props to pass to the component.
 */
const setup = ( props ) => {
	render( <Edit { ...props } /> );
};

const className = 'baz-class';
const getComponent = () => document.querySelector( `.${ className }` );

const hasText = ( textToSearch, text ) => -1 !== textToSearch.indexOf( text );

describe( 'Edit', () => {
	it.each( [
		[ 'What is your favorite pet?', 'Dogs', 'Cats' ],
		[ 'What is your average sale?', '100', '10000' ],
	] )( 'displays the survey options', ( question, option1, option2 ) => {
		setup( { attributes: { className, option1, option2, question } } );

		[ question, option1, option2 ].forEach( ( attribute ) => {
			expect(
				hasText( getComponent().textContent, attribute )
			).toStrictEqual( true );
		} );
	} );
} );
