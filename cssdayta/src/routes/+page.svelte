<script>
	import Navbar from "../components/Navbar.svelte"
	import Worldmap from "../components/Worldmap.svelte";
  	import Navigation from '../components/Navigation.svelte';

	let theme = 'standard';

	// Function to toggle between themes
	function toggleTheme() {
		theme = theme === 'standard' ? 'dynamic' : 'standard';
	}
</script>

<header>
	<button on:click={toggleTheme}>Theme</button>
	{#if theme === 'standard'}
  		<Navigation />
	{:else}
  		<Navbar />
	{/if}
</header>


<body>
    <Worldmap />
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;
		font-family: "Source Code Pro", monospace;
	}

	header {
		display: flex;
		justify-content: center;
		position: absolute;
		width: 100vw;
	}

	button {
		position: absolute;
		left: 90vw;
		top: 2em;
		z-index: 15;
	}

</style>
