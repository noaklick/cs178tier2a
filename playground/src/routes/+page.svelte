<script>
    // list the time slots/locations from 'default.json' and process form data

    import Slot from '$lib/components/Slot.svelte';
    import data from '$lib/default.json';
    import TimezonePicker from 'svelte-timezone-picker';

    let timezone = 'America/New_York';

    function update(ev) {
        console.log(ev.detail.timezone);
    }

    function handleSubmit(event) {
        console.log(event.target);
    }
</script>

<style>
    .content {
        margin-top: 10vh;
        margin-left: 10vw;
    }
</style>

<div class="content">
    <TimezonePicker {timezone} on:update="{update}" />

    <form on:submit|preventDefault={handleSubmit}>
        <div class="vstack gap-2">
        {#each data.slots as s}
            <Slot   t1={s.t1} 
                    t2={s.t2} 
                    locations={data.locations} />
        {/each}
        </div>

        <br />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>