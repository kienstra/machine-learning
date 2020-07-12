/**
 * External dependencies
 */
import { getDocument, queries } from 'pptr-testing-library';

/**
 * WordPress dependencies
 */
import {
	createNewPost,
	saveDraft
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	compareToScreenshot,
	insertBlockFromInserter,
} from '../helpers';

const { getByLabelText } = queries;

test( 'survey block', async () => {
	const blockName = 'Machine Learning';

	// Create a new post and add the AR Viewer block.
	await createNewPost();
	await insertBlockFromInserter( blockName );
	await page.waitForSelector( '.wp-block' );
	await compareToScreenshot( 'machine-learning/survey' );

	const document = await getDocument( page );
	const surveyQuestion = 'What is your favorite color?';
	await ( await getByLabelText( document, /survey question/i ) ).focus();
	await page.keyboard.type( surveyQuestion );

	// The block should have the text 'model' in it.
	const firstOption = 'Green is good';
	const secondOption = 'Red is better';
	await ( await getByLabelText( document, /first option/i ) ).focus();
	await page.keyboard.type( firstOption );
	await ( await getByLabelText( document, /second option/i ) ).focus();
	await page.keyboard.type( secondOption );

	await saveDraft();
	await page.reload();

	// The entered values should still be present after a page reload.
	await expect( page ).toMatch( surveyQuestion );
	await expect( page ).toMatch( firstOption );
	await expect( page ).toMatch( secondOption );
} );
