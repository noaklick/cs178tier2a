<!--
    a "Slot" provides the core functionality of the application. Conceptually, a "Slot" is pair of Datetime objects and a list of locations; each 
    represents a choice in meeting time/location provided by the schedule creator. The Svelte "Slot" component takes these objects as input and
    renders a UI element that users can interact with to accept/decline a meeting option. To accept an option means to select any of the Slot's
    listed locations as available for the user.

    [concept] "Reusable Component"
-->

<script>
    // [concept] "Attributes"
    export let width = "18vw";                      // width of Slot div
    export let t1, t2;                              // meeting start/end Datetime objects
    export let timezone = "America/New_York"
    export let locations = [];                      // array of meeting location strings

    /*
    const options = {
        weekday : "short",
        month : "long",
        day : "numeric",
        year : "long",
        // timeZone: timezone
    };
    */

    const style = `width: ${width}`;                // [concept] "Local styling"
    const use_locations = (locations.length > 0);

    // list of true/false (accept/decline) values for each location associated with this Slot
    export let selected = [];
    for (let i = 0; i < locations.length; i++) {
        selected.push(false);
    }
</script>

<div class="card" style={ style }>
    <div class="card-body">
        <!-- display of start/end time -->
        <h5>{ t1.toLocaleString("en-US", { timeZone: timezone, weekday:"short", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) }</h5>
        <h5>{ t2.toLocaleString("en-US", { timeZone: timezone, weekday:"short", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) }</h5>
        
        <!-- display list of available locations (if applicable) -->
        {#if use_locations}
        <div class="form-check form-check-inline">
            <!-- [concept] "Loops" -->
            {#each locations as loc, i}
            {@const loc_id = loc + i}
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id={loc_id} bind:checked={selected[i]} />
                <label for={loc_id} class="form-check-label">{loc}</label>
            </div>
            {/each}
        </div>
        {/if}
    </div>
</div>