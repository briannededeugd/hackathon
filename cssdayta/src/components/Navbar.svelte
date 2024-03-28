<script>
import { cssdaytaStore } from '../dataStore.js'
import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let selectedIndex = 0;
let carousel;
let cssdayta = {};
const cellCount = 10;


onMount(() => {
    cssdaytaStore.subscribe((value) => {
        cssdayta = value; 
        console.log(cssdayta);
    });
});

 
// Function to rotate the carousel
function rotateCarousel() {
    const angle = selectedIndex / cellCount * -360;
    dispatch('rotate', { angle });
}

// Event handler for the previous button
function previous() {
    if(selectedIndex == 0) {
        selectedIndex = cellCount;
    }

    console.log('previous says "selectedIndex is '+selectedIndex+'"');
    selectedIndex--;
    rotateCarousel();
}

// Event handler for the next button
function next() {
    if(selectedIndex == cellCount - 1) {
        selectedIndex = -1;
    }

    console.log('next says "selectedIndex is '+selectedIndex+'"');
    selectedIndex++;
    rotateCarousel();
}

onMount(rotateCarousel);


</script>

<nav>
    <h1>CSS Day</h1>
    <a href="/" aria-label="CSS Day Logo">
      <!-- <img src="https://cssday.nl/_img/cssday-logo.svg" alt="CSS Day"> -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 614 383" width="100%" height="100%">
            <rect width="184" height="46" rx="7" ry="7"/>
            <rect width="46" height="122" y="55" rx="7" ry="7"/>
            <rect width="127" height="46" x="57" y="131" rx="7" ry="7"/>
            <rect width="46" height="110" x="215" rx="7" ry="7"/>
            <rect width="128" height="46" x="271" rx="7" ry="7"/>
            <rect width="64" height="46" x="275" y="65" rx="7" ry="7"/>
            <rect width="46" height="112" x="353" y="65" rx="7" ry="7"/>
            <rect width="128" height="46" x="215" y="131" rx="7" ry="7"/>
            <rect width="46" height="110" x="430" rx="7" ry="7"/>
            <rect width="128" height="46" x="486" rx="7" ry="7"/>
            <rect width="64" height="46" x="490" y="65" rx="7" ry="7"/>
            <rect width="46" height="112" x="568" y="65" rx="7" ry="7"/>
            <rect width="128" height="46" x="430" y="131" rx="7" ry="7"/>
            <rect width="127" height="46" y="206" rx="7" ry="7"/>
            <rect width="46" height="122" x="138" y="206" rx="7" ry="7"/>
            <rect width="46" height="122" y="261" rx="7" ry="7"/>
            <rect width="127" height="46" x="57" y="337" rx="7" ry="7"/>
            <rect width="128" height="46" x="215" y="206" rx="7" ry="7"/>
            <rect width="46" height="177" x="353" y="206" rx="7" ry="7"/>
            <rect width="46" height="122" x="215" y="261" rx="7" ry="7"/>
            <rect width="64" height="46" x="278" y="280" rx="7" ry="7"/>
            <rect width="46" height="110" x="430" y="206" rx="7" ry="7"/>
            <rect width="46" height="177" x="568" y="206" rx="7" ry="7"/>
            <rect width="64" height="46" x="494" y="270" rx="7" ry="7"/>
            <rect width="107" height="46" x="451" y="337" rx="7" ry="7"/>
        </svg>
    </a>
    
    <h2>
        {#each Object.keys(cssdayta) as year, i}
            {#if i === selectedIndex}
                {cssdayta[year].title}
            {/if}
        {/each}
    </h2>
    <div class="carousel" >
        <ul bind:this={carousel} style="transform: translateZ(-320px) rotateY({selectedIndex * -36}deg)">
        
            {#each Object.keys(cssdayta) as year, i}
                 <li class={i === selectedIndex} style="--theme-color:{cssdayta[year].color.hex}"><a href="/">{year}</a></li>
            {/each}
 
        </ul>
    </div>
    
    <p>
    {#each Object.keys(cssdayta) as year, i}
        {#if i === selectedIndex}
            <button class="previous-button" on:click={previous} style="--theme-color:{cssdayta[year].color.hex}">Previous</button>
            <button class="next-button" on:click={next} style="--theme-color:{cssdayta[year].color.hex}">Next</button>
        {/if}
    {/each}
    </p>

</nav>

<style>

    nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        z-index: 10;
        width: 100vw;
    }
    
    .carousel {
        perspective: 300px;
        position: relative;
        width: 5em;
        height: 2.5em;
    }

    h1 {
        display: none;
    }
    h2 {
        margin: 0;
        text-align: center;
    }

    p {
        text-align: center;
        margin: 0;
        

        & button {
            border: none;
            margin: 0;
            padding: .5em .25em;
            width: 5em;
            background-color: peru;
            box-shadow: 2px 2px rgb(40, 40, 40);

            --theme-color: peru;
            background: var(--theme-color);
        }
    }

    
    button:hover {
        filter: brightness(80%);
        color: antiquewhite;
        cursor: pointer;
    }

    button:active {
        filter: brightness(90%);
        translate: 2px 2px;
        transition: .5s;
        box-shadow: none;
    }

    nav > a {
        display: flex;
        justify-content: center;
        padding: .5em;
        padding-top: 1.5em;
        & svg {
            width: clamp(5rem, 15%, 20%);
            --theme-color: black;
        }
    }

    li a {
        color: antiquewhite;
        text-decoration: none;
    }


    ul {
        display: flex;
        gap: 1em;
        width: 100%;
        height: 80%;
        position: absolute;
        transform: translateZ(-320px);
        transform-style: preserve-3d;
        transition: transform 1s;

    }

    ul li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -1em;
        left: -1em;
        width: 100%;
        height: 100%;
        text-align: center;
        box-shadow: 2px #000080 ;
    }

    li {
        --theme-color: peru;
        background: var(--theme-color);
    }

    li:nth-child(1) { transform: rotateY(  0deg) translateZ(320px); }
    li:nth-child(2) { transform: rotateY( 36deg) translateZ(320px); }
    li:nth-child(3) { transform: rotateY( 72deg) translateZ(320px); }
    li:nth-child(4) { transform: rotateY(104deg) translateZ(320px); }
    li:nth-child(5) { transform: rotateY(138deg) translateZ(320px); }
    li:nth-child(6) { transform: rotateY(174deg) translateZ(320px); }
    li:nth-child(7) { transform: rotateY(210deg) translateZ(320px); }
    li:nth-child(8) { transform: rotateY(248deg) translateZ(320px); }
    li:nth-child(9) { transform: rotateY(286deg) translateZ(320px); }
    li:nth-child(10) { transform: rotateY(323deg) translateZ(320px); }


</style>