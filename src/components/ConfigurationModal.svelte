<script>
    import { onMount, onDestroy } from 'svelte';

    onMount(() => {
        console.log("Mounted");
    });

    onDestroy(() => {
        console.log("Destroyed");
    });

</script>

<div>
    <h3>Scheduler Configuration</h3>
</div>

<style>

</style>