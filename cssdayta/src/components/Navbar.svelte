<script>

</script>

<nav>
    <a href="/" aria-label="CSS Day Logo">
      <img src="https://cssday.nl/_img/cssday-logo.svg" alt="CSS Day">
    </a>
    <h1>CSS Day</h1>
        
    <ul>
        <li><a href="/">2024</a></li>
        <li><a href="/">2023</a></li>
        <li><a href="/">2022</a></li>
        <li><a href="/">2019</a></li>
        <li><a href="/">2018</a></li>
        <li><a href="/">2017</a></li>
        <li><a href="/">2016</a></li>
        <li><a href="/">2015</a></li>
        <li><a href="/">2014</a></li>
        <li><a href="/">2013</a></li>
    </ul>

</nav>

<style>

    nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1em;
        position: absolute;
        z-index: 10;
    }

    h1 {
        display: none;
    }

    a img {
        width: 10em;
    }

    ul {
        display: flex;
        gap: 2em;
        overflow: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;
        width: 70vw;
    }

    ul li {
        list-style: none;
    }

</style>