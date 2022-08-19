
<svelte:head>
	<title>World Helper</title>
	<meta name="description" content="Companion app for Wordle" />
</svelte:head>

<script>
 	import {solutions, updateSolutions} from './lib/words';
 	import Keyboard from './lib/keyboard.svelte';
	import {absent, placed, unplaced, validSolutions, probabilities} from './lib/store.js';

	let absentValue, placedValue, unplacedValue, validSolutionsValue, probabilitiesValue;
	absent.suscribe(value => absentValue = value);
	placed.suscribe(value => placedValue = value);
	unplaced.suscribe(value => unplacedValue = value);
	validSolutions.suscribe(value => validSolutionsValue = value);
	probabilities.suscribe(value => probabilitiesValue = value);
	
 	let focus = 0;
 	
	function handleType(e) {
  	handleKey(e.detail.key);
	}
	function handleClick(key) {
		return e => handleKey(key)
	}

	function update() {
		validSolutions.update(updateSolutions(validSolutionsValue, placedValue, unplacedValue, absentValue));
	}

	function handlePlaced(key, index) {
		const nextPlaced = [...placedValue];
		if (key === 'del') {
			nextPlaced[index] = '';
			
		} else {
			nextPlaced[index] = key;
			focus = (focus + 1) %5;
		}
		placed.update(nextPlaced);
		update();
		return;
	}

	function handleUnplaced(key, index) {
		const nextUnplaced = [...unplacedValue];
		const thisUnplaced = unplacedValue[index];

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
		unplaced.update(nextUnplaced);
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
			absent.update(absentValue.substring(0, absentValue.length - 1));
			update();
			return;
		}
		if (absentValue.length < 25) {
			if (!absentValue.includes(key)) {
				absent.update(absentValue + key);
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
			class={`placed ${index === focus ? 'focus' : ''}`}
			on:click={() => focus = index}
			tabindex={index}
			>
			{placedValue[index] || ' '} 
		</div>
		<div class={`unplaced ${index + 5 === focus  ? 'focus' : ''}`} 
		tabindex={index + 5}
		on:click={() => focus = index + 5}
		>	{unplacedValue[index] || ' '} </div>
		</div>
	{/each}
	</div>
	<div class={`absent ${focus === 10 ? 'focus' : ''}`}
	on:click={() => focus = 10}>{absent}</div>
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
