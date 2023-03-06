<script>
    import Slot from '$lib/components/Slot.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import TimezonePicker from 'svelte-timezone-picker';

    // load default data from server ($lib/default.json)
    /** @type {import('./$types').PageData} */  
    export let data;

    // track each input in each Slot
    let slotdata = [];
    data.slots.forEach(s => {
        slotdata.push({
            t1: new Date(s.t1),
            t2 : new Date(s.t2),
            selected : [],
            locations : data.locations
        })
    });

    // reactive timezone + updating
    let timezone = 'America/New_York';
    $: new_tz = timezone;

    function update(ev) {
        new_tz = ev.detail.timezone;
        console.log(ev.detail.timezone);
    }

    // user data
    let timer;
    let user = {
        name : "",
        timeStart : null,
        timeEnd : null,
        timeTicks : 0,
    };
    $: nameIsGiven = !user.name;

    let allUserData = [];

    // handler user input (name, schedule selections) submission
    function handleSubmit(event) {
        user.timeStart = timer.startDatetime;
        user.timeEnd = Date.now();
        allUserData.push(user);

        // [DEBUG]
        console.log(user);
        console.log("Datetime difference = " + Math.abs(user.timeEnd - user.timeStart) + " ms");

        csvExport();
        clear();
    }

    async function csvExport() {
        const response = await fetch('/', {
            method : 'POST',
            body : JSON.stringify(user),
            header : {
                'content-type' : 'application/json'
            }
        });

        console.log(response);
    }

    // reset all user input (i.e. after submission)
    function clear() {
        // clear user data
        user.name = "";
        user.timeStart = null;
        user.timeEnd = null;
        user.timeTicks = 0;

        // clear schedule selections
        for (let i = 0; i < slotdata.length; i++) {
            for (let j = 0; j < slotdata[i].selected.length; j++) {
                slotdata[i].selected[j] = false;
            }
        }
    }
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

<div class="content">
    <!-- set up (invisible) timer to track how long each user takes to fill out selections -->
    <Timer bind:ticks={user.timeTicks} bind:this={timer}/>
    
    <form on:submit|preventDefault={handleSubmit}>
        <div class="row">
            <!-- timezone selection -->
            <div class="col-lg-auto">
                <TimezonePicker {timezone} on:update="{update}" />
            </div>

            <!-- name input -->
            <div class="col-lg-auto">
                <input type="text" class="form-control" id="name" placeholder="Name" bind:value={user.name}>
            </div>
        </div>
        <br />

        <!-- <div class="hstack gap-2"> -->
        <!-- <div class="list-group" style="display: grid; grid-template-columns: repeat(3, 20fr);"> -->
        <!-- <div class="wrapper" style="display: grid, grid-template-columns: 1fr 1fr 1fr;"> -->
        <div class="container">
            <div class="row gy-5">
                {#each slotdata as s}
                <!-- <div class="list group item"> -->
                <div class="col">
                    <Slot   t1={s.t1} 
                            t2={s.t2} 
                            timezone={new_tz}
                            locations={s.locations}
                            bind:selected={s.selected} />
                </div>
                {/each}
                <br><br>
                <!-- <hr> -->
            </div>
            <!-- <hr> -->
            <br><br>
        </div>
        <br />

        <!-- form submission -->
        <button type="submit" class="btn btn-primary" disabled="{nameIsGiven}">Submit</button>
        <small id="submitHelp" class="form-text text-muted">
            You must enter your name before you submit. 
        </small>
    </form>

    <br />
    <br />

    <!-- link to 'create' page -->
    <h3>Want to make your own event?  <a href="/create" class="btn btn-success" role="button">Create</a></h3>

</div>

<footer class="text-center text-lg-start bg-light text-muted">
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
       A project for CS 178 by Noa Kligfeld and Ricky Williams.
    </div>
</footer>