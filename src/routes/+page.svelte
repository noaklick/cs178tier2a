<!--
    concepts are labeled with comments beginning with a "[concept]" tag
    labels are derived from https://docs.google.com/document/d/1XWjbLcNVWrCXJeHqA7wGDx6GrihsSX3aT5lTBVJ1TbY/edit# 

    'src/lib/components' contains the other critical code files with labeled concepts
-->

<script>
    import Slot from '$lib/components/Slot.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import TimezonePicker from 'svelte-timezone-picker';

    // load default data from server ($lib/default.json)
    /** @type {import('./$types').PageData} */  
    export let data;

    // track user input for each Slot individually
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
    // [concept] "Dependent Variables"
    let timezone = 'America/New_York';
    $: new_tz = timezone;

    function update(ev) {
        new_tz = ev.detail.timezone;
        console.log(ev.detail.timezone);
    }

    // page timer + user data initialization
    let timer;
    let timerIsStarted = false;
    function startTimer() {
        timer.start();
        timerIsStarted = true;
    }

    // array of user data objects
    let allUserData = [];
    let user = {
        name : "",
        timeStart : null,
        timeEnd : null,
        timeTicks : 0,
    };
    // [concept] "Dependent Variables"
    $: nameIsGiven = !user.name;        // automatically update whether name input has been given

    // handler user input (name, schedule selections) submission
    function handleSubmit(event) {
        user.timeStart = timer.getStartTime();
        user.timeEnd = Date.now();
        allUserData.push(user);

        // [DEBUG]
        // [concept] "Printing"
        console.log(user);
        console.log("Datetime difference = " + Math.abs(user.timeEnd - user.timeStart) + " ms");

        userdataExport();
        clear();
    }

    // save user data to a server-side file
    // [concept] "Asynshronous Programming"
    async function userdataExport() {
        const response = await fetch('/', {
            method : 'POST',
            body : JSON.stringify(user),
            header : {
                'content-type' : 'application/json'
            }
        });

        // [DEBUG]
        //console.log(response);
    }

    // reset all user input (i.e. after submission)
    function clear() {
        // clear user data
        user.name = "";
        user.timeStart = null;
        user.timeEnd = null;
        user.timeTicks = 0;
        timerIsStarted = false;

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
            <!-- button to start the page timer (resets upon user submission) -->
            <div class="col-lg-auto">
                <!-- note that the button is unclickable after being initially clicked (user cannot reset timer) -->
                <button type="button" class="btn btn-success" on:click="{startTimer}" disabled={timerIsStarted}>Start</button>
                <small id="startHelp" class="form-text text-muted">
                    Click this button to start the timer!
                </small> 
            </div>
            <div class="col-lg-auto">
                <TimezonePicker {timezone} on:update="{update}" />
            </div>

            <!-- name input -->
            <div class="col-lg-auto">
                <!-- update user data object dynamically with user input -->
                <!-- [concept] "Binding" -->
                <input type="text" class="form-control" id="name" placeholder="Name" bind:value={user.name}>
            </div>
        </div>
        <br />

        <!-- iterate over and list all possible timeslots w/ locations -->
        <div class="container">
            <div class="row gy-5">
                <!-- [concept] "Template syntax" -->
                {#each slotdata as s}
                <div class="col">
                    <!-- 
                        note that the 'selected' prop is passed containing only false values; the passed prop is bound
                        to its parent component via the 'bind:{variable}' syntax so that user interaction with the Slot
                        child omponent can update data in the parent component 
                    -->
                    <Slot   t1={s.t1} 
                            t2={s.t2} 
                            timezone={new_tz}
                            locations={s.locations}
                            bind:selected={s.selected} />
                </div>
                {/each}
                <br><br>
            </div>
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