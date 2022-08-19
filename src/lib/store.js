import { writable } from 'svelte/store';

import { letters, solutions } from './words';

export const placed = writable(['', '', '', '', '']);
export const unplaced = writable(['', '', '', '', '']);
export const absent = writable('');
export const validSolutions = writable(solutions);
export const probabilities = writable(
	letters.reduce((curr, prev) => {
		prev.curr = 1;
		return prev;
	}, {})
);