<script>
    export let width = "18vw";                      // width of Slot div [should]adjust based on text length
    export let t1, t2;                              // start/end time strings [should]pass as datetime object and then render to string
    export let timezone = "America/New_York"
    export let locations = [];                    // array of meeting location strings

    const options = {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "long",
        // timeZone: timezone
    };


    //[should] remove non-distinct locations

    const style = `width: ${width}`;
    const use_locations = (locations.length > 0);

    //[should] use a dictionary (location : true/false) rather than numeric array (requires all locations to be distinct)
    export let selected = [];                       // true/false for each location checkbox
    for (let i = 0; i < locations.length; i++) {
        selected.push(false);
    }
</script>

<div class="card w-50" style={ style }>
    <!-- start/end time -->
    <div class="card-body">
        <h2>{ t1.toLocaleString("en-US", {timeZone: timezone, weekday:"short", month: "long", day: "numeric", hour: "numeric", minute: "numeric",})} </h2>
        <h2>{ t2.toLocaleString("en-US", {timeZone: timezone, weekday:"short", month: "long", day: "numeric", hour: "numeric", minute: "numeric",})} </h2>
        <!-- list of available locations (if applicable) -->
        {#if use_locations}
        <!-- <div class="hstack gap-3"> -->
        <div class="form-check form-check-inline">

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