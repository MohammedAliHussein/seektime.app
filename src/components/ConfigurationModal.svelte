<script>
    import { onMount, onDestroy } from 'svelte';

    onMount(() => {
        console.log("Mounted");
    });

    onDestroy(() => {
        console.log("Destroyed");
    });

</script>

<div class="modal-container">
    <div class="config-modal">
        <!-- svelte-ignore a11y-missing-attribute -->
        <svg on:click xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="10" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g></svg>
        <h3>Scheduler Configuration</h3>
        <div class="head-direction">
            <h4>Head Direction</h4>
            <div class="head-direction-options">
                <h5>Left</h5>
                <h5>Right</h5>
            </div>
        </div>
        <input class="cylinders-input" type="text" placeholder="Cylinders">
        <input class="requests-input" type="text" placeholder="Disk Requests">
        <button>Confirm Config</button>
    </div>
</div>


<style>
    .modal-container {
        position: absolute;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.667); 
        animation: fadeIn 0.2s ease-in-out;
    }

    .config-modal {
        width: 300px;
        height: 400px;
        border: 1px solid rgba(255, 255, 255, 0.066);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: rgb(12, 12, 12);
        animation: fadeIn 0.2s ease-in-out;
        margin: 20px;
    }

    svg {
        width: 30px;
        height: 30px;
        color: white;
        background: none;
        position: absolute;
        margin: 8px;
        top: 0;
        right: 0;
        stroke-width: 10px;
        cursor: pointer;
    }

    .head-direction, h4, h5, .head-direction-options {
        background: none;
        color: white;
    }

    .head-direction {
        margin-bottom: 20px;
        margin-top: 30px;
    }

    .head-direction-options {
        display: flex;
        justify-content: space-evenly;
        margin-top: 5px;
    }

    h3 {
        color: white;
        background: none;
        font-size: 28px;
    }

    .cylinders-input {
        margin-bottom: 20px;
    }

    input {
        text-align: center;
        border: none;
        outline: none;
        color: white;
        padding: 5px 10px;
        border: 1px solid rgba(255, 255, 255, 0.089);
    }

    button {
        background: none;
        color: white;
        border: 1px solid white;
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

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 100%;
        }
    }
</style>