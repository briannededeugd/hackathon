<script>
    // TODO: Make button for zoom for accessibility.
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
	import { get } from 'svelte/store';

    const countryData = [
        { iso_3166_1: 'NL', population: 1000000 }, 
        { iso_3166_1: 'NP', population: 5000000 }  ,
        { iso_3166_1: 'SE', population: 5000000 }  ,
        { iso_3166_1: 'GR', population: 5000000 }  ,
    ];

    // console.log(cssdaytaStore)

    const cssdaytaObject = {
    "2013": {
        "days": 1,
        "date": [
            "2013-06-14"
        ],
        "title": "CSS Day 2013",
        "link": "https://cssday.nl/2013",
        "venue": "Compagnietheater",
        "price": 250,
        "color": {
            "name": "red",
            "hex": "#ff0000"
        },
        "attendees": {
            "count": 246,
            "countries": {
                "NL": 178,
                "UK": 17,
                "DE": 16,
                "BE": 7,
                "FR": 3,
                "CH": 3,
                "US": 3,
                "GR": 3,
                "RU": 3,
                "NO": 2,
                "SK": 2,
                "SE": 2,
                "IT": 1,
                "PL": 1,
                "DK": 1,
                "ES": 1,
                "JP": 1,
                "ZA": 1,
                "SG": 1
            }
        }
    }
};

    // Access the countries object key
    $: if ($cssdaytaStore) {
        console.log($cssdaytaStore['2013'].attendees.countries);
    }

    function generatePaint() {
        const paintExpressions = ['match', ['get', 'iso_3166_1']];

        for (const [iso_3166_1, attendees] of Object.entries($cssdaytaStore['2013'].attendees.countries)) {
            console.log(`${iso_3166_1}: ${attendees}`);
            const color = attendees > 100 ? '#ff0000' : '#00ff00'; 
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

		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1IjoiYnJpYW5uZWRlZGV1Z2QiLCJhIjoiY2x1NnR2Ymk2MXlzejJpbng3bWFkbjdhdyJ9.lpu8pVnq6PKL2BglA4tPSg',
			style: 'mapbox://styles/mapbox/streets-v12',
			projection: 'globe',
			zoom: 1.5,
			center: [-90, 40]
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
                id: 'country-boundaries',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1',
                },
                'source-layer': 'country_boundaries',
                type: 'fill',
                paint: {
                    // TODO: Pass function to calculate color here?
                    // Get main color from data
                    'fill-color': generatePaint(),
                    'fill-opacity': 0.4,
                },
            },
            'country-label'
        );

        const isoValues = countryData.map(country => country.iso_3166_1);

        map.setFilter('country-boundaries', ["in", "iso_3166_1", ...isoValues]);

        });

		// At low zooms, complete a revolution every two minutes.
		const secondsPerRevolution = 120;
		// Above zoom level 5, do not rotate.
		const maxSpinZoom = 5;
		// Rotate at intermediate speeds between zoom levels 3 and 5.
		const slowSpinZoom = 3;

		let userInteracting = false;
		let spinEnabled = true;

        // TODO: fix user mobile interaction
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
