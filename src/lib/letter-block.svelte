<script>
import {absent, focus, placed, unplaced} from './store';
const columns = [0,1,2,3,4];
</script>

<div class="letter-block">
  <h2>Placed letters</h2>
	<div class="columns">
	{#each columns as index} 
		<div class="column">
      <div 
        class="placed" 
        class:focus = {index === $focus}
        class:set = {$placed[index].length}
        on:click={() => $focus = index}
        tabindex={index}
        >
        {$placed[index] || ' '} 
      </div>
		</div>
	{/each}
  </div>
  <h2>Unplaced letters</h2>
	<div class="columns">
  {#each columns as index} 
		<div class="column">
      <div 
        class="unplaced"
        class:focus = {index + 5 === $focus}
        class:set = {$unplaced[index].length}
        tabindex={index + 5}
        on:click={() => $focus = index + 5}
      >	{$unplaced[index] || ' '} </div>
		</div>
	{/each}
	</div>
  <h2>Letters not in word</h2>
	<div 
		class="absent"
		class:focus = {$focus === 10}
	on:click={() => $focus = 10}>{$absent}</div>
	</div>

<style>
	.letter-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 500px;
		width: 100%;
	}
  h2 {
    width: 17rem;
    font-weight: bold;
    margin-bottom: 0;
  }
  h2:after {
    content: ':'
  }
	.columns {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
	}
	.column {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5em;
		margin: 0 0.5rem;
		flex-direction: column;
	}
	.letter-block .placed, .letter-block .unplaced, .letter-block .absent {
		margin: 0.5rem 0;
		width: 100%;
		height: 2.5rem;
		border: 2px solid white;
		border-radius: 5px;
		padding: 0.25rem;
	}

	.letter-block .unplaced {
		max-width: 1.5rem;
		padding: 0.25rem 0.75rem;
		overflow-wrap: anywhere
	}

	.letter-block .placed {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.letter-block .unplaced.set {
		background: var(--present);
	}
	.letter-block .placed.set {
		background: var(--correct);
		color: white;
		text-transform: uppercase;
		text-align: center;
	}

	.letter-block .absent {
		width: 17rem;
	}
	.letter-block .focus {
		background: white;
		border: 2px solid black;
	}
  </style>
