import { Point } from "./Point.js";

export class Grid {
    TOP_GAP = 1.4;
    ANIMATION_ON = true;
    points = [];
    interval_id = "";

    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }

    drawCanvas(scheduling_data) {
        this.horizontal_divisions = scheduling_data.cylinders;
        this.vertical_divisions = scheduling_data.disk_requests.length;    
    
        if(this.context && this.canvas) {
            this.scheduling_data = scheduling_data;
            this.reset();
            this.drawCylinderNumbers();
            this.drawHeadPoints();
            this.drawHeadMovements();
        }
    }

    reset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.points = [];
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
                this.context.fillText(x, px, py + 8);
            } 
        }
    }

    drawHeadPoints() {
        let aspect = this.canvas.width / this.canvas.height;

        for(let y = 0; y < this.scheduling_data.disk_requests.length; y++) {
            for(let x = 0; x < this.horizontal_divisions; x++) {

                const v = y / (this.vertical_divisions + this.TOP_GAP); 
                const u = x / (this.horizontal_divisions - 1); 
                 
                let px = u * this.canvas.width;
                let py = ((v) * this.canvas.height) + 20;

                this.drawHorizontalRow(px, py);

                if(this.scheduling_data.disk_requests[y] === x) {
                    this.drawHeadMovementPoint(px, py, y);
                }
            } 
        }
    }

    drawHorizontalRow(px, py) {
        this.context.beginPath();
        this.context.fillStyle = "rgba(255, 255, 255, 0.05)";
        this.context.arc(px, py + 1, 1, 0, Math.PI * 2);
        this.context.fill();
    }

    drawHeadMovementPoint(px, py, y) {
        this.context.beginPath();
        this.context.fillStyle = "rgba(255, 255, 255, 1)";
        this.context.arc(px, py, 2, 0, Math.PI * 2);
        this.context.fill();
        this.context.fillStyle = "rgba(255, 255, 255, 1)";
        this.context.fillText(this.scheduling_data.disk_requests[y], px, py + 15);
        this.points.push(new Point(px, py));
    }

    drawHeadMovements() {
        this.context.strokeStyle = "rgba(225, 225, 225, 1)";
        for(let i = 0; i < this.points.length - 1; i++) {
            if(this.interval_id !== null) {
                if(this.ANIMATION_ON) {
                    this.animtedLineDraw(i);
                } else {
                    this.nonAnimatedLineDraw(i);
                }
            }
        }
    }

    animtedLineDraw(i) {
        setTimeout(() => {
            this.animateLine(this.points[i], this.points[i + 1]);
        }, i * 700);
    }

    nonAnimatedLineDraw(i) {
        this.context.beginPath();
        this.context.moveTo(this.points[i].getX(), this.points[i].getY());
        this.context.lineTo(this.points[i + 1].getX(), this.points[i + 1].getY());
        this.context.lineWidth = 0.2;
        this.context.stroke();
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

        this.interval_id = setInterval(() => {
            let tempX = startingX + (endingX - startingX) * length;
            let tempY = startingY + (endingY - startingY) * length;

            if(length >= max_length) clearInterval(this.interval_id);

            if(length == 0) {
                length += this.easeInOutCirc(1 / 4);
            } else {
                length += this.easeInOutCirc(length / 4);
            }

            if(length >= 1) {
                length = 1;
            }

            this.context.beginPath();
            this.context.moveTo(startingX, startingY);
            this.context.lineTo(tempX, tempY);
            this.context.lineWidth = 0.5;
            this.context.stroke();
            
            startingX = tempX; /*So that each line doesnt have old lines drawn over. Just start from where it left off */
            startingY = tempY;
        }, 10);
    }

    clearCanvas() {
        this.interval_id = null;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.interval_id = "";
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