<script>
	import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';

    const dispatch = createEventDispatcher();

    let selected_algorithm = "";
    let head_direction = "";
    let cylinders = "";
    let disk_requests = "";

    function cleanRequests(array) {
        let cleaned = toIntArray(array);
        cleaned = removeNonInt(cleaned);
        console.log(cleaned);
        return cleaned;
    }

    function toIntArray(array) {
        for(let i = 0; i < array.length; i++) {
            array[i] = parseInt(array[i]);
        }

        return array;
    }

    function removeNonInt(array) {
        return array.filter((current_int) => {
            if(typeof(current_int) === 'number') return current_int;
        });
    }

    function sendConfiguration() {
        dispatch("config", {
            selected_algorithm,
            head_direction,
            cylinders: parseInt(cylinders),
            disk_requests: cleanRequests((disk_requests.trim()).split(" "))
        });
    }

</script>

<div class="modal-container" out:fade={{easing: circInOut, duration: 200}}>
    <div class="config-modal">
        <svg on:click xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="10" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g></svg>
        <h3>Scheduler Configuration</h3>
        <div class="algorithms">
            <h4>Algorithms</h4>
            <div class="algorithm-types">
                <h5 class:highlighted_button="{selected_algorithm === "FCFS"}" on:click="{() => { selected_algorithm === "FCFS" ? selected_algorithm = "" : selected_algorithm = "FCFS"; }}">FCFS</h5>
                <h5 class:highlighted_button="{selected_algorithm === "SSTF"}" on:click="{() => { selected_algorithm === "SSTF" ? selected_algorithm = "" : selected_algorithm = "SSTF"; }}">SSTF</h5>
                <h5 class:highlighted_button="{selected_algorithm === "SCAN"}" on:click="{() => { selected_algorithm === "SCAN" ? selected_algorithm = "" : selected_algorithm = "SCAN"; }}">SCAN</h5>
                <h5 class:highlighted_button="{selected_algorithm === "C-SCAN"}" on:click="{() => { selected_algorithm === "C-SCAN" ? selected_algorithm = "" : selected_algorithm = "C-SCAN"; }}">C-SCAN</h5>
                <h5 class:highlighted_button="{selected_algorithm === "LOOK"}" on:click="{() => { selected_algorithm === "LOOK" ? selected_algorithm = "" : selected_algorithm = "LOOK"; }}">LOOK</h5>
                <h5 class:highlighted_button="{selected_algorithm === "C-LOOK"}" on:click="{() => { selected_algorithm === "C-LOOK" ? selected_algorithm = "" : selected_algorithm = "C-LOOK"; }}">C-LOOK</h5>
            </div>
        </div>
        <div class="head-direction">
            <h4>Head Direction</h4>
            <div class="head-direction-options">
                <h5 class:highlighted_button="{head_direction === "Left"}" on:click="{() => { head_direction === "Left" ? head_direction = "" : head_direction = "Left" }}">Left</h5>
                <h5 class:highlighted_button="{head_direction === "Right"}" on:click="{() => { head_direction === "Right" ? head_direction = "" : head_direction = "Right" }}">Right</h5>
            </div>
        </div>
        <input bind:value={cylinders} class="cylinders-input" type="text" placeholder="Number of Cylinders">
        <input bind:value={disk_requests} class="requests-input" type="text" placeholder="Disk Requests">
        <button on:click="{sendConfiguration}">Confirm Config</button>
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

    .highlighted_button {
        background-color: white;
        color: black;
        transition: cubic-bezier(0.075, 0.82, 0.165, 1.0) 0.25s;
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
        padding: 3px 8px;
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

    @keyframes fadeOut {
        0% {
            opacity: 100%;
        }
        100% {
            opacity: 0%;
        }
    }
</style>