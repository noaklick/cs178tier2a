import data from '$lib/default.json';

// load default data onto the user page

// [concept] "Asynchronous Programming"

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return data;
}