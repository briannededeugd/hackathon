<script>
	import pkg from 'mapbox-gl';
	const { Map } = pkg;
	import '/node_modules/mapbox-gl/dist/mapbox-gl.css';
    import {cssdaytaStore} from '../dataStore.js'

	let map;
	let mapContainer;
	let lng, lat, zoom;
    let cssdayta = {};

	lng = -71.224518;
	lat = 42.213995;
	zoom = 9;

	import { onMount, onDestroy } from 'svelte';

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

    // Access the countries object key
    // $: if ($cssdaytaStore) {
    //     console.log($cssdaytaStore['2013'].attendees.countries);
    // }

    //  TODO: Pick color by year.
    function generatePaintFillColor() {
        const paintExpressions = ['match', ['get', 'iso_3166_1']];

        for (const [countrycode, attendees] of Object.entries($cssdaytaStore['2018'].attendees.countries)) {
            var percentage = (attendees / $cssdaytaStore['2018'].attendees.count) * 100 ;
            var opacity = percentage / 1;
            // Scale not correct bc why is the NL the same color as other stuff.
            const color = percentage > 1 ? 'purple' : percentage > .80 ? '#ff0000' : percentage > .60 ? '#ff9900' : percentage > .40 ? '#ffff00' : percentage > .20 ? '#00ff00' : '#0000ff';
            paintExpressions.push(countrycode, color);
            
            // console.log('OPACITY:', opacity);
            // console.log('ISO:', countrycode);
            // console.log('PERCENTAGE:', percentage);
        }      
     
        paintExpressions.push('rgba(0, 0, 0, 0)');

        return paintExpressions;
    }

    // TODO: Set opacity by attendees %.
    function generatePaintFillOpacity() {
        const paintExpressions = ['match', ['get', 'iso_3166_1']];

        for (const [countrycode, attendees] of Object.entries($cssdaytaStore['2018'].attendees.countries)) {
             var percentage = (attendees / $cssdaytaStore['2018'].attendees.count) * 100 ;
            var opacity = percentage / 1;
            // console.log('OPACITY:', opacity);
            console.log('ISO:', iso_3166_1);
            console.log('PERCENTAGE:', percentage);
            // schaal not correct bc why is the nl the same color as other stuff.
            const color = percentage > 1 ? 'purple' : percentage > .80 ? '#ff0000' : percentage > .60 ? '#ff9900' : percentage > .40 ? '#ffff00' : percentage > .20 ? '#00ff00' : '#0000ff';


            paintExpressions.push(iso_3166_1, color);
        }      
     
        paintExpressions.push('rgba(0, 0, 0, 0)');

        return paintExpressions;
        }
    


	onMount(() => {
        cssdaytaStore.subscribe((value) => {
            cssdayta = value;
            console.log(cssdayta);
        })

		// const initialState = { lng: lng, lat: lat, zoom: zoom };

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

        map.on('load', () => {
            map.addLayer(
                {
                id: 'one',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1',
                },
                'source-layer': 'country_boundaries',
                type: 'fill',
                paint: {
                    'fill-color': 'white',
                    'fill-opacity': .3,
                },
            },
            'country-label'
        );

          map.addLayer(
                {
                id: 'country-boundaries',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1',
                },
                'source-layer': 'country_boundaries',
                type: 'fill',
                paint: {
                    'fill-color': generatePaintFillColor(),
                    'fill-opacity': .1,
                },
            },
            
            'country-label'
        );

        map.addLayer({
            'id': 'outline',
            'type': 'line',
            'source': {
                'type': 'vector',
                'url': 'mapbox://mapbox.country-boundaries-v1',
            },
            'source-layer': 'country_boundaries',
            'layout': {},
            'paint': {
                'line-color': generatePaintFillColor(),
                'line-width': 1 
            }      
        });

        // const isoValues = countryData.map(country => country.iso_3166_1);

        // map.setFilter('country-boundaries', ["in", "iso_3166_1", ...isoValues]);
        // map.setFilter('outline', ["in", "iso_3166_1", ...isoValues]);

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
