
<svelte:head>
	<title>World Helper</title>
	<meta name="description" content="Companion app for Wordle" />
</svelte:head>

<script>
 	import {solutions, updateSolutions} from './lib/words';
 	import Keyboard from './lib/keyboard.svelte';
	import {absent, placed, unplaced, validSolutions, probabilities} from './lib/store.js';

	let absentValue = '', placedValue = [], unplacedValue = [], validSolutionsValue = [], probabilitiesValue = [];

	absent.subscribe(value => absentValue = value);
	placed.subscribe(value => placedValue = value);
	unplaced.subscribe(value => unplacedValue = value);
	validSolutions.subscribe(value => validSolutionsValue = value);
	probabilities.subscribe(value => probabilitiesValue = value);
	
 	let focus = 0;
 	
	function handleType(e) {
  	handleKey(e.detail.key);
	}
	function handleClick(key) {
		return e => handleKey(key)
	}

	function update() {
		$validSolutions  = updateSolutions($validSolutions, $placed, $unplaced, $absent);
	}

	function handlePlaced(key, index) {
		const nextPlaced = [...$placed];
		if (key === 'del') {
			nextPlaced[index] = '';
			
		} else {
			nextPlaced[index] = key;
			focus = (focus + 1) %5;
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
						focus = 5 + (focus + 1) % 5;
					}
			}
		}
		$unplaced = nextUnplaced;
		update();
		return;
	} 

	function handleKey(key) {

		if (key === 'left') {
			focus = (focus + 10) % 11;
			return;
		}
		if (key === 'right') {
			focus = (focus + 1) % 11;
			return;
		}
		
		// placed letters
		if (focus < 5) {
			return handlePlaced(key, focus);
		}

		// unplaced letters
		if (focus < 10) {
			return handleUnplaced(key, focus - 5);
		}
	
		// absent
		if (key === 'del') {
			$absent = $absent.substring(0, $absent.length - 1);
			update();
			return;
		}
		if (absentValue.length < 25) {
			if (!$absent.includes(key)) {
				$absent = $absent + key;
				update();
				return;
			}
		}
	}
</script>

<section>
<div class="letter-block">
	<div class="columns">
	{#each [0,1,2,3,4] as index} 
		<div class="column">
	
		<div 
			class="placed" 
			class:focus = {index === focus}
			class:set = {$placed[index].length}
			on:click={() => focus = index}
			tabindex={index}
			>
			{$placed[index] || ' '} 
		</div>
		<div 
			class="unplaced"
			class:focus = {index + 5 === focus}
			class:set = {$unplaced[index].length}
			tabindex={index + 5}
			on:click={() => focus = index + 5}
		>	{$unplaced[index] || ' '} </div>
		</div>
	{/each}
	</div>
	<div 
		class="absent"
		class:focus = {focus === 10}
	on:click={() => focus = 10}>{$absent}</div>
	</div>

  <Keyboard on:type={handleType}/>
	
	<div class="solutions">
	<div class="solution-length">
	{`${validSolutionsValue.length} possible words`}
	</div>
	{#each validSolutionsValue as solution}
	<span>{solution}</span>
	{/each}
	</div>
</section>


<style>
	
	.letter-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80%;
	}
	.unplaced-letters {
		min-height: 1rem;
	}
	.columns {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.letter-block .placed, .letter-block .unplaced, .letter-block .absent {
		background: white;
		height: 1rem;
		width: 1rem;
		margin: 0.5rem;
		border: 2px solid white;
		border-radius: 5px;
		padding: 1rem;
	}

	.letter-block .placed.set {
		background: green;
		color: white;
		text-transform: uppercase;
		text-align: center;
	}

	.letter-block .absent {
		width: 18rem;
	}
	.letter-block .focus {
		border: 2px solid black;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	.solutions {
		width:60%;
		
		overflow-y: scroll;
		word-break:keep-all;

	}
	.solutions span {margin: 0.5rem;
	display:inline-block;
	border-radius: 0.5rem;
	padding: 0.5rem;
	background: white;


	 }
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	
</style>
