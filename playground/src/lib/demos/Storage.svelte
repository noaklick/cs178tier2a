<!-- [todo] -->

<script>
</script>

<!-- form action 'save' exists in src/routes/+page.server.js -->
<form method="POST" action="?/save">
    <div class="mb-3">
        <label for="textinput" class="form-label">Write some stuff</label>
        <div class="hstack gap-3">
            <input type="text" placeholder="placeholder text" class="form-control" />
            <input type="submit" value="Submit" class="btn btn-primary" />
        </div>
    </div>
</form>