<script>
export let solution = [], placed = [], unplacedLetters = new Set();
</script>

<span>
{#each solution.split('') as letter, i}
<span class:placed = {placed[i] === letter} class:unplaced = {placed[i] !== letter && unplacedLetters.has(letter)}>{letter}</span>
{/each}
</span>

<style>
	span {margin: 0.5rem 0.25rem;
    display:inline-block;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    background: #222;
  }
  span > span {
    display: inline;
    padding: 0;
    margin: 0;
    background: none;
    text-transform: uppercase;
    font-weight: bold;
    color: #eee;
  }

  span.placed {
    color: var(--correct);
  }
  span.unplaced {
    color: var(--present);
  }
  </style>
