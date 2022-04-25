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
        <svg on:click xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="10" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g></svg>
        <h3>Scheduler Configuration</h3>
        <div class="algorithms">
            <h4>Algorithms</h4>
            <div class="algorithm-types">
                <h5>FCFS</h5>
                <h5>SSTF</h5>
                <h5>SCAN</h5>
                <h5>C-SCAN</h5>
                <h5>LOOK</h5>
                <h5>C-LOOK</h5>
            </div>
        </div>
        <div class="head-direction">
            <h4>Head Direction</h4>
            <div class="head-direction-options">
                <h5>Left</h5>
                <h5>Right</h5>
            </div>
        </div>
        <input class="cylinders-input" type="text" placeholder="Number of Cylinders">
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
        background-color: rgb(8, 8, 8);
        animation: fadeIn 0.2s ease-in-out;
        margin: 20px;
    }

    svg {
        color: white;
        background: none;
        position: absolute;
        margin: 8px;
        top: 0;
        right: 0;
        stroke-width: 10px;
        cursor: pointer;
    }

    .algorithms {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        background:none;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .algorithms h4 {
        margin-bottom: 10px;
    }

    .algorithm-types {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: none;
    }

    .algorithm-types h5 {
        margin: 3px;
    }

    .head-direction, h4, h5, .head-direction-options {
        background: none;
        color: white;
    }

    .head-direction {
        margin-bottom: 20px;
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

    h5 {
        margin-top: 5px;
        font-weight: 300;
        border: 1px solid rgba(255, 255, 255, 0.465);
        padding: 2px 7px;
        cursor: pointer;
        transition: cubic-bezier(0.075, 0.82, 0.165, 1.0) 0.25s;
    }

    .cylinders-input {
        margin-bottom: 20px;
    }

    input {
        text-align: center;
        border: none;
        outline: none;
        color: white;
        padding: 5px 8px;
        border: 1px solid rgba(255, 255, 255, 0.089);
    }

    button {
        background: none;
        color: white;
        border: 1px solid white;
        padding: 3px 7px;
        margin-top: 20px;
        font-weight: 100;
        font-size: 13px;
        cursor: pointer;
        transition: cubic-bezier(0.075, 0.82, 0.165, 1.0) 0.4s;
        animation: translate-down cubic-bezier(0.075, 0.82, 0.165, 1.0) 1s;
    }

    button:hover, h5:hover {
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