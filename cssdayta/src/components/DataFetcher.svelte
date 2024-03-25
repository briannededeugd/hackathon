
<script>
    async function test() {
        const response = await fetch("https://cssday.nl/data.json");

        if (!response.ok) {
            console.log('Could not fetch data')
        }
                
        const cssdayta = await response.json();
        console.log(cssdayta);
    }

    test();
</script>


<h1>SvelteKit CSSDay</h1>