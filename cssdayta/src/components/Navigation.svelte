<!-- Script for navigation bar -->
<script>
    import { onMount } from 'svelte';
    import { cssdaytaStore } from '../dataStore.js';

    let index = 0;
    let activeIndex = 0;
    let selectedYear = null;
    let cssdayta = {};

    // Subscribe to cssdaytaStore when the component mounts
    onMount(() => {
        const unsubscribe = cssdaytaStore.subscribe((value) => {
            cssdayta = value; // Update cssdayta when the store changes
            console.log(cssdayta);
        });

        return unsubscribe; // Unsubscribe from the store when the component is destroyed
    });

    // Update CSS variables when selectedYear changes
    $: {
        if (selectedYear && cssdayta?.[selectedYear]?.color) {
            document.documentElement.style.setProperty('--assigned-color', cssdayta[selectedYear].color.hex);
        }
    }

    // Function to handle carousel navigation
    function showSlide(offset) {
        index = (index + offset + Object.keys(cssdayta).length) % Object.keys(cssdayta).length; // Calculate the available years and put in index
        activeIndex = index; // Set this index as the active one 
        selectedYear = Object.keys(cssdayta)[index]; // Put the selected index in a selectedYear var
    }
</script>

  
  <nav>
    <h1>CSS Day</h1>
    <a href="#" aria-label="CSS Day Logo">
        <img src="https://cssday.nl/_img/cssday-logo.svg">
    </a>

    <h2>Title</h2>

    <div class="carousel">
        <button class="prev" on:click={() => showSlide(-1)}></button>
        <ul>
            {#each Object.keys(cssdayta) as year, i}
                <li class:selected={i === activeIndex}><a href="#">{year}</a></li>
            {/each}
        </ul>
        <button class="next" on:click={() => showSlide(1)}></button>
    </div>

    {#if selectedYear && cssdayta?.[selectedYear]?.color}
        <p>The color hex for {selectedYear} is: {cssdayta[selectedYear].color.hex}</p>
    {:else}
        <p>No color data available for {selectedYear}</p>
    {/if}
</nav>

  <!-- Styling navigation bar -->
  <style>
      h1 {
          display: none;
      }

      h2 {
        margin: 0;
        padding: 0.5em;
        border: 3px solid  #cd853f;
      }

      nav {
        display: flex;
        gap: 2em;
        align-items: center;
        position: absolute;
        z-index: 10;
        margin-top: 1.5em;
    }
  
      nav a:nth-of-type(1) {
          /* display: flex;
          justify-content: space-between; */
          width: 3em;
          height: 1.6em;
          text-align: center;
          /* align-items: center; */
      }

    
  
      .carousel {
          display: flex;
          justify-content: center;
  
          & button {
              border: none;
              background-color: var(--assigned-color);
              border-radius: 0.5em;
              width: 4em;
              height: 4em;
              cursor: pointer;
              padding: 0;
              margin: 0;
          }
      }
  
      a {
          font-size: 2em;
      
        & img { 
            width: clamp(5rem, 15%, 20%);
        }
    }
  
      nav ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          
          scrollbar-width: none;
          
          overflow-x: scroll;
          scroll-snap-type: x mandatory; /* Snap items horizontally */
  
          width: 11vw;
          gap: 1.5em;
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
      @media (width > 35em) {
        nav {
            display: flex;
            justify-content: center;
        }
      }
  
      @media screen and (max-width: 25em) { 
          nav ul li a {
              font-size: 1.5em;
          }
      }
  </style>
  