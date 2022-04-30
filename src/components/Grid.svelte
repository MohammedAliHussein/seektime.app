<script>
    import { afterUpdate, onMount } from "svelte";
    import { Grid } from "./Grid.js";
    import { fade } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';

    export let width;
    export let height; 

	export let scheduling_data = {
		selected_algorithm: "",
		head_direction: null,
		cylinders: 200,
		disk_requests: []
	};

    let canvas;
    let canvas2;
    let context;
    let context2;
    let grid = new Grid(canvas, context, canvas2, context2); 

    function handleResize() {
        width = ((window.innerWidth / 2)) * 1.25;
        height = ((window.innerHeight / 2)) * 1.25;

        console.log(`width: ${width}\n window-inner: ${window.innerWidth}`);
    }

    onMount(() => {
        canvas = document.querySelector(".canvas");
        context = canvas.getContext("2d");
        canvas2 = document.querySelector(".canvas2");
        context2 = canvas2.getContext("2d");
        grid = new Grid(canvas, context, canvas2, context2);
    });

    afterUpdate(() => {
        grid.clearCanvas();
        grid.drawCanvas(scheduling_data);
    });

</script>

<canvas class="canvas2" in:fade={{easing: circInOut, duration: 200}} out:fade={{easing: circInOut, duration: 200}} width={width + 25} height={height / 25}/>
<canvas class="canvas" in:fade={{easing: circInOut, duration: 200}} out:fade={{easing: circInOut, duration: 200}} width={width} height={height + 15}/>

<svelte:window on:resize={handleResize} />

<style>
    canvas {
        background: none;
    }
    .canvas2 {
        margin-top: 40px;
        background: none;
        /* background-color: rgb(0, 35, 65); */
    }
</style>