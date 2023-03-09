<script>
    // /** @type {import('./$types').PageData} */
    // export let data;
    /**
     * @type {any[]}
     */
    import SveltyPicker from 'svelty-picker'
    /**
     * @type {Date}
     */
    let start = new Date();
    /**
     * @type {Date}
     */
    let end = new Date();

    export let locations = [{id: 1, name: "the gym"}, {id: 2, name: "house"}]
    export let timeblocks = [{id: 1, start: new Date("March 12, 2023 11:00:00"), end: new Date ("March 12, 2023 12:00:00")}]
    let newLocationName = ''

    // [concept] "Reactive"; these variables will update whenever the todos array changes
    // [concept] "State Variable"; keeps track of the number of total todos
    $: totalLocations = locations.length
    $: totalTimeblocks = timeblocks.length

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    /**
     * @param {{ id: any; }} location
     */
    function removeLocation(location) {
        locations = locations.filter((t) => t.id !== location.id)
    }

    /**
     * @param {{ id: any; start?: Date; end?: Date; }} timeblock
     */
    function removeTimeblock(timeblock) {
        timeblocks = timeblocks.filter((t) => t.id !== timeblock.id)
    }

    function addLocation() {
        // [concept] "Reactive"; written this way because reactivity is only triggered upon assignment
        locations = [...locations, { id: newLocationID, name: newLocationName}]
        newLocationName = ''
    }

    function addTimeblock() {
        timeblocks = [...timeblocks, { id: newTimeblockID, start: start, end: end}]
        newLocationName = ''
    }

    // [concept] "Reactive"; generating a new id for each todo as needed
    // [concept] "State Variable"; keeps track of the number of todos we have so we can make fresh ids
    /**
     * @type {number}
     */
    let newLocationID
    $: {
        if (totalLocations === 0) {
        newLocationID = 1;
        } else {
        newLocationID = Math.max(...locations.map((t) => t.id)) + 1;
        }
    }

    /**
     * @type {number}
     */
    let newTimeblockID
    $: {
        if (totalTimeblocks === 0) {
        newTimeblockID = 1;
        } else {
        newTimeblockID = Math.max(...timeblocks.map((t) => t.id)) + 1;
        }
    }
</script>
  
<header>
    <div class="p-5 text-center bg-info text-white">
        <h1 class="mb-3">Create a meeting!</h1>
    </div>
</header>

<div class="content">
    <br>
    <div class="container">
        <!-- Locations -->
        <div> 
            <form on:submit|preventDefault={addLocation}>
                <h3 class="label-wrapper">
                    <label for="todo-0" class="label__lg"> Where are you available to meet? </label>
                </h3>
                <h5 class="label-wrapper">
                    <label for="todo-0" class="label__lg"> Add all locations in which you're available.  </label>
                </h5>
                <!-- [concept] "Props" we bind the the value of the variable to the value of the input -->
                <!-- noa note: this is super super cool. never seen a feature like this before -->
                <!-- [concept] "Text-exp"; dynamically updating the value -->
                <input bind:value={newLocationName} type="text" id="todo-0" autocomplete="off" class="input input__lg" placeholder="Location"/>
                <!-- [concept] "Button"; button to add a new todo -->
                <button type="submit" class="btn btn-primary">
                    Add
                </button>
            </form>
            <br>
    
            <!-- Locations list -->
            <div class="container">
            {#each locations as location (location.id)}
                <div class="row">
                    <div class="col">
                        <label for="location-{location.id}" class="todo-label"> {location.name} </label>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-sm" on:click={() => removeLocation(location)}>
                            Delete
                        </button>
                    </div>
                </div>
                <div class="row"> <div class="col"></div><div class="col"></div></div>
                {:else}
                    <li>No locations added yet!</li>
                {/each}
            </div>
        </div>
        <hr />

        <!-- Timeblocks/Slots -->
        <div class="container">
            <!-- Add a Timeblock -->
            <form on:submit|preventDefault={addTimeblock}>
                <h3 class="label-wrapper">
                    <label for="todo-0" class="label__lg"> When are you available to meet? </label>
                </h3>
                <h5 class="label-wrapper">
                    <label for="todo-0" class="label__lg"> Add all time blocks in which you're available.  </label>
                </h5>
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col col-lg-4">
                            <SveltyPicker inputClasses="form-control" format="yyyy-mm-dd hh:ii" placeholder='Select a start date and time' autoclose></SveltyPicker>   
                        </div>
                        <!-- <div class="col-lg-auto"> -->
                        <div class="col col-lg-4">
                            <SveltyPicker inputClasses="form-control" format="yyyy-mm-dd hh:ii" placeholder='Select an end date and time' autoclose></SveltyPicker>  
                        </div>
                        <div class="col col-lg-4">
                            <button type="submit" class="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                
                
            </form>
            <br>

            <!-- Timeblocks list -->
            <div class="container">
            {#each timeblocks as timeblock (timeblock.id)}
                <div class="row">
                    <div class="col">
                        <label for="timeblock-{timeblock.id}" class="todo-label"> <b>Start: </b> {timeblock.start.toLocaleString(options)} <b>End: </b>{timeblock.end.toLocaleString(options)}</label>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-sm" on:click={() => removeTimeblock(timeblock)}>
                            Delete
                        </button>
                    </div>
                </div>
                {:else}
                    <li>No time blocks added yet!</li>
                {/each}
            </div>
        </div>
        <hr>

        <h3>Ready to collect availability?   <a href="/" class="btn btn-success" role="button">User Entry</a></h3>
    </div>
</div>

<footer class="text-center text-lg-start bg-light text-muted">
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
       A project for CS 178 by Noa Kligfeld and Ricky Williams.
    </div>
</footer>
  