<script>
	import pkg from 'mapbox-gl';
	const { Map } = pkg;
	import '/node_modules/mapbox-gl/dist/mapbox-gl.css';
  	import { cssdaytaStore } from '../dataStore.js'
	import {selectedYearStore} from './Navigation.svelte'

	let map;
	let mapContainer;
	let lng, lat, zoom;
    let cssdayta = {};
	let selectedYear;
    let selectedYearString;

	lng = -71.224518;
	lat = 42.213995;
	zoom = 9;

	import { onMount, onDestroy } from 'svelte';

	// Subscribe to changes in selectedYearStore
    let unsubscribeSelectedYear;
	
	$: {
    unsubscribeSelectedYear = selectedYearStore.subscribe(value => {
        selectedYearString = value;
		selectedYear = parseInt(value);
		console.log("Selected year in Worldmap:", selectedYear);
        console.log(selectedYear);
    
    });
}

    function checkTime() {
        const date = new Date();
        const hours = date.getHours();
        console.log(`${hours}:00`);

        if (hours >= 18) {
            return `mapbox://styles/mapbox/satellite-streets-v12`;
        } else {
            return `mapbox://styles/mapbox/streets-v12`
        }
    }

    function generatePaintFillColor(year) {
    const paintExpressions = ['match', ['get', 'iso_3166_1']];

    for (const [iso_3166_1] of Object.entries($cssdaytaStore[year].attendees.countries)) {
        const color = $cssdaytaStore[year].color.hex;
        paintExpressions.push(iso_3166_1, color);
    }      

    paintExpressions.push('rgba(0, 0, 0, 0)');

    return paintExpressions;
}
    
    //  TODO: Set color by year.
//     async function generatePaintFillColor(year) {

//     return new Promise((resolve, reject) => {
//         try {
//             const paintExpressions = ['match', ['get', 'iso_3166_1']];
        
//             for (const [year, item] of Object.entries($cssdaytaStore)) {
//                 const color = item.color.hex;
//                 const attendeesTotal = item.attendees.count;
//                 const allCountriesPerYear = item.attendees.countries;
//                 // console.log("ALL COUNTRIES PER YEAR:", allCountriesPerYear);
    
//                 for (const [country, countriesAttendees] of Object.entries(allCountriesPerYear)) {
//                     let country_color = {'country' : country, 'color' : color}
//                     paintExpressions.push(country_color);
//                 }
//             }
//             console.log(paintExpressions)
//             resolve(paintExpressions);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
	onMount(() => {

		map = new Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1IjoiYnJpYW5uZWRlZGV1Z2QiLCJhIjoiY2x1NnR2Ymk2MXlzejJpbng3bWFkbjdhdyJ9.lpu8pVnq6PKL2BglA4tPSg',
			style: checkTime(),
			projection: 'globe',
			zoom: 1.5,
			center: [20, 40]
		});
		
		window.addEventListener('resize', function () {
			if (window.innerWidth <= 768) {
				map.setZoom(0.5); // Adjust zoom level for smaller screens
			} else {
				map.setZoom(1.5); // Default zoom level for larger screens
			}
		});

		map.on('style.load', () => {
			map.setFog({}); // Set the default atmosphere style
		});

        map.on('mouseover', () => {
            // map.addLayer(
            //     {
			// 		id: 'one',
			// 		source: {
			// 			type: 'vector',
			// 			url: 'mapbox://mapbox.country-boundaries-v1',
			// 		},
			// 		'source-layer': 'country_boundaries',
			// 		type: 'fill',
			// 		paint: {
			// 			'fill-color': 'white',
			// 			'fill-opacity': .3,
			// 		}, 
            // 	},
            // 	'country-label'
        	// );
			
			// if (map.getLayer(`!'${selectedYear}'`)) {
			// 	map.removeLayer()
			// }

            console.log("get style", map.getStyle().layers)

            let lastElement = map.getStyle().layers.length - 3;
            console.log(map.getStyle().layers[lastElement].id)
            console.log("last element", lastElement);
            

            // console.log(selectedYearString)            
            // if (map.getStyle().layers[lastElement].id !== selectedYearString) {
            //     // map.removeLayer(withId = selectedYearString);
            //     map.removeSource(selectedYearString)
            // }

           
            // const mapLayer = map.getLayer(selectedYearString)
			// console.log("get layer:", mapLayer)

            function timeOut() {
                setTimeout(function() { 
                map.addLayer({
                    id: `'${selectedYearString}'`,
                    source: {
                        type: 'vector',
                        url: 'mapbox://mapbox.country-boundaries-v1',
                    },
                    'source-layer': 'country_boundaries',
                    type: 'fill',
                    paint: {
                        'fill-color': generatePaintFillColor(selectedYear),
                        'fill-opacity': 1,
                    },
			}, 'country-label')}, 50);
            }
            
  
            timeOut();

             function timeOutRemove() {
                setTimeout(console.log(map.removeLayer(`'${parseInt(selectedYearString) - 1}'`)), 150);
            }
            
            timeOutRemove();

            
			
			// map.addLayer({
			// 	'id': 'outline',
			// 	'type': 'line',
			// 	'source': {
			// 		'type': 'vector',
			// 		'url': 'mapbox://mapbox.country-boundaries-v1',
			// 	},
			// 	'source-layer': 'country_boundaries',
			// 	'layout': {},
			// 	'paint': {
			// 		'line-color': 'black',
			// 		'line-width': .1, 
			// 	}      
			// });

		// // Check if the layer is recognized after loading
		// updateMapLayer();
        });
        


		// At low zooms, complete a revolution every two minutes.
		const secondsPerRevolution = 120;
		// Above zoom level 5, do not rotate.
		const maxSpinZoom = 5;
		// Rotate at intermediate speeds between zoom levels 3 and 5.
		const slowSpinZoom = 3;

		let userInteracting = false;
		let spinEnabled = true;

        // TODO: Fix user mobile interaction
		function spinGlobe() {
			const zoom = map.getZoom();
			if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
				let distancePerSecond = 360 / secondsPerRevolution;
				if (zoom > slowSpinZoom) {
					// Slow spinning at higher zooms
					const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
					distancePerSecond *= zoomDif;
				}
				const center = map.getCenter();
				center.lng -= distancePerSecond;
				// Smoothly animate the map over one second.
				// When this animation is complete, it calls a 'moveend' event.
				map.easeTo({ center, duration: 1000, easing: (n) => n });
			}
		}

		// Pause spinning on interaction
		map.on('mousedown', () => {
			userInteracting = true;
        spinEnabled = false;
		});

		// Restart spinning the globe when interaction is complete
		map.on('mouseup', () => {
			userInteracting = false;
			spinGlobe();
            spinEnabled = true;
		});

		// These events account for cases where the mouse has moved
		// off the map, so 'mouseup' will not be fired.
		map.on('dragend', () => {
			userInteracting = false;
			spinGlobe();
		});
		map.on('pitchend', () => {
			userInteracting = false;
			spinGlobe();
		});
		map.on('rotateend', () => {
			userInteracting = false;
			spinGlobe();
		});

		// When animation is complete, start spinning if there is no ongoing interaction
		map.on('moveend', () => {
			spinGlobe();
		});

		spinGlobe();


        const nav = new pkg.NavigationControl();
		map.addControl(nav, 'bottom-left');

        
        const unsubscribe = cssdaytaStore.subscribe((value) => {
            cssdayta = value;
            console.log(cssdayta);
        })
        return unsubscribe;

	});

	onDestroy(() => {
		unsubscribeSelectedYear();
	});
</script>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer} />
</div>

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
