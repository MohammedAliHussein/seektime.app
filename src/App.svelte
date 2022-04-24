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
</script>

<main>
	<Title/>
	<ConfigButton on:click={modalIsOpen ? closeModal : openModal}/>
	{#if modalIsOpen}
		<ConfigurationModal/>
	{/if}
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		text-align: center;
	}

	/*
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>