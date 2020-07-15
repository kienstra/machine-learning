/**
 * External dependencies
 */
import { getDocument, queries } from 'pptr-testing-library';

/**
 * WordPress dependencies
 */
import {
	createNewPost,
	saveDraft,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	compareToScreenshot,
	insertBlockFromInserter,
} from '../helpers';

const { getByLabelText, getByText } = queries;

test( 'question block', async () => {
	const blockName = 'Machine Learning Question';

	// Create a new post and add the AR Viewer block.
	await createNewPost();
	await insertBlockFromInserter( blockName );
	await page.waitForSelector( '.wp-block' );
	await compareToScreenshot( 'machine-learning/question' );

	const document = await getDocument( page );
	getByText( document, /ask a question/i );
	expect( getByText( document, /get the answer/i ) ).toBeInTheDocument();
	await saveDraft();
	await page.reload();
} );
