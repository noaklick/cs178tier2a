<svelte:head>
	<title>Create an Event</title>
	<meta name="description" content="Create an Event" />
</svelte:head>

<!-- <script>
	export let locations = []
	let newLocationName = ''

	$: totalLocations = locations.length


	function addLocation() {
        // #reactive
        // written this way because reactivity is only triggered upon assignment
    locations = [...locations, { id: newLocationID, name: newLocationName}]
    newLocationName = ''
    }

	let newLocationID
    $: {
        if (totalLocations === 0) {
        newLocationID = 1;
        } else {
        newLocationID = Math.max(...locations.map((t) => t.id)) + 1;
        }
    }

</script> -->

<div class="text-column">
	<h1>Create an Event</h1>

	<div>
		To create an event, do the following: 
		<ol>
			<li>Select your locations</li>
			<li>Select your time blocks</li>
			<li>Select your timezone</li>
		</ol>
		That's it!
	</div>

	<form method="POST" action="/login">
		<input type="text" name="user"/>
		<input type="password" name="password"/>
		<button type="submit">Login</button>
	</form>


	<!-- <div class="locations">
		<h2>Locations</h2>
		   New Location
		   <form on:submit|preventDefault={addLocation}>
			<h2 class="label-wrapper">
			<label for="location-0" class="label__lg"> Where can you meet? </label>
		  </h2>
		  #properties we bind the the value of the variable to the value of the input
		  noa note: this is super super cool. never seen a feature like this before
		  #text-exp: dynamically updating the value
		  <input bind:value={newLocationName} type="text" id="location-0" autocomplete="off" class="input input__lg" />
		  #button button to add a new todo
			<button type="submit" disabled="" class="btn btn__primary btn__lg">
			Add
		  </button>
		</form> 

	</div> -->
</div>
