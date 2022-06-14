<script>
    import { onMount } from "svelte";

    let ready = false;

    onMount(() => {
        ready = true;
    });
</script>

{#if ready}
    <h5>Algorithms from https://www.geeksforgeeks.org/disk-scheduling-algorithms/</h5>
{/if}

<style>
    h5 {
        color: rgba(255, 255, 255, 0.3);
        font-size: 11px;
        position: absolute;
        top: 10px;
        font-weight: 300;
    }

</style>