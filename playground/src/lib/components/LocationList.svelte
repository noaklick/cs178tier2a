<script>
    export let locations;
</script>

<form>
    {#each locations as loc}
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" value="" id="" />
            <label class="form-check-label" for="">
                {loc}
            </label>
        </div>
    {/each}
</form>