<script>
	import Navbar from "../components/Navbar.svelte"
	import Worldmap from "../components/Worldmap.svelte";
  import DataFetcher from '../components/DataFetcher.svelte';
  import Navigation from '../components/Navigation.svelte';

</script>

<!-- <header>
	<Navigation />
</header> -->

<header>
	<Navbar />
</header>

<body>
    <Worldmap />
    <DataFetcher />
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

</style>
