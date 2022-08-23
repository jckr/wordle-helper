<script>
	import { createEventDispatcher } from 'svelte';
	import { probabilities } from './store';

	let solutionsValue = [];
	const dispatch = createEventDispatcher();
 	const keyboard = [
	 'qwertyuiop'.split(''),
	 'asdfghjkl'.split(''),
	 ['left', 'right', ...'zxcvbnm'.split(''), 'del']
 	];

	function display(key) {
		if (key.length === 1) {
			return key;
		}
		if (key === 'left') {
			return '←';
		}
		if (key === 'right') {
			return '→';
		}
		if (key === 'del') {
			return '⌫';
		}
	}

	function handleClick(key) {
  	return e => {
    	dispatch('type', {key}
    );
  }
}

</script>
<div class="keyboard">
	{#each keyboard as row}
	<div class="row">
	{#each row as key}
	<button 
		class:lots={key.length === 1 && $probabilities[key] > 0.1}
		class:some={key.length > 1 || $probabilities[key] < 0.05}
		class:few={key.length === 1 && $probabilities[key] < 0.01}
		class:none={key.length === 1 && $probabilities[key] < 0.00001}
	
	 on:click={handleClick(key)}>
	{display(key)}
	</button>
	{/each}
	</div>
	{/each}
	</div>

<style>
	.keyboard {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		align-items: center; 
		max-width: 500px;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 0 0 0.75rem;
	}
	button {
		min-height: 1rem;
		padding: max(0.5rem, 1.5vw);
		background: #ccc;
		border-radius: 0.375rem;
		min-width: 1rem;
		display: flex;
		justify-content: center;
		align-items: center; 
		cursor: pointer;
		text-transform: uppercase;
		box-shadow: 2px 2px 1px 1px rgb(0 0 0 / 10%);
		margin: 0 0.5rem 0 0;
	}
	button.few {
		background: #888;
	}
	button.none {
		background: black;
		color: white;
	}
	button.lots {
		background: white;
		color: #444;
	}
	
</style>
