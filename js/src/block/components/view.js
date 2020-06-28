/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BLOCK_CLASS } from '../constants';

/**
 * The Edit component for the block.
 *
 * @param {Object} props The component props.
 * @param {string} props.className The class name.
 * @param {string} props.option1 The first option.
 * @param {string} props.option2 The second option.
 * @param {string} props.question The survey question.
 */
const View = ( { className, option1, option2, question } ) => {
	const [ isSubmitted, setIsSubmitted ] = useState( false );

	return (
		<div className={ `${ BLOCK_CLASS } ${ className }` }>
			{ isSubmitted ? (
				<p>{ __( 'Thanks for doing the survey!', 'easy-survey' ) }</p>
			) : (
				<>
					<p>{ question }</p>
					<button onClick={ () => setIsSubmitted( true ) }>
						{ option1 }
					</button>
					<button onClick={ () => setIsSubmitted( true ) }>
						{ option2 }
					</button>
				</>
			) }
		</div>
	);
};

export default View;
