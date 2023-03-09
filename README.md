# CS 178 Tier2a

A project for CS 178 by Noa Kligfeld and Ricky Williams.

## Project Structure

`src/lib/`
- equivalent to SvelteKit alias `$lib`
- contains reusable code + hardcoded data imported by other files
- `src/lib/components` contains the created Svelte Components

`src/routes/`
- contains the routing for the index page `/`
- `+page.svelte` contains code used to render the page; contains primary application code
- `+page.server.js` and `+server.js` provide backend functionality

`src/routes/create`
- contains the routing for the schedule creation page `/create`

`src/app.html`
- HTML template used for `+page.js` files within routes

The application is started within the root directory via `npm run dev`.

## Concepts

Concepts are labeled with comments beginning with a "[concept]" tag. Labels are derived from [here](https://docs.google.com/document/d/1XWjbLcNVWrCXJeHqA7wGDx6GrihsSX3aT5lTBVJ1TbY/edit#).