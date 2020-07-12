/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import View from '../view';
import { BLOCK_CLASS } from './../../constants';

/**
 * Sets up the test by rendering the component.
 *
 * @param {Object} props The props to pass to the component.
 */
const setup = (props) => {
	render(<View {...props} />);
};

const getComponent = () => document.querySelector(`.${BLOCK_CLASS}`);
const hasText = (textToSearch, text) => -1 !== textToSearch.indexOf(text);
const expectedSubmitMessage = 'Thanks for doing the survey!';

describe('View', () => {
	it.each([
		['What do you like more?', 'Mac', 'PC'],
		['How many years until the next comet?', '10', '100'],
	])('displays the survey options', (question, option1, option2) => {
		setup({ option1, option2, question });

		[question, option1, option2].forEach((prop) => {
			expect(hasText(getComponent().textContent, prop)).toStrictEqual(
				true
			);
		});
	});

	it('does not display the submit message if it is not submitted', () => {
		setup();
		expect(
			hasText(getComponent().textContent, expectedSubmitMessage)
		).toStrictEqual(false);
	});

	it('displays the message when the form is submitted', async () => {
		const option1 = 'Foo';
		setup({ option1 });

		const optionButton = screen.getByText(option1);
		fireEvent.click(optionButton);

		await expect(
			hasText(document.body.textContent, expectedSubmitMessage)
		).toStrictEqual(true);
	});
});
