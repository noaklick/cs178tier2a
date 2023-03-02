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
    export let timeblocks = [{id: 1, start: new Date("October 13, 2014 11:00:00"), end: new Date ("October 13, 2014 12:00:00")}]
    let newLocationName = ''
    // #reactive: these variables will update whenever the todos array changes
    // #statevariable: keeps track of the number of total todos
    $: totalLocations = locations.length
    $: totalTimeblocks = timeblocks.length

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
        // #reactive
        // written this way because reactivity is only triggered upon assignment
        locations = [...locations, { id: newLocationID, name: newLocationName}]
        newLocationName = ''
    }

    function addTimeblock() {
        timeblocks = [...timeblocks, { id: newTimeblockID, start: start, end: end}]
        newLocationName = ''
    }

    // #reactive: generating a new id for each todo as needed
    // #statevariable: keeps track of the number of todos we have so we can make fresh ids
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
  


<div class="todoapp stack-large">
    <!-- Locations -->
    <div> 
        <form on:submit|preventDefault={addLocation}>
            <h2 class="label-wrapper">
                <label for="todo-0" class="label__lg"> Where are you available to meet? </label>
            </h2>
            <!-- #properties we bind the the value of the variable to the value of the input -->
            <!-- noa note: this is super super cool. never seen a feature like this before -->
            <!-- #text-exp: dynamically updating the value -->
            <input bind:value={newLocationName} type="text" id="todo-0" autocomplete="off" class="input input__lg" />
            <!-- #button button to add a new todo -->
            <button type="submit" class="btn btn__primary btn__lg">
                Add
            </button>
        </form>
  
        <!-- Locations list -->
        <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
        {#each locations as location (location.id)}
            <li class="todo">
                <div class="stack-small">
                    <div class="c-cb">
                        <!-- #reactive the curly braces let us use JavaScript in the HTML -->
                        <!-- #properties accessing the id of the todo -->

                        <!-- #text-exp dynamically adding the name of the todo -->
                        <label for="location-{location.id}" class="todo-label"> {location.name} </label>
                    </div>
                    <button type="button" class="btn btn__danger"
                        on:click={() => removeLocation(location)}>
                        Delete <span class="visually-hidden">{location.name}</span>
                    </button>
                </div>
            </li>
        {:else}
            <li>No locations added yet!</li>
        {/each}
        </ul>

    
    </div>
    <hr />

    <!-- Timeblocks -->
    <div class="container">
        <!-- Add a Timeblock -->
        <form on:submit|preventDefault={addTimeblock}>
            <h2 class="label-wrapper">
                <label for="todo-0" class="label__lg"> When are you available to meet? </label>
            </h2>
            <SveltyPicker inputClasses="form-control" format="yyyy-mm-dd hh:ii" placeholder='Select a start date and time' autoclose></SveltyPicker>   
            <SveltyPicker inputClasses="form-control" format="yyyy-mm-dd hh:ii" placeholder='Select an end date and time' autoclose></SveltyPicker>  
            <button type="submit" class="btn btn__primary btn__lg">
                Add
            </button>
        </form>

         <!-- Timeblocks list -->
        <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
            {#each timeblocks as timeblock (timeblock.id)}
                <li class="todo">
                    <div class="stack-small">
                        <div class="c-cb">
                            <!-- #reactive the curly braces let us use JavaScript in the HTML -->
                            <!-- #properties accessing the id of the todo -->
    
                            <!-- #text-exp dynamically adding the name of the todo -->
                            <label for="timeblock-{timeblock.id}" class="todo-label"> {timeblock.start} {timeblock.end}</label>
                        </div>
                        <button type="button" class="btn btn__danger"
                            on:click={() => removeTimeblock(timeblock)}>
                            Delete
                        </button>
                    </div>
                </li>
            {:else}
                <li>No time blocks added yet!</li>
            {/each}
        </ul>
    </div>
</div>
  