<script>
    import { afterUpdate, onMount } from "svelte";
    import { Grid } from "./Grid.js";

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
        grid.drawCanvas(scheduling_data);
    });

</script>

<canvas width={width} height={height}/>

<svelte:window on:resize={handleResize} />

<style>
    canvas {
        margin-top: 40px;
        border-left: 1px solid rgba(255, 255, 255, 0.066);
        border-right: 1px solid rgba(255, 255, 255, 0.066);
    }
</style>