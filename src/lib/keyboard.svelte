<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
 const keyboard = [
	 'qwertyuiop'.split(''),
	 'asdfghjkl'.split(''),
	 ['left', 'right', ...'zxcvbnm'.split(''), 'del']
 ];
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
	<button on:click={handleClick(key)}>
	{key}
	</button>
	{/each}
	</div>
	{/each}
	</div>

<style>
.keyboard {
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
	.row button {
		min-height: 1rem;
		padding: 0.5rem;
	background: #eee;
		border-radius: 0.375rem;
		min-width: 1rem;
		display: flex;
		justify-content: center;
		align-items: center; 
cursor: pointer;
	box-shadow: 2px 2px 1px 1px rgb(0 0 0 / 10%);
	margin: 0 0.5rem 0 0;
	}
</style>
