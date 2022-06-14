/**
 * All algorithms found on https://www.geeksforgeeks.org/
 */

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
		let canvas_data = {};

		let algorithm = this.scheduling_data.selected_algorithm;
		switch (algorithm) {
			case "FCFS":
				canvas_data = this.FCFS(this.scheduling_data);
				break;
			case "SSTF":
				canvas_data = this.SSTF(
					this.scheduling_data.disk_requests,
					this.scheduling_data.disk_requests[0],
					this.scheduling_data.disk_requests.length,
				);
				break;
			case "SCAN":
				canvas_data = this.SCAN(
					this.scheduling_data.disk_requests,
					this.scheduling_data.disk_requests[0],
					this.scheduling_data.head_direction.toLowerCase(),
					this.scheduling_data.cylinders,
				);
				break;
			case "C-SCAN":
				canvas_data = this.C_SCAN(
					this.scheduling_data.disk_requests,
					this.scheduling_data.disk_requests[0],
					this.scheduling_data.cylinders,
				);
				break;
			case "LOOK":
				canvas_data = this.LOOK(
					this.scheduling_data.disk_requests,
					this.scheduling_data.disk_requests[0],
					this.scheduling_data.head_direction.toLowerCase(),
				);
				break;
			case "C-LOOK":
				canvas_data = this.C_LOOK(
					this.scheduling_data.disk_requests,
					this.scheduling_data.disk_requests[0],
				);
				break;
		}

		return canvas_data;
	}

	FCFS(scheduling_data) {
		let head_movements = [];
		let total_head_movements = 0;
		let disk_requests = scheduling_data.disk_requests;

		for (let i = 0; i < disk_requests.length - 1; i++) {
			head_movements.push(disk_requests[i]);

			total_head_movements += Math.abs(
				disk_requests[i] - disk_requests[i + 1],
			);
		}

		head_movements.push(disk_requests[disk_requests.length - 1]);

		return head_movements;
	}

	SSTF(queue, head, n) {
		if (n <= 0) {
			return;
		}
		var seek_time = 0.0;
		var minimum = 0.0;
		//This are storing the information of seek sequence
		var skeek = Array(n + 1).fill(0);
		//Create 2d array which is used to store distance and visited status
		var auxiliary = Array(n)
			.fill(0)
			.map(() => new Array(n).fill(0));
		// Loop controlling variable
		var i = 0;
		var j = 0;
		var location = 0;
		for (i = 0; i < n; ++i) {
			// set initial distance
			auxiliary[i][0] = 0;
			// set the visiting element status
			auxiliary[i][1] = 0;
		}
		for (i = 0; i < n; i++) {
			skeek[i] = head;
			// Find distance using head value
			for (j = 0; j < n; ++j) {
				auxiliary[j][0] = queue[j] - head;
				if (auxiliary[j][0] < 0) {
					auxiliary[j][0] = -auxiliary[j][0];
				}
			}
			minimum = Number.MAX_VALUE;
			location = -1;
			//Find the minimum element location that is not visited
			for (j = 0; j < n; ++j) {
				if (auxiliary[j][1] == 0 && auxiliary[j][0] <= minimum) {
					// Get the new minimum distance element location
					location = j;
					minimum = auxiliary[j][0];
				}
			}
			// Update the visited status of new get element
			auxiliary[location][1] = 1;
			// Update head data into current track value
			head = queue[location];
			// Add current distance into seek
			seek_time += auxiliary[location][0];
		}
		if (head != 0) {
			// Add last skee info
			skeek[n] = head;
		}

		skeek.shift();

		return skeek;
	}

	SCAN(arr, head, direction, cylinders) {
		let seek_count = 0;
		let distance, cur_track;
		let left = [],
			right = [];
		let seek_sequence = [];

		seek_sequence.push(head);

		// appending end values
		// which has to be visited
		// before reversing the direction
		if (direction == "left") left.push(0);
		else if (direction == "right") right.push(cylinders - 1);

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] < head) left.push(arr[i]);
			if (arr[i] > head) right.push(arr[i]);
		}

		// sorting left and right vectors
		left.sort(function (a, b) {
			return a - b;
		});
		right.sort(function (a, b) {
			return a - b;
		});

		// run the while loop two times.
		// one by one scanning right
		// and left of the head
		let run = 2;
		while (run-- > 0) {
			if (direction == "left") {
				for (let i = left.length - 1; i >= 0; i--) {
					cur_track = left[i];

					// appending current track to seek sequence
					seek_sequence.push(cur_track);

					// calculate absolute distance
					distance = Math.abs(cur_track - head);

					// increase the total count
					seek_count += distance;

					// accessed track is now the new head
					head = cur_track;
				}
				direction = "right";
			} else if (direction == "right") {
				for (let i = 0; i < right.length; i++) {
					cur_track = right[i];

					// appending current track to seek sequence
					seek_sequence.push(cur_track);

					// calculate absolute distance
					distance = Math.abs(cur_track - head);

					// increase the total count
					seek_count += distance;

					// accessed track is now new head
					head = cur_track;
				}
				direction = "left";
			}
		}

		// console.log(seek_sequence);

		return seek_sequence;
	}

	C_SCAN(arr, head, cylinders) {
		let seek_count = 0;
		let distance, cur_track;
		let left = [],
			right = [];
		let seek_sequence = [];

		seek_sequence.push(head);

		// appending end values
		// which has to be visited
		// before reversing the direction
		left.push(0);
		right.push(cylinders - 1);

		// tracks on the left of the
		// head will be serviced when
		// once the head comes back
		// to the beggining (left end).
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] < head) left.push(arr[i]);
			if (arr[i] > head) right.push(arr[i]);
		}

		// sorting left and right vectors
		left.sort(function (a, b) {
			return a - b;
		});

		right.sort(function (a, b) {
			return a - b;
		});

		// first service the requests
		// on the right side of the
		// head.
		for (let i = 0; i < right.length; i++) {
			cur_track = right[i];

			// appending current track to seek sequence
			seek_sequence.push(cur_track);

			// calculate absolute distance
			distance = Math.abs(cur_track - head);

			// increase the total count
			seek_count += distance;

			// accessed track is now new head
			head = cur_track;
		}

		// once reached the right end
		// jump to the beggining.
		head = 0;

		// adding seek count for head returning from 199 to 0
		seek_count += cylinders - 1;

		// Now service the requests again
		// which are left.
		for (let i = 0; i < left.length; i++) {
			cur_track = left[i];

			// appending current track to seek sequence
			seek_sequence.push(cur_track);

			// calculate absolute distance
			distance = Math.abs(cur_track - head);

			// increase the total count
			seek_count += distance;

			// accessed track is now the new head
			head = cur_track;
		}

		console.log(seek_sequence);
		console.log("asdasd");

		return seek_sequence;
	}

	LOOK(arr, head, direction) {
		let seek_count = 0;
		let distance, cur_track;

		let left = [];
		let right = [];
		let seek_sequence = [];

		seek_sequence.push(head);

		// Appending values which are
		// currently at left and right
		// direction from the head.
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] < head) left.push(arr[i]);
			if (arr[i] > head) right.push(arr[i]);
		}

		// Sorting left and right vectors
		// for servicing tracks in the
		// correct sequence.
		left.sort(function (a, b) {
			return a - b;
		});
		right.sort(function (a, b) {
			return a - b;
		});

		// Run the while loop two times.
		// one by one scanning right
		// and left side of the head
		let run = 2;
		while (run-- > 0) {
			if (direction == "left") {
				for (let i = left.length - 1; i >= 0; i--) {
					cur_track = left[i];

					// Appending current track to
					// seek sequence
					seek_sequence.push(cur_track);

					// Calculate absolute distance
					distance = Math.abs(cur_track - head);

					// Increase the total count
					seek_count += distance;

					// Accessed track is now the new head
					head = cur_track;
				}

				// Reversing the direction
				direction = "right";
			} else if (direction == "right") {
				for (let i = 0; i < right.length; i++) {
					cur_track = right[i];

					// Appending current track to
					// seek sequence
					seek_sequence.push(cur_track);

					// Calculate absolute distance
					distance = Math.abs(cur_track - head);

					// Increase the total count
					seek_count += distance;

					// Accessed track is now new head
					head = cur_track;
				}

				// Reversing the direction
				direction = "left";
			}
		}

		return seek_sequence;
	}

	C_LOOK(arr, head) {
		let seek_count = 0;
		let distance, cur_track;

		let left = [];
		let right = [];
		let seek_sequence = [];

		seek_sequence.push(head);

		// Tracks on the left of the
		// head will be serviced when
		// once the head comes back
		// to the beginning (left end)
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] < head) left.push(arr[i]);
			if (arr[i] > head) right.push(arr[i]);
		}

		// Sorting left and right vectors
		left.sort(function (a, b) {
			return a - b;
		});
		right.sort(function (a, b) {
			return a - b;
		});

		// First service the requests
		// on the right side of the
		// head
		for (let i = 0; i < right.length; i++) {
			cur_track = right[i];

			// Appending current track
			// to seek sequence
			seek_sequence.push(cur_track);

			// Calculate absolute distance
			distance = Math.abs(cur_track - head);

			// Increase the total count
			seek_count += distance;

			// Accessed track is now new head
			head = cur_track;
		}

		// Once reached the right end
		// jump to the last track that
		// is needed to be serviced in
		// left direction
		seek_count += Math.abs(head - left[0]);
		head = left[0];

		// Now service the requests again
		// which are left
		for (let i = 0; i < left.length; i++) {
			cur_track = left[i];

			// Appending current track to
			// seek sequence
			seek_sequence.push(cur_track);

			// Calculate absolute distance
			distance = Math.abs(cur_track - head);

			// Increase the total count
			seek_count += distance;

			// Accessed track is now the new head
			head = cur_track;
		}

		return seek_sequence;
	}
}
