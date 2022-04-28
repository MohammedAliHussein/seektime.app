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
                    this.context.beginPath();
                    this.context.fillStyle = "rgba(255, 255, 255, 1)";
                    this.context.arc(px, py, 2, 0, Math.PI * 2);
                    this.context.fill();
                    this.points.push(new Point(px, py));
                }
            } 
        }
    }

    drawHeadMovements() {
        for(let i = 0; i < this.points.length - 1; i++) {
            this.context.strokeStyle = "rgba(225, 225, 225, 1)";
            this.animateLine(this.points[i], this.points[i + 1]);
        }
    }

    animateLine(starting_point, ending_point) {
        let length = 0;

        let startingX = starting_point.getX();
        let startingY = starting_point.getY();
        let endingX = ending_point.getX();
        let endingY = ending_point.getY();

        const x_diff = Math.abs(startingX - endingX);
        const y_diff = Math.abs(endingX - endingY);
        const max_length = Math.sqrt((x_diff * x_diff) + (y_diff * y_diff));

        let id = setInterval(() => {
            if(length >= max_length) clearInterval(id);

            if(length == 0) {
                length += this.easeInOutCirc(1 / 3);
            } else {
                length += this.easeInOutCirc(length / 3);
            }

            if(length >= 1) {
                length = 1;
            }

            this.context.beginPath();
            this.context.moveTo(startingX, startingY);
            this.context.lineTo(startingX + (endingX - startingX) * length, startingY + (endingY - startingY) * length);
            this.context.lineWidth = 0.1;
            this.context.stroke();
            
        }, 10);
    }

    easeInOutCirc(x) {
        let val = x;

        if(x < 0.5) {
            val = (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2;
        } 

        if(x >= 0.5 && x < 1) {
            val = (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
        }

        if(val >= 1) {
            return 1;
        }

        return val;
    }
}