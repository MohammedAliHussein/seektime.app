<script>
    import { fly } from 'svelte/transition';
    import { circOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    const title = "Disk Scheduler Visualisation";  
    let showing = false;

    onMount(() => {
        showing = true;
    });

</script>

{#if showing}
    <h1 transition:fly="{{ y: -20, duration: 400, easing: circOut }}">{title}</h1>
{/if}

<style>
    h1 {
        color: white;
        padding-top: 10vh;
        font-size: 42px;
    }
</style>