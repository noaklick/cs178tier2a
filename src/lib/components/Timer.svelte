<!--
    "Timer" is an invisible (no UI) component to measure time
-->

<script>
    export let ticks = 0;
    export let startTime = null;

    let timer;
    const increment = () => ticks++;

    /* Svelte components generally pass props from parents to children; a special function
     * is exposed here to allow the parent component to get the 'startTime' attribute from
     * this child component */
    // [concept] "Props"
    export const getStartTime = () => {
        return startTime;
    }

    export const start = () => {
        clearInterval(timer);
        timer = setInterval(increment, 1000);
        startTime = Date.now();
    }

    export const stop = () => clearInterval(timer);
</script>