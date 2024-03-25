
<script>
    async function getCSSDayta() {
        const response = await fetch("https://cssday.nl/data.json");

        if (!response.ok) {
            console.log('Could not fetch data')
        }
                
        const cssdayta = await response.json();
        console.log(cssdayta);
    }

    getCSSDayta();
</script>

