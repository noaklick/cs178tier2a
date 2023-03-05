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

<header>
    <div class="p-5 text-center bg-info text-white">
        <h1 class="mb-3">Which meeting could you go to?</h1>
        <h4 class="mb-3">Select all time+location combos that work for you!</h4>
    </div>
        
</header>

<Slot />

<!--
<div class="content">

    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-auto">

                <TimezonePicker {timezone} on:update="{update}" />
            </div>
            <div class="col col-lg-2"></div>
            <!-- <div class="col-lg-auto"> -->
            <div class="col col-lg-4">

                <input type="text" class="form-control" id="name" placeholder="Name">
            </div>
    
    <!-- <div class="container">
        <div class="row">
            <div class="col">
                <TimezonePicker {timezone} on:update="{update}" />
            </div>
            <div class="col">
                <input type="text" class="form-control" id="name" placeholder="Name">
            </div>
            <div class="col"></div>            
                <div class="col"></div>

        </div>
    </div> -->
    
    <br>
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
    <br/>

<footer class="text-center text-lg-start bg-light text-muted">
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
       A project for CS 178 by Noa Kligfeld and Ricky Williams.
    </div>
</footer>