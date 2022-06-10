<script>
	import Title from "./components/Title.svelte";
	import ConfigButton from "./components/ConfigButton.svelte";
	import ConfigurationModal from "./components/ConfigurationModal.svelte";
	import Grid from "./components/Grid.svelte";
	import LowScreenSize from "./components/LowScreenSize.svelte";
	import { DiskScheduler } from "./models/DiskScheduler.js";

	let modalIsOpen = false;
	let width = ((window.innerWidth / 2)) * 1.25;
    let height = ((window.innerHeight / 2)) * 1.25;

	let scheduling_data = {
		selected_algorithm: "FCFS",
		head_direction: "Left",
		cylinders: 200,
		disk_requests: [53, 98, 183, 37, 122, 14, 124, 65, 67]
	}

	let disk_scheduler = new DiskScheduler(scheduling_data);
	// let seek_time = disk_scheduler.performCalculation()[scheduling_data.disk_requests.length - 1].seek_time;

	function openModal() {
		modalIsOpen = true;		
	}

	function closeModal() {
		modalIsOpen = false;		
	}

	function handleConfig(event) {
		scheduling_data = event.detail;
		modalIsOpen = false;
		disk_scheduler = new DiskScheduler(scheduling_data);
		scheduling_data.disk_requests = disk_scheduler.performCalculation();
		console.log(scheduling_data)
	}

	function handleResize() {
        width = ((window.innerWidth / 2)) * 1.25;
        height = ((window.innerHeight / 2)) * 1.25;
	}

</script>

<main>
	{#if modalIsOpen}
		<ConfigurationModal on:config={handleConfig} on:click={modalIsOpen ? closeModal : openModal}/>
	{/if}
	<Title/>
	<ConfigButton on:click={modalIsOpen ? closeModal : openModal}/>
	<!-- {#if width >= 825} -->
		<Grid bind:scheduling_data={scheduling_data} width={width} height={height}/>
		<!-- <h2>Seek Time: {}</h2> -->
	<!-- {:else}
		<LowScreenSize />	
		<h2 class="low-screen-size-seek">Seek Time: {disk_scheduler.performCalculation()[scheduling_data.disk_requests.length - 1].seek_time}</h2>
	{/if} -->
</main>

<svelte:window on:resize={handleResize} />

<style>
	main {
		height: 100vh;
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		color: white;
	}

	/* .low-screen-size-seek {
		margin-top: 20%;
	} */
</style>