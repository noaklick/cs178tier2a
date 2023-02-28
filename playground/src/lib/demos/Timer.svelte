<!-- display a timer w/ a button to stop it -->

<script>
    let ticks = 0;
    const increment = () => ticks++;
    let timer;
    $: {
        clearInterval(timer);
        timer = setInterval(increment, 1000);
    }
    const stop = () => clearInterval(timer);
</script>

<div class="container">
    <div class="card">
        <div class="card-body">
            <h1>Timer says {ticks} seconds.</h1>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-primary" on:click={stop}>Stop</button>
        </div>
    </div>
</div>