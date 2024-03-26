<script>
	import Worldmap from "../components/Worldmap.svelte";
  import DataFetcher from '../components/DataFetcher.svelte';
  import Navigation from '../components/Navigation.svelte';
</script>

<header>
	<Navigation />
</header>

<body>
    <Worldmap />
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

	body {
		margin: 0;
		padding: 0;
		font-family: "Source Code Pro", monospace;
	}

</style>
