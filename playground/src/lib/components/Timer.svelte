<!-- display a timer w/ a button to stop it -->

<script>
    export let ticks = 0;
    const increment = () => ticks++;
    let timer;
    $: {
        clearInterval(timer);
        timer = setInterval(increment, 1000);
    }
    const stop = () => clearInterval(timer);
</script>