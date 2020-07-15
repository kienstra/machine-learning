/**
 * External dependencies
 */
import * as React from 'react';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { BlockEditProps } from '@wordpress/blocks';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BLOCK_CLASS } from '../constants';

/**
 * @typedef {Object} EditAttributes The block attributes.
 * @property {string} category The category to get the text from.
 * @property {string} className The name of the class.
 * @property {string} textSource The source of the text.
 */

/**
 * The Edit component for the block.
 *
 * @param {BlockEditProps<EditAttributes>} props The component props.
 * @return {React.ReactElement} The Edit component of the block.
 */
const Edit = ( {
	attributes: {
		category,
		className,
		textSource,
	},
	setAttributes,
} ) => {
	const categoryTextSource = 'category';
	const [ categories, setCategories ] = useState( [] );

	useEffect( () => {
		let isMounted = true;

		apiFetch( {
			path: '/wp/v2/categories',
		} ).then( ( fetchedData ) => {
			if ( isMounted && Array.isArray( fetchedData ) ) {
				setCategories(
					fetchedData.map( ( singleCategory ) => {
						return { label: singleCategory.name, value: singleCategory.id };
					} )
				);
			}
		} );

		return function cleanUp() {
			isMounted = false;
		};
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Analyze text from', 'machine-learning' ) }
						value={ textSource }
						options={ [
							{
								label: __( 'This post', 'machine-learning' ),
								value: 'post',
							},
							{
								label: __( 'A category', 'machine-learning' ),
								value: categoryTextSource,
							},
						] }
						onChange={ ( newSource ) => {
							setAttributes( { textSource: newSource } );
						} }
					/>
					{ categoryTextSource === textSource && <SelectControl
						label={ __( 'Category', 'machine-learning' ) }
						value={ category }
						options={ categories }
						onChange={ ( newCat ) => {
							setAttributes( { category: newCat } );
						} }
					/> }
				</PanelBody>
			</InspectorControls>
			<div className={ classNames( BLOCK_CLASS, className ) }>
				<h4>{ __( 'Ask a question', 'machine-learning' ) }</h4>
				<div><input type="text" /></div>
				<Button>
					{ __( 'Get the answer', 'machine-learning' ) }
				</Button>
			</div>
		</>
	);
};

export default Edit;
