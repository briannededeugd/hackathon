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
	<div>
		<button aria-label="Change theme" class="themeButton {theme === 'dynamic' ? 'active' : ''}" on:click={toggleTheme}></button>
	</div>

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

	div {
		position: absolute;
		left: 90vw;
		top: 2em;
		z-index: 15;
	}

	.themeButton {
		width: 60px;
		height: 30px;
		background-color: #ccc;
		border: none;
		border-radius: 1.2em;
		cursor: pointer;
		position: relative;
	}

	.themeButton::before {
			content: '';
			position: absolute;
			width: 1.8em;
			height: 1.8em;
			background-color: white;
			border-radius: 50%;
			top: 0.21em;
			left: 0.2em;
			transition: transform 0.3s;
			transform: translateX(2.3em);
	}

	.themeButton.active {
		background-color: green;
	}
		
	.themeButton.active::before {
		transform: translateX(0);
	}

	/* Button placement */
	@media (width < 42em) {
        div {
            top: 90vh;
			left: 80vw;
        }
      }

</style>
