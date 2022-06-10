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
        <h5 class="top-message">Visualisation for lower screen sizes is not supported.</h5>
        <h5 class="bottom-message">Seek time calculation is still available.</h5>
    </div>
{/if}

<style>

    .low-screen-size {
        margin-top: 30px;
    }

    .top-message {
        color: rgb(255, 0, 0);
        margin: 5px;
    }

    .bottom-message {
        color: rgb(255, 255, 255);
        font-size: 12px;
    }

</style>