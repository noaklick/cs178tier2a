<script>
    // list the time slots/locations from 'default.json' and process form data

    import Slot from '$lib/components/Slot.svelte';
    import data from '$lib/default.json';

    function handleSubmit(event) {
        console.log(event.target);
    }

    // track each input in each Slot
    let slotdata = [];
    data.slots.forEach(s => {
        slotdata.push({
            t1: s.t1,
            t2 : s.t2,
            selected : [],
        })
    });
</script>

<style>
    .content {
        margin-top: 10vh;
        margin-left: 10vw;
    }
</style>

<Slot />

<!--
<div class="content">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="vstack gap-2">
        {#each data.slots as s}
            <Slot   t1={s.t1} 
                    t2={s.t2} 
                    locations={data.locations}
                    bind:s />
        {/each}
        </div>

        <br />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
-->