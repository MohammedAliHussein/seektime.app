<script>
	import Title from "./components/Title.svelte";
	import ConfigButton from "./components/ConfigButton.svelte";
	import ConfigurationModal from "./components/ConfigurationModal.svelte";
	import Grid from "./components/Grid.svelte";
	
	let modalIsOpen = false;
	let width = ((window.innerWidth / 2) * window.devicePixelRatio) * 1.25;
    let height = ((window.innerHeight / 2) * window.devicePixelRatio) * 1.25;
	let scheduling_data = {
		selected_algorithm: "",
		head_direction: null,
		cylinders: 200,
		disk_requests: []
	};

	function openModal() {
		modalIsOpen = true;		
	}

	function closeModal() {
		modalIsOpen = false;		
	}

	function handleConfig(event) {
		scheduling_data = event.detail;
		console.log(scheduling_data);
		modalIsOpen = false;
	}

</script>

<main>
	{#if modalIsOpen}
		<ConfigurationModal on:config={handleConfig} on:click={modalIsOpen ? closeModal : openModal}/>
	{/if}
	<Title/>
	<ConfigButton on:click={modalIsOpen ? closeModal : openModal}/>
	<Grid bind:scheduling_data={scheduling_data} width={width} height={height}/>
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>