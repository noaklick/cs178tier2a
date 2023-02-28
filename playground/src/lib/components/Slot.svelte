<style>
h1 {
    font-weight: bold;
}
</style>

<script>
    export let width = "18vw";

    export let t1, t2;

    let style = `width: ${width}`;
</script>

<div class="card" style={ style }>
    <div class="card-body">
        <h1> { t1 } -- { t2 } </h1>
    </div>
</div>