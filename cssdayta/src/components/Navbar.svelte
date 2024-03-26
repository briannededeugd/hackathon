<script>
// var carousel = document.querySelector('.carousel ul');
// var cellCount = 9;
// var selectedIndex = 0;

// function rotateCarousel() {
//   var angle = selectedIndex / cellCount * -360;
//   carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
// }


import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let selectedIndex = 0;
let carousel;


// Function to rotate the carousel
function rotateCarousel() {
const cellCount = 9;
const angle = selectedIndex / cellCount * -360;
dispatch('rotate', { angle });
}

// Event handler for the previous button
function previous() {
selectedIndex--;
rotateCarousel();
}

// Event handler for the next button
function next() {
selectedIndex++;
rotateCarousel();
}

onMount(rotateCarousel);

</script>

<nav>
    <a href="/" aria-label="CSS Day Logo">
      <img src="https://cssday.nl/_img/cssday-logo.svg" alt="CSS Day">
    </a>
    <h1>CSS Day</h1>
     
    <div class="carousel" >
        <ul bind:this={carousel} style="transform: translateZ(-288px) rotateY({selectedIndex * -40}deg)">
            <!-- <li><a href="/">2024</a></li>
            <li><a href="/">2023</a></li>
            <li><a href="/">2022</a></li>
            <li><a href="/">2019</a></li>
            <li><a href="/">2018</a></li>
            <li><a href="/">2017</a></li>
            <li><a href="/">2016</a></li>
            <li><a href="/">2015</a></li>
            <li><a href="/">2014</a></li>
            <li><a href="/">2013</a></li> -->

            {#each [2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013] as year}
                 <li><a href="/">{year}</a></li>
            {/each}
        </ul>
    </div>
    <p>
        <button class="previous-button" on:click={previous}>Previous</button>
        <button class="next-button" on:click={next}>Next</button>
    </p>

</nav>

<style>

    nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2em;
        margin-top: 1em;
        z-index: 10;
        width: 100vw;
    }
    
    .carousel {
        perspective: 1000px;
        position: relative;
        border: 1px solid #CCC;
        width: 5em;
        height: 2.5em;
    }

    h1 {
        display: none;
    }
    
    p {
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    a img {
        width: 10em;
    }

    ul {
        display: flex;
        gap: 2em;
        /* padding: 0;
        overflow: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;
        scroll-snap-align: center;
        scroll-padding: 2em; */

        width: 100%;
        height: 100%;
        position: absolute;
        transform: translateZ(-288px);
        transform-style: preserve-3d;
        transition: transform 1s;

    }

    ul li {
        list-style: none;
        position: absolute;
        top: -1em;
        left: -1em;
        width: 90%;
        height: 90%;
        border: 1px solid rgba(0, 0, 0, 0.541);
        color: white;
        text-align: center;
    }

    li:nth-child(9n+1) { background: hsla(  0, 100%, 50%, 0.8); }
    li:nth-child(9n+2) { background: hsla( 40, 100%, 50%, 0.8); }
    li:nth-child(9n+3) { background: hsla( 80, 100%, 50%, 0.8); }
    li:nth-child(9n+4) { background: hsla(120, 100%, 50%, 0.8); }
    li:nth-child(9n+5) { background: hsla(160, 100%, 50%, 0.8); }
    li:nth-child(9n+6) { background: hsla(200, 100%, 50%, 0.8); }
    li:nth-child(9n+7) { background: hsla(240, 100%, 50%, 0.8); }
    li:nth-child(9n+8) { background: hsla(280, 100%, 50%, 0.8); }
    li:nth-child(9n+9) { background: hsla(280, 100%, 50%, 0.8); }
    li:nth-child(9n+0) { background: hsla(320, 100%, 50%, 0.8); }

    li:nth-child(1) { transform: rotateY(  0deg) translateZ(288px); }
    li:nth-child(2) { transform: rotateY( 36deg) translateZ(288px); }
    li:nth-child(3) { transform: rotateY( 72deg) translateZ(288px); }
    li:nth-child(4) { transform: rotateY(108deg) translateZ(288px); }
    li:nth-child(5) { transform: rotateY(144deg) translateZ(288px); }
    li:nth-child(6) { transform: rotateY(180deg) translateZ(288px); }
    li:nth-child(7) { transform: rotateY(216deg) translateZ(288px); }
    li:nth-child(8) { transform: rotateY(252deg) translateZ(288px); }
    li:nth-child(9) { transform: rotateY(288deg) translateZ(288px); }
    li:nth-child(9) { transform: rotateY(324deg) translateZ(288px); }


</style>