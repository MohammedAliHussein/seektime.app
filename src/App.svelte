<script>
	import Title from "./components/Title.svelte";
	import ConfigButton from "./components/ConfigButton.svelte";
	import ConfigurationModal from "./components/ConfigurationModal.svelte";
	import Grid from "./components/Grid.svelte";
	import LowScreenSize from "./components/LowScreenSize.svelte";
	import Disclaimer from "./components/Disclaimer.svelte";
	import { DiskScheduler } from "./models/DiskScheduler.js";
	import { onMount } from "svelte";

	let ready = false; 
	let modalIsOpen = false;
	let width = ((window.innerWidth / 2)) * 1.25;
    let height = ((window.innerHeight / 2)) * 1.25;

	let scheduling_data = {
		selected_algorithm: "FCFS",
		head_direction: "Left",
		cylinders: 200,
		disk_requests: [53, 98, 183, 37, 122, 14, 124, 65, 67]
	}

	// function toDisplayString(disk_requests) {
	// 	console.log(disk_requests.toString().replaceAll(",", " "));
	// 	return disk_requests
	// }

	let disk_scheduler = new DiskScheduler(scheduling_data);
	$: seek_time = calculateSeekTime(scheduling_data.disk_requests);
	let pastDiskReqests = scheduling_data.disk_requests.toString().replaceAll(",", " ");

	function openModal() {
		modalIsOpen = true;		
	}

	function closeModal() {
		modalIsOpen = false;		
	}

	function handleConfig(event) {
		scheduling_data = event.detail;
		modalIsOpen = false;
		pastDiskReqests = scheduling_data.disk_requests.toString().replaceAll(",", " "); 
		disk_scheduler = new DiskScheduler(scheduling_data);
		scheduling_data.disk_requests = disk_scheduler.performCalculation();
	}

	function handleResize() {
        width = ((window.innerWidth / 2)) * 1.25;
        height = ((window.innerHeight / 2)) * 1.25;
	}

	function calculateSeekTime(disk_requests) {
		let seek_time = 0;

		for(let i = 0; i < disk_requests.length - 1; i++) {
			seek_time += Math.abs(disk_requests[i] - disk_requests[i + 1]);
		}

		return seek_time;
	}

	onMount(() => {
		console.log(String.prototype);
		ready = true;
	})
</script>

{#if ready}
	<main>
		{#if modalIsOpen}
			<ConfigurationModal pastDiskReqests={pastDiskReqests} 
								pastNumberOfCylinders={scheduling_data.cylinders} 
								pastAlgorithm={scheduling_data.selected_algorithm}
								pastHeadDirection={scheduling_data.pastHeadDirection}
								on:config={handleConfig} 
								on:click={modalIsOpen ? closeModal : openModal}
			/>
		{/if}
		<Disclaimer />
		<Title/>
		<ConfigButton on:click={modalIsOpen ? closeModal : openModal}/>
		{#if width >= 825}
			<Grid bind:scheduling_data={scheduling_data} width={width} height={height}/>
			<h2 class="seek-time">Seek Time: {seek_time}</h2>
		{:else}
			<LowScreenSize />	
			<h2 class="low-screen-size-seek">Seek Time: {seek_time}</h2>
		{/if}
	</main>
{/if}

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

	.seek-time {
		color: white;
	}

	.low-screen-size-seek {
		margin-top: 20%;
	}
</style>