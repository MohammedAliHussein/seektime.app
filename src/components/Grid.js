export class Grid {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }

    drawCanvas(scheduling_data) {
        this.horizontal_divisions = scheduling_data.disk_requests.length === 0 ? scheduling_data.cylinders : scheduling_data.disk_requests.length;

        if(this.context && this.canvas) {
            this.drawCylinderNumbers();
            this.drawHeadPoints();
            this.drawHeadMovements();
        }
    }

    drawCylinderNumbers() { //Code for this adapted from https://svelte.dev/repl/79f4f3e0296a403ea988f74d332a7a4a?version=3.12.1
        let aspect = this.canvas.width / this.canvas.height;

        for(let x = 1; x < this.horizontal_divisions - 1; x++)
        {
            const v = 2 / (this.horizontal_divisions - 1);
            const u = x / (this.horizontal_divisions - 1);

            let px = u * this.canvas.width;
            let py = (v * aspect) * this.canvas.height;

            if(x % 10 == 0) {
                this.context.fillStyle = "white";
                this.context.fillText(x, px, py);
            } else {
                // this.context.beginPath();
                // this.context.arc(px, py, 1, 0, Math.PI * 2);
                // this.context.fillStyle = "white";
                // this.context.fill();
            }


        }
    }

    drawHeadPoints() {

    }

    drawHeadMovements() {

    }
}