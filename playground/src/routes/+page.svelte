<!-- practice w/ svelte + bootstrap -->

<script>
    import Slots from '$lib/demos/Slots.svelte';
    import Timer from '$lib/demos/Timer.svelte';
    import Storage from '$lib/demos/Storage.svelte';
</script>

<style>
    h1 {
        font-weight: bold;
    }
</style>

<h1>DEMO</h1>

<!-- 3 demos: 2 in the top half, 1 in the bottom half -->
<div class="container">
    <div class="row">
        <div class="col">
            <Slots />
        </div>
        <div class="col">
            <Timer />
        </div>
    </div>
    <div class="row">
        <Storage />
    </div>
</div>