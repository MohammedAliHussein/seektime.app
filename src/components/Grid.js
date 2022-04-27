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

        for(let x = 0; x < this.horizontal_divisions; x++)
        {
            const v = 1.4 / (this.horizontal_divisions - 1); 
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

    }

    drawHeadMovements() {

    }
}