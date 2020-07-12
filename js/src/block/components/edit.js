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
import { BlockEditProps } from '@wordpress/blocks';

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
 * @param {BlockEditProps<EditAttributes>} props The component props.
 * @return {React.ReactElement} The Edit component of the block.
 */
const Edit = ({
	attributes: {
		backgroundColor,
		className,
		option1,
		option2,
		textColor,
		question,
	},
	setAttributes,
}) => {
	const style = { backgroundColor, color: textColor };

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Color settings', 'machine-learning')}
					colorSettings={[
						{
							// @ts-ignore declaration is wrong.
							value: textColor,
							onChange: (newValue) =>
								// @ts-ignore declaration is wrong.
								setAttributes({ textColor: newValue }),
							label: __('Text color', 'machine-learning'),
						},
						{
							// @ts-ignore declaration is wrong.
							value: backgroundColor,
							onChange: (newValue) =>
								// @ts-ignore declaration is wrong.
								setAttributes({ backgroundColor: newValue }),
							label: __('Background color', 'machine-learning'),
						},
					]}
				>
					<ContrastChecker
						{...{
							textColor,
							backgroundColor,
						}}
						isLargeText={false}
					/>
				</PanelColorSettings>
			</InspectorControls>
			<div className={classnames(BLOCK_CLASS, className)}>
				<RichText
					placeholder={__('Survey question', 'machine-learning')}
					value={question}
					onChange={(newValue) =>
						setAttributes({ question: newValue })
					}
				/>
				<RichText
					placeholder={__('First option', 'machine-learning')}
					value={option1}
					onChange={(newValue) =>
						setAttributes({ option1: newValue })
					}
					className="wp-block-button__link"
					style={style}
				/>
				<RichText
					placeholder={__('Second option', 'machine-learning')}
					value={option2}
					onChange={(newValue) =>
						setAttributes({ option2: newValue })
					}
					className="wp-block-button__link"
					style={style}
				/>
			</div>
		</>
	);
};

export default Edit;
