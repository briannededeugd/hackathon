<script>
	import Navbar from "../components/Navbar.svelte"
	import Worldmap from "../components/Worldmap.svelte";
  	import DataFetcher from '../components/DataFetcher.svelte';

</script>

<header>
	<Navbar />
</header>

<body>
    <Worldmap />
    <DataFetcher />
</body>

<style>
	body {
		margin: 0;
		padding: 0;
	}
</style>
