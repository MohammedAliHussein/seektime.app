<script>
	import Title from "./components/Title.svelte";
	import ConfigButton from "./components/ConfigButton.svelte";
	import ConfigurationModal from "./components/ConfigurationModal.svelte";
	import Grid from "./components/Grid.svelte";
	
	let modalIsOpen = false;
	let width = (window.innerWidth / 2) * 1.25;
    let height = (window.innerHeight / 2) * 1.25; 

	function openModal() {
		modalIsOpen = true;		
	}

	function closeModal() {
		modalIsOpen = false;		
	}

	function handleConfig(event) {
		// console.log(event.detail);
		modalIsOpen = false;
	}

</script>

<main>
	{#if modalIsOpen}
		<ConfigurationModal on:config={handleConfig} on:click={modalIsOpen ? closeModal : openModal}/>
	{/if}
	<Title/>
	<ConfigButton on:click={modalIsOpen ? closeModal : openModal}/>
	<Grid  width={width} height={height}/>
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