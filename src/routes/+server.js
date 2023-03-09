import userdata from '$lib/user.json';
import { json } from '@sveltejs/kit';
import * as fs from 'fs';

// save user data into a server-side file

// [concept] "Asynchronous Prograamming"

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const user = await request.json();

    // requires user data file JSON to have a "data" field for an array (present in "blank_user.json")
    userdata.data.push(user);

    fs.writeFileSync('src/lib/user.json', JSON.stringify(userdata), (err) => {
        if (err) { console.log("Error: " + err); }
    });

    console.log("User data added. Current data: ");
    console.log(userdata.data);

    return json('OK');
}