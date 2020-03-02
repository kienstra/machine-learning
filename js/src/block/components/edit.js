/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { BLOCK_CLASS } from '../constants';

/**
 * The Edit component for the block.
 */
const Edit = ( { attributes: { className, option1, option2, question }, setAttributes } ) => {
	return (
		<div className={ classnames( BLOCK_CLASS, className ) }>
			<RichText
				placeholder={ __( 'Survey question', 'easy-survey' ) }
				value={ question }
				onChange={ ( newValue ) => setAttributes( { question: newValue } ) }
			/>
			<RichText
				placeholder={ __( 'First option', 'easy-survey' ) }
				value={ option1 }
				onChange={ ( newValue ) => setAttributes( { option1: newValue } ) }
				className="wp-block-button__link"
			/>
			<RichText
				placeholder={ __( 'Second option', 'easy-survey' ) }
				value={ option2 }
				onChange={ ( newValue ) => setAttributes( { option2: newValue } ) }
				className="wp-block-button__link"
			/>
		</div>
	);
};

export default Edit;
