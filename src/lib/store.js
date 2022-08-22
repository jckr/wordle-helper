import { writable } from 'svelte/store';

import { letters, solutions } from './words';

export const placed = writable(['', '', '', '', '']);
export const unplaced = writable(['', '', '', '', '']);
export const absent = writable('');
export const validSolutions = writable(solutions);
const letterProbs = letters.reduce((prev, curr) => {
	prev[curr] = 1;
	return prev;
}, {});

export const probabilities = writable([]);
