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
    let context;
    let grid = new Grid(canvas, context); 
    let requires_redraw = false;

    function handleResize() {
        width = ((window.innerWidth / 2) * window.devicePixelRatio) * 1.25;
        height = ((window.innerHeight / 2) * window.devicePixelRatio) * 1.25;
    }

    onMount(() => {
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");
        grid = new Grid(canvas, context);
    });

    afterUpdate(() => {
        grid.clearCanvas();
        grid.drawCanvas(scheduling_data);
    });

</script>

<canvas in:fade={{easing: circInOut, duration: 200}} out:fade={{easing: circInOut, duration: 200}} width={width} height={height}/>

<svelte:window on:resize={handleResize} />

<style>
    canvas {
        margin-top: 40px;
        background: none;
    }
</style>