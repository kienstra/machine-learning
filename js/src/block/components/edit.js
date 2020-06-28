/**
 * External dependencies
 */
import classnames from 'classnames';
import * as React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ContrastChecker,
	PanelColorSettings,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASS } from '../constants';

/**
 * @typedef {Object} EditAttributes The block attributes.
 * @property {string} backgroundColor The background color.
 * @property {string} className The name of the class.
 * @property {string} option1 The first option.
 * @property {string} option2 The second option.
 * @property {string} textColor The text color.
 * @property {string} question The question.
 */

/**
 * The Edit component for the block.
 *
 * @param {Object} props The component props.
 * @param {Object} props.attributes The block attributes.
 * @param {string} props.attributes.backgroundColor The background color.
 * @param {string} props.attributes.className The class name.
 * @param {string} props.attributes.option1 The first option.
 * @param {string} props.attributes.option2 The second option.
 * @param {string} props.attributes.textColor The text color.
 * @param {string} props.attributes.question The survey question.
 * @param {Function} props.setAttributes Sets the block's attributes.
 */
const Edit = ( {
	attributes: {
		backgroundColor,
		className,
		option1,
		option2,
		textColor,
		question,
	},
	setAttributes,
} ) => {
	const style = { backgroundColor, color: textColor };

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'easy-survey' ) }
					colorSettings={ [
						{
							// @ts-ignore type declaration is wrong.
							value: textColor,
							onChange: ( newValue ) =>
								setAttributes( { textColor: newValue } ),
							label: __( 'Text color', 'easy-survey' ),
						},
						{
							// @ts-ignore type declaration is wrong.
							value: backgroundColor,
							onChange: ( newValue ) =>
								setAttributes( { backgroundColor: newValue } ),
							label: __( 'Background color', 'easy-survey' ),
						},
					] }
				>
					<ContrastChecker
						{ ...{
							textColor,
							backgroundColor,
						} }
						isLargeText={ false }
					/>
				</PanelColorSettings>
			</InspectorControls>
			<div className={ classnames( BLOCK_CLASS, className ) }>
				<RichText
					placeholder={ __( 'Survey question', 'easy-survey' ) }
					value={ question }
					onChange={ ( newValue ) =>
						setAttributes( { question: newValue } )
					}
				/>
				<RichText
					placeholder={ __( 'First option', 'easy-survey' ) }
					value={ option1 }
					onChange={ ( newValue ) =>
						setAttributes( { option1: newValue } )
					}
					className="wp-block-button__link"
					style={ style }
				/>
				<RichText
					placeholder={ __( 'Second option', 'easy-survey' ) }
					value={ option2 }
					onChange={ ( newValue ) =>
						setAttributes( { option2: newValue } )
					}
					className="wp-block-button__link"
					style={ style }
				/>
			</div>
		</>
	);
};

export default Edit;
