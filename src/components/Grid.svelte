<script>
    import { onMount } from "svelte";

    export let width;
    export let height; 
    let pixel_ratio;
    let canvas;
    let context;

    function handleResize() {
        width = (window.innerWidth / 2) * 1.25;
        height = (window.innerHeight / 2) * 1.25; 
    }

    onMount(() => {
        pixel_ratio = window.devicePixelRatio;
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");
        // context.fillRect(0, 0, canvas.width, canvas.height);
    });


</script>

<!-- <canvas width="{width * pixel_ratio}" height="{height * pixel_ratio}"><h1>hello</h1></canvas> -->
<canvas width={width} height={height}/>

<svelte:window on:resize={handleResize} />

<style>
    canvas {
        margin-top: 40px;
        border-left: 1px solid rgba(255, 255, 255, 0.066);
        border-right: 1px solid rgba(255, 255, 255, 0.066);
    }

</style>