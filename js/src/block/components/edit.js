/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import * as React from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BLOCK_CLASS } from '../constants';

/**
 * The Edit component for the block.
 *
 * @param {{
 *   attributes: {
 *     category: string,
 *     className: string,
 *     textSource: string
 *   },
 *   setAttributes: Function
 * }} props The component props.
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
	const [ categories, setCategories ] = React.useState( [] );

	React.useEffect( () => {
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
		} ).catch( () => {} );

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
