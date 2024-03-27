import { writable } from 'svelte/store';

let cssdayta;

async function getCSSDayta() {
	const response = await fetch('https://cssday.nl/data.json');

	if (!response.ok) {
		console.log('Could not fetch data');
	}

	cssdayta = await response.json();
	cssdaytaStore.set(cssdayta);
}

getCSSDayta();

export let cssdaytaStore = writable(cssdayta);
