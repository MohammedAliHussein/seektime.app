<script>
import { onMount } from "svelte";

    let showing = false;

    onMount(() => {
        setTimeout(() => {
            showing = true;
        }, 300);
    })

</script>

{#if showing}
    <div class="low-screen-size">
        <h5 class="top-message">Visualisation is not available for lower screen sizes.</h5>
        <h5 class="bottom-message">Seek time calculation is still available.</h5>
    </div>

{/if}

<style>

    .low-screen-size {
        margin-top: 30px;
    }

    .top-message {
        color: rgba(255, 0, 0, 0.7);
        margin: 5px;
    }

    .bottom-message {
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
    }

</style>