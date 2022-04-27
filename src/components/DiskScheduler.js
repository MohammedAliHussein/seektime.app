export class DiskScheduler {
    constructor(scheduling_data) {
        this.scheduling_data = scheduling_data;
    }

    getSchedulingData() {
        return this.scheduling_data;
    }

    setSchedulingData(scheduling_data) {
        this.scheduling_data = scheduling_data;
    }

    performCalculation() {
        let canvas_data = {
            head_movements: [ {
                head_position: null, //Head movements will be sorted in the chronological order that they should happen
                seek_time: null //After each head movement of animation, the seek time will change visually
            } ],
        };

        let algorithm = this.scheduling_data.selected_algorithm;
        switch(algorithm) {
            case "FCFS":
                canvas_data = this.FCFS(this.scheduling_data);
                break;
            case "SSTF":
                canvas_data = this.SSTF(this.scheduling_data);
                break;
            case "SCAN":
                canvas_data = this.SCAN(this.scheduling_data);
                break;
            case "C-SCAN":
                canvas_data = this.C_SCAN(this.scheduling_data);
                break;
            case "LOOK":
                canvas_data = this.LOOK(this.scheduling_data);
                break;
            case "C-LOOK":
                canvas_data = this.C_LOOK(this.scheduling_data);
                break;
        }

        return canvas_data;
    }

    FCFS(scheduling_data) {
        let head_movements = [];
        let total_head_movements = 0;
        let disk_requests = scheduling_data.disk_requests;

        for(let i = 0; i < disk_requests.length - 1; i++) {
            head_movements.push({
                head_position: disk_requests[i],
                seek_time: total_head_movements
            });
            total_head_movements += Math.abs(disk_requests[i] - disk_requests[i + 1]);
        }

        head_movements.push({
            head_position: disk_requests[disk_requests.length - 1],
            seek_time: total_head_movements
        });

        return head_movements;
    }
}