<script>
    import { fly } from 'svelte/transition';
    import { circOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    let showing = false;

    onMount(() => {
        showing = true;
    });

</script>

{#if showing}
    <button on:click transition:fly="{{ y: -20, duration: 400, easing: circOut, delay: 200 }}">Configure Scheduler</button>
{/if}

<style>
    button {
        background: none;
        color: white;
        border: 1px solid white;
        width: fit-content;
        padding: 3px 7px;
        margin-top: 30px;
        font-weight: 100;
        font-size: 13px;
        cursor: pointer;
        transition: cubic-bezier(0.075, 0.82, 0.165, 1.0) 0.4s;
        animation: translate-down cubic-bezier(0.075, 0.82, 0.165, 1.0) 1s;
    }

    button:hover {
        background-color: white;
        color: black;
    }

</style>