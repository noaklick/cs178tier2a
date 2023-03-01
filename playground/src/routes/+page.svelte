<style>
    .content {
        margin: 0 auto;
    }
</style>

<script>
    import Slot from '$lib/components/Slot.svelte';

    let locs = Array('library', 'room', 'hallway');

    function handleSubmit(event) {
        console.log(event.target);
    }
</script>

<div class="content">
    <form on:submit|preventDefault={handleSubmit}>
        <Slot t1={"00:00"} t2={"01:00"} locations={locs} />

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>