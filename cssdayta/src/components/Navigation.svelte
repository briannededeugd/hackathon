
<script context="module">
    import { writable } from 'svelte/store';
    export const selectedYearStore = writable(null);
</script>



<!-- Script for navigation bar -->
<script>
    import { onMount } from 'svelte';
    import { cssdaytaStore } from '../dataStore.js';

    let prevArrow = "../images/prev-arrow.png";
    let nextArrow = "../images/next-arrow.png";

    let index = 0;
    let activeIndex = 0;
    let cssdayta = {};

     // Subscribe to cssdaytaStore when the component mounts
     onMount(() => {
        const unsubscribe = cssdaytaStore.subscribe((value) => {
            cssdayta = value; // Update cssdayta when the store changes

            // Set selectedYear to 2024 if it's not already set
            if (!selectedYearStore && cssdayta && Object.keys(cssdayta).includes('2024')) {
                showSlide(Object.keys(cssdayta).length - 1); // Start with year 2024 as default
            }
        });

        return unsubscribe; // Unsubscribe from the store when the component is destroyed
    });

    // Update CSS variables when selectedYear changes
    $: {
        const selectedYear = $selectedYearStore; // Get the current value of selectedYear from the store
        if (selectedYear && cssdayta?.[selectedYear]?.color) {
            document.documentElement.style.setProperty('--assigned-color', cssdayta[selectedYear].color.hex);
        }
    }

    $: console.log('Selected year:', $selectedYearStore);

    // Function to handle carousel navigation
    function showSlide(offset) {
        index = (index + offset + Object.keys(cssdayta).length) % Object.keys(cssdayta).length; // Calculate the available years and put in index
        activeIndex = index; // Set this index as the active one 
        const newSelectedYear = Object.keys(cssdayta)[index]; // Put the selected index in a newSelectedYear var
        selectedYearStore.set(newSelectedYear); // Set the selectedYear value in the writable store
    }
</script>


  
  <nav>
    <h1>CSS Day</h1>
    <a href="#" aria-label="CSS Day Logo">
        <!-- <img src="https://cssday.nl/_img/cssday-logo.svg" alt="The CSS Day Logo"> -->
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

    <h2>Attendees</h2>

    <div class="carousel">
        <button aria-label="Previous button" class="prev" on:click={() => showSlide(-1)}>
            <img aria-hidden="true" focusable="false" src={prevArrow} alt="Previous arrow icon">
        </button>
        <ul>
            {#each Object.keys(cssdayta) as year, i}
                <li class:selected={i === activeIndex}><a href="{cssdayta[year].link}">{year}</a></li>
            {/each}
        </ul>
        <button aria-label="Next button" class="next" on:click={() => showSlide(1)}>
            <img aria-hidden="true" focusable="false" src={nextArrow} alt="Next arrow icon">
        </button>
    </div>
</nav>

  <!-- Styling navigation bar -->
  <style>

      h1 {
          display: none;
      }

      h2 {
        margin: 0;
        padding: 0.5em;
        border: 3px solid var(--assigned-color, black);
      }

      nav {
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 2em;
        align-items: center;
        position: absolute;
        z-index: 10;
        margin-top: 1.5em;
    }
  
      nav a:nth-of-type(1) {
          width: 3em;
          height: 1.6em;
          text-align: center;
      }

    
  
      .carousel {
          display: flex;
          justify-content: center;
          align-items: center;
          gap:0.5em;
  
          & button {
            border: 3px solid var(--assigned-color, #000); /* Fallback black border */
            background-color: var(--assigned-color);
            border-radius: 0.5em;
            width: 3.5em;
            height: 4em;
            cursor: pointer;
            padding: 0;
            margin: 0;
          }

          & button img {
            width: 1.6em;
            margin: auto;
          }
      }
  
      a {
          font-size: 2em;
      
        & img { 
            width: clamp(5rem, 15%, 20%);
        }
    }

    svg {
        fill: var(--assigned-color, black);
        /* filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 1)); */
        /* background-color: white; */
    }
  
      nav ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          scroll-padding: 0;
          
          scrollbar-width: none;
          
          overflow-x: scroll;
          scroll-snap-type: x mandatory; /* Snap items horizontally */
  
          width: clamp(5em, 4em, 4em);
          gap: 4em;
          transition: transform 0.3s ease;
          
      }

  
      nav ul li.selected {
          scroll-snap-align: center; /* Adjust alignment as needed */
          scroll-behavior: smooth;
          transition: transform 1s ease-in-out; /* Smooth transition for scrolling */
      }
  
      nav ul li a {
          text-decoration: none; 
          color: inherit;
      }


      /* Media query */
      @media (width < 30em) {
        nav {
            flex-wrap: wrap;
        }

        .carousel {
            gap: 0.5em;
        }

        .carousel button {
            width: 2.7em;
            height: 3em; 
        }

        .carousel button img {
            width: 1.5em;
        }

        nav ul {
            width: 20vw;
        }

        nav ul li a {
              font-size: 1.8em;
          }
      }
  
      @media (max-width: 20em) { 
          nav ul li a {
              font-size: 1.5em;
          }
      }
  </style>
  