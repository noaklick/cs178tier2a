<script>
    export let width = "18vw";
    export let t1, t2;
    export let locations;

    const use_location = (locations.length > 0);
    const style = `width: ${width}`;

    let selected = false;

    function handleClick() {
        selected = !selected;
    }
</script>

<div class="card" style={ style }>
    <!-- start/end time -->
    <div class="card-body" on:click={handleClick} on:keypress={handleClick}>
        <h1>{ t1 } -- { t2 }</h1>
    </div>

    <!-- list of available locations (if applicable) -->
    {#if use_location}
    <div class="hstack gap-3">
        {#each locations as loc, i}
        {@const loc_id = loc + i}
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id={loc_id} />
            <label for={loc_id} class="form-check-label">{loc}</label>
        </div>
        {/each}
    </div>
    {/if}
</div>