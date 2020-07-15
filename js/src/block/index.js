/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit } from './components';
import { BLOCK_NAME } from './constants';

/**
 * Registers the Question block.
 */
export default registerBlockType( BLOCK_NAME, {
	title: __( 'Machine Learning Question', 'machine-learning' ),
	description: __(
		'Ask a question, and get an automatic response',
		'machine-learning'
	),
	category: 'common',
	icon: 'editor-table',
	keywords: [ __( 'Machine Learning', 'machine-learning' ) ],
	attributes: {
		category: {
			type: 'string',
		},
		className: {
			type: 'string',
		},
		textSource: {
			type: 'string',
		},
	},

	/**
	 * The block editor UI.
	 */
	edit: Edit,

	/**
	 * Renders in PHP.
	 *
	 * @see Block::render_block().
	 * @return {null} Rendered in PHP.
	 */
	save() {
		return null;
	},
} );
