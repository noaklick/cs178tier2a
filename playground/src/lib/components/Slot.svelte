<style>
h1 {
    font-weight: bold;
}
</style>

<script>
    import LocationList from '$lib/components/LocationList.svelte';

    export let width = "18vw";
    export let t1, t2;
    export let locations;

    let use_location = (locations.length > 0);

    let style = `width: ${width}`;
</script>

<div class="card" style={ style }>
    <div class="card-body">
        <h1> { t1 } -- { t2 } </h1>
    </div>

    {#if use_location}
    <LocationList locations={location} />
    {/if}

</div>