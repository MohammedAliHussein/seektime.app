import { DiskScheduler } from "./DiskScheduler.js";
import { Point } from "./Point.js";

export class Grid {
    TOP_GAP = 1.4;
    ANIMATION_ON = true;
    points = [];

    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }

    drawCanvas(scheduling_data) {
        // this.horizontal_divisions = scheduling_data.disk_requests.length === 0 ? scheduling_data.cylinders : scheduling_data.disk_requests.length;
        this.horizontal_divisions = scheduling_data.cylinders;

        if(this.context && this.canvas) {
            this.scheduling_data = scheduling_data;
            this.points = [];
            this.drawHeadPoints();
            this.drawCylinderNumbers();
            this.drawHeadMovements();
        }
    }

    drawCylinderNumbers() { //Code for this adapted from https://svelte.dev/repl/79f4f3e0296a403ea988f74d332a7a4a?version=3.12.1
        let aspect = this.canvas.width / this.canvas.height;

        for(let x = 0; x < this.horizontal_divisions; x++)
        {
            const v = this.TOP_GAP / (this.horizontal_divisions - 1); 
            const u = x / (this.horizontal_divisions + 2); 

            let px = u * this.canvas.width;
            let py = (v * aspect) * this.canvas.height;

            if(x % 10 == 0 || x === 0 || x === this.horizontal_divisions - 1) {
                this.context.fillStyle = "white";
                this.context.fillText(x, px, py);
            } 
        }
    }

    drawHeadPoints() {
        let aspect = this.canvas.width / this.canvas.height;

        for(let y = 0; y < this.scheduling_data.disk_requests.length; y++) {
            for(let x = 0; x < this.horizontal_divisions; x++) {
                const v = (y * 9) / (this.horizontal_divisions - 1); 
                const u = x / (this.horizontal_divisions - 1); 

                let px = u * this.canvas.width;
                let py = ((v * aspect) * this.canvas.height) + 20;

                this.context.beginPath();
                this.context.fillStyle = "rgba(255, 255, 255, 0.05)";
                this.context.arc(px, py + 1, 1, 0, Math.PI * 2);
                this.context.fill();

                if(this.scheduling_data.disk_requests[y] === x) {
                    this.points.push(new Point(px, py));
                }
            } 
        }
    }

    drawHeadMovements() {
        for(let i = 0; i < this.points.length - 1; i++) {
            // this.animateLine(this.points[i], this.points[i + 1]);
            this.context.beginPath();
            this.context.moveTo(this.points[i].getX(), this.points[i].getY());
            this.context.lineTo(this.points[i + 1].getX(), this.points[i + 1].getY());
            this.context.lineWidth = 1;
            this.context.strokeStyle = "rgba(225, 225, 225, 1)";
            this.context.stroke();
        }
    }

    animateLine(starting_point, ending_point) {

    }

    easeInOutCirc(x) {
        return x < 0.5
          ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
          : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    }
}