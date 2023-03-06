<script>
    // list the time slots/locations from 'default.json' and process form data

    import Slot from '$lib/components/Slot.svelte';
    import TimezonePicker from 'svelte-timezone-picker';
    import Timer from '$lib/components/Timer.svelte';

    let timezone = 'America/New_York';
    $: new_tz = timezone;

    let userTicks = 0;

    function update(ev) {
        new_tz = ev.detail.timezone;
        console.log(ev.detail.timezone);
    }

    /** @type {import('./$types').PageData} */  
    export let data;

    let name = "";
    $: nameIsGiven = !name;

    let userData = [];

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

    // filter time slots by day of the week
    let slotsByDay = Array(7).fill([]);
    slotdata.forEach(s => {
        slotsByDay[s.t1.getDay()].push(s);
    });

    // turn user\time data into a CSV string and write to a file
    function exportToCSV(arr) {
        let filestring = "";
        for (let i = 0; i < arr.length; i++) {
            filestring += arr[i].name + "," + arr[i].time + "\n";
        }

        console.log(filestring);
    }

    function resetUser() {
        name = "";
        userTicks = 0;
        for (let i = 0; i < 7; i++) {
            slotsByDay[i].forEach(s => {
                for (let j = 0; j < s.selected.length; j++) {
                    s.selected[j] = false;
                }
            });
        }

        slotsByDay = slotsByDay;
    }

    function handleSubmit(event) {
        //console.log("Name = " + name);
        //console.log("Time = " + userTicks + " seconds");

        userData.push({
            name : name,
            time : userTicks
        });

        exportToCSV(userData);

        // clear input
        resetUser();
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
    <Timer bind:ticks={userTicks} />
    
    <br>
    <form on:submit|preventDefault={handleSubmit}>
        <!-- <div class="row justify-content-md-center"> -->
        <div class="row">
            <div class="col-lg-auto">
                <TimezonePicker {timezone} on:update="{update}" />
            </div>
            <div class="col-lg-auto">
                <input type="text" class="form-control" id="name" placeholder="Name" bind:value={name}>
            </div>
        </div>
        <br>


        <div class="container">
            {#each slotsByDay as sarr, i}

                <div class="col">
                {#each sarr as s}
                    <div class="row">
                        <Slot   t1={s.t1} 
                                t2={s.t2} 
                                timezone={new_tz}
                                locations={s.locations}
                                bind:selected={s.selected} />
                    </div>
                {/each}
                </div>
            {/each}
        </div>
    </form>
    <br>
    <button type="submit" class="btn btn-primary" disabled="{nameIsGiven}">Submit</button>
    <small id="submitHelp" class="form-text text-muted">
        You must enter your name before you submit. 
    </small>
    <br><br>
    <h3>Want to make your own event?  <a href="/create" class="btn btn-success" role="button">Create</a></h3>

</div>

<footer class="text-center text-lg-start bg-light text-muted">
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
       A project for CS 178 by Noa Kligfeld and Ricky Williams.
    </div>
</footer>