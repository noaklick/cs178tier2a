import userdata from '$lib/user.json';
import { json } from '@sveltejs/kit';
import * as fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const user = await request.json();

    userdata.data.push(user);

    fs.writeFileSync('src/lib/user.json', JSON.stringify(userdata), (err) => {
        if (err) { console.log("Error: " + err); }
        else {
            console.log("User data added. Current data: ");
            console.log(userdata.data);
        }
    });

    return json('OK');
}