<script>
	import pkg from 'mapbox-gl';
	const { Map } = pkg;
	import '/node_modules/mapbox-gl/dist/mapbox-gl.css';

	let map;
	let mapContainer;
	let lng, lat, zoom;

	lng = -71.224518;
	lat = 42.213995;
	zoom = 9;

	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1IjoiYnJpYW5uZWRlZGV1Z2QiLCJhIjoiY2x1NnR2Ymk2MXlzejJpbng3bWFkbjdhdyJ9.lpu8pVnq6PKL2BglA4tPSg',
			style: 'mapbox://styles/mapbox/streets-v12',
			projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
			zoom: 1.5,
			center: [-90, 40]
		});

		map.on('style.load', () => {
			map.setFog({}); // Set the default atmosphere style
		});

        map.on('load', function() {
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
                    // TODO: pass function to calculate color here?
                    'fill-color': '#d2361e',
                    'fill-opacity': 0.4,
                },
            },
            'country-label'
        );

            map.setFilter('country-boundaries', [
                "in",
                "iso_3166_1",
                'NL',
                'NP'
            ]);
        });

		// At low zooms, complete a revolution every two minutes.
		const secondsPerRevolution = 120;
		// Above zoom level 5, do not rotate.
		const maxSpinZoom = 5;
		// Rotate at intermediate speeds between zoom levels 3 and 5.
		const slowSpinZoom = 3;

		let userInteracting = false;
		let spinEnabled = true;

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
		});

		// Restart spinning the globe when interaction is complete
		map.on('mouseup', () => {
			userInteracting = false;
			spinGlobe();
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
