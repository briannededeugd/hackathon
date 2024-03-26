<!-- Script for navigation bar -->
<script>
    let index = 0;
    let activeIndex = 0;
  
    function showSlide(offset) {
        index = (index + offset + 10) % 10; // Assuming you have 10 years
        activeIndex = index;
    }
  </script>
  
  <nav>
      <h1>CSS Day</h1>
      <a href="#" aria-label="CSS Day Logo">
        <img src="https://cssday.nl/_img/cssday-logo.svg"></a>
   
      <div class="carousel">
          <button class="prev" on:click={() => showSlide(-1)}>1</button>
          <ul>
            {#each [2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013] as year, i}
              <li class:selected={i === activeIndex}><a href="#">{year}</a></li>
            {/each}
          </ul>
          <button class="next" on:click={() => showSlide(1)}>2</button>
      </div>
  </nav>
  
  <!-- Styling navigation bar -->
  <style>
      h1 {
          display: none;
      }

      nav {
        position: absolute;
        z-index: 10;
    }
  
      nav a {
          display: flex;
          justify-content: center;
      }

  
      .carousel {
          margin: 1em 0 0 0;
          display: flex;
          justify-content: center;
  
          & button {
              border: none;
              background-color: #cd853f;
              width: 4em;
              height: 4em;
              cursor: pointer;
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
          margin: 0 0 0 2em;
          
          scrollbar-width: none;
          
          overflow-x: scroll;
          scroll-snap-type: x mandatory; /* Snap items horizontally */
  
          width: 20vw;
          gap: 2em;
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
  
      @media screen and (max-width: 30em) { 
          nav ul li a {
              font-size: 1.5em;
          }
      }
  </style>
  