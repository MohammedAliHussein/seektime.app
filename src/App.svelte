<script>
	import Title from "./components/Title.svelte";
	import ConfigButton from "./components/ConfigButton.svelte";
	import ConfigurationModal from "./components/ConfigurationModal.svelte";

	let modalIsOpen = false;

	function openModal() {
		modalIsOpen = true;		
	}

	function closeModal() {
		modalIsOpen = false;		
	}

	function handleConfig(event) {
		console.log(event.detail);
		modalIsOpen = false;
	}

</script>

<main>
	{#if modalIsOpen}
		<ConfigurationModal on:config={handleConfig} on:click={modalIsOpen ? closeModal : openModal}/>
	{/if}
	<Title/>
	<ConfigButton on:click={modalIsOpen ? closeModal : openModal}/>
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		text-align: center;
	}
</style>