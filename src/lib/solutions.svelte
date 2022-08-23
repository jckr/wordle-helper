<script>
import {beforeUpdate} from 'svelte';
import Solution from './solution.svelte';
export let solutions = [], placed = [], unplaced = [];
let unplacedLetters = new Set();
beforeUpdate(async () => {
  unplacedLetters = new Set([...(unplaced.join('')).split('')]);
});
</script>

<div class="solutions">
	<div class="solution-length">
	{`${solutions.length} possible words`}
	</div>
	{#each solutions as solution}
	<Solution solution={solution} placed={placed} unplacedLetters={unplacedLetters} />
	{/each}
	</div>

  <style>
  .solutions {
		max-width: 500px;
		overflow-y: scroll;
		word-break:keep-all;
	}
</style>