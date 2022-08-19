
<svelte:head>
	<title>World Helper</title>
	<meta name="description" content="Companion app for Wordle" />
</svelte:head>

<script>
 import {solutions, updateSolutions} from './lib/words';
 import Keyboard from './lib/keyboard.svelte';
 let validSolutions = solutions;
 let placedValues = ['','','','',''];
 let refPlacedValues = [];

 let unplacedValues = ['','','','',''];
 let refUnplacedValues = [];

 let focus = 0;
 let absent = '';

 const keyboard = [
	 'qwertyuiop'.split(''),
	 'asdfghjkl'.split(''),
	 ['left', 'right', ...'zxcvbnm'.split(''), 'del']
 ];

function handleType(e) {
  handleKey(e.detail.key);

}
function handleClick(key) {
	return e => handleKey(key)
}

function update() {
	validSolutions = updateSolutions(validSolutions, placedValues, unplacedValues, absent);
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
			if (key === 'del') {
				placedValues[focus] = '';
				update();
				return;
			}
			placedValues[focus] = key;
			focus = (focus + 1) %5;
			update();
			return;
		}
		// unplaced letters
		if (focus < 10) {

		
		if (key === 'del') {
			unplacedValues[focus - 5] = unplacedValues[focus - 5].substring(0, unplacedValues[focus - 5].length - 1);
			update();
			return;
		}

		if (unplacedValues[focus - 5].length < 5) {
			if (!unplacedValues[focus - 5].includes(key)) {
				unplacedValues[focus - 5] = (unplacedValues[focus - 5] || '')  + key;
				update();
				return;
			}
			if (unplacedValues[focus - 5].length === 5) {
				focus = 5 + (focus + 1) % 5;
			}
		}
		}
	
	// absent
		if (key === 'del') {
			absent = absent.substring(0, absent.length - 1);
			update();
			return;
		}
		if (absent.length < 25) {
			if (!absent.includes(key)) {
				absent = absent + key;
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
			bind:this={refPlacedValues[index]}
			on:click={() => focus = index}
			tabindex={index}
			>
			{placedValues[index] || ' '} 
		</div>
		<div class={`unplaced ${index + 5 === focus  ? 'focus' : ''}`} bind:this={refUnplacedValues[index]} tabindex={index + 5}
		on:click={() => focus = index + 5}
		>	{unplacedValues[index] || ' '} </div>
		</div>
	{/each}
	</div>
	<div class={`absent ${focus === 10 ? 'focus' : ''}`}
	on:click={() => focus = 10}>{absent}</div>
	</div>

  <Keyboard on:type={handleType}/>
	
	<div class="solutions">
	<div class="solution-length">
	{`${validSolutions.length} possible words`}
	</div>
	{#each validSolutions as solution}
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
