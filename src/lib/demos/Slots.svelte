<!-- show some random examples of Slot(s) -->

<script>
    import Slot from '$lib/components/Slot.svelte';

    export let locations;

    const MAX_N_SLOTS = 4;

    const N_HOURS = 24
    const CHUNK = 15;               // size of blocks to divide hours into (must divide 60)
    const N_CHUNKS = 60 / CHUNK;

    // ex. "00", "01", ... "23"
    const hours = Array(N_HOURS).fill(null).map((e, i) => i < 10 ? "0" + i.toString() : i.toString());
    // ex. "00", "15", "30", "45"
    const minutes = Array(N_CHUNKS).fill(null).map((e, i) => (i * CHUNK) < 10 ? "0" + (i * CHUNK).toString() : (i * CHUNK).toString());
    // create a bunch of "00:00", "02:15", "04:00", "13:30", ... -type strings
    let alltimes = hours.map((h, i) => minutes.map((m) => h.toString() + ":" + m.toString()));
    alltimes = alltimes.flat();
    alltimes = alltimes.sort((x, y) => x.localeCompare(y, undefined, { numeric : true }));

    // randomly choose pairs of times so that the second chronologically comes after the first
    let n_slots = Math.floor(Math.random() * MAX_N_SLOTS - 1) + 1;
    let slotTimes = Array();
    for (let i = 0; i < n_slots; i++) {
        let idx1 = Math.floor(Math.random() * (alltimes.length - 1));
        let idx2 = Math.floor(Math.random() * ((alltimes.length - 1) - idx1)) + idx1 + 1;

        slotTimes.push({
            t1 : alltimes[idx1],
            t2 : alltimes[idx2]
        });
    }
</script>

<div class="container" justify-content-center>
    <div class="vstack gap-3">
    {#each slotTimes as times}
        <Slot t1={times.t1} t2={times.t2} locations={locations}/>
    {/each}
    </div>
</div>