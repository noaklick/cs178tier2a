<script>
    // invisible component to measure time since initiation

    export let ticks = 0;
    export let startTime = null;

    const increment = () => ticks++;
    let timer;

    export const getStartTime = () => {
        return startTime;
    }

    export const start = () => {
        clearInterval(timer);
        timer = setInterval(increment, 1000);
        startTime = Date.now();
    }
    export const stop = () => clearInterval(timer);

    //start();
</script>