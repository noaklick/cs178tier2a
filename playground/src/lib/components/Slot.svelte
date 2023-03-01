<script>
    export let width = "18vw";
    export let t1, t2;
    export let locations;

    let use_location = (locations.length > 0);
    let style = `width: ${width}`;
</script>

<div class="card" style={ style }>
    <div class="card-body">
        <p>{ t1 } -- { t2 }</p>
    </div>

    {#if use_location}
    <div class="hstack gap-3">
        {#each locations as loc}
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id=""/>
            <label for="" class="form-check-label">{loc}</label>
        </div>
        {/each}
    </div>
    {/if}
</div>