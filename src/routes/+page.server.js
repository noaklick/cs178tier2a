import data from '$lib/default.json';
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return data;
}