<script>
    // invisible component to measure time since initiation

    export let ticks = 0;
    export const startDatetime = Date.now();

    const increment = () => ticks++;
    let timer;
    $: {
        clearInterval(timer);
        timer = setInterval(increment, 1000);
    }
    const stop = () => clearInterval(timer);
</script>