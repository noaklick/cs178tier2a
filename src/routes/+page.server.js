import data from '$lib/default.json';

// load default data onto the user page

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return data;
}