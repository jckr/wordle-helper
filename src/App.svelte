
<svelte:head>
	<title>World Helper</title>
	<meta name="description" content="Companion app for Wordle" />
</svelte:head>

<script>
 	import {letterProbabilities, solutions, updateSolutions} from './lib/words';
 	import Keyboard from './lib/keyboard.svelte';
	import LetterBlock from './lib/letter-block.svelte';
	import Solutions from './lib/solutions.svelte';
	import {absent, focus, placed, unplaced, validSolutions, probabilities} from './lib/store.js';

	function handleType(e) {
  	handleKey(e.detail.key);
	}
	function handleClick(key) {
		return e => handleKey(key)
	}

	function update() {
		$validSolutions  = updateSolutions($validSolutions, $placed, $unplaced, $absent);
		$probabilities = letterProbabilities($validSolutions, $placed);
	}

	function handlePlaced(key, index) {
		const nextPlaced = [...$placed];
		if (key === 'del') {
			nextPlaced[index] = '';
			
		} else {
			nextPlaced[index] = key;
			$focus = ($focus + 1) %5;
		}
		$placed = nextPlaced;
		update();
		return;
	}

	function handleUnplaced(key, index) {
		const nextUnplaced = [...$unplaced];
		const thisUnplaced = $unplaced[index];

		if (key === 'del') {
			nextUnplaced[index] = thisUnplaced.substring(0, thisUnplaced.length - 1);			
		} else {
			if (!thisUnplaced.includes(key)) {
					nextUnplaced[index] = (thisUnplaced || '')  + key;
					if (nextUnplaced[index].length === 5) {
						$focus = 5 + ($focus + 1) % 5;
					}
			}
		}
		$unplaced = nextUnplaced;
		update();
		return;
	} 

	function handleKeydown(e) {
		if (e.key.length === 1) {
			return handleKey(e.key.toLowerCase());
		}
		if (e.key === 'ArrowRight' || (e.key === 'Tab' && e.shiftKey === false)) {
			return handleKey('right');
		}
		if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey === true)) {
			return handleKey('left');
		}
		if (e.key === 'Delete' || e.key === 'Backspace') {
			return handleKey('del');
		}
	}

	function handleKey(key) {

		if (key === 'left') {
			$focus = ($focus + 10) % 11;
			return;
		}
		if (key === 'right') {
			$focus = ($focus + 1) % 11;
			return;
		}
		
		// placed letters
		if ($focus < 5) {
			return handlePlaced(key, $focus);
		}

		// unplaced letters
		if ($focus < 10) {
			return handleUnplaced(key, $focus - 5);
		}
	
		// absent
		if (key === 'del') {
			$absent = $absent.substring(0, $absent.length - 1);
			update();
			return;
		}
		if ($absent.length < 25) {
			if (!$absent.includes(key)) {
				$absent = $absent + key;
				update();
				return;
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<section>
	<LetterBlock />
  <Keyboard on:type={handleType} />
	<Solutions solutions={$validSolutions} placed={$placed} unplaced={$unplaced} />	
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}	
</style>
