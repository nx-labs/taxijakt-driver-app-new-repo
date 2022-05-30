import { Component, OnInit } from '@angular/core';
import { ModalController }   from "@ionic/angular";
import { NxEvent }           from "@nxApp/events/nx-event-types";
import { NxEventService }    from "@nxApp/events/nx-event.service";
import { DriverStatusType }  from "@shared/driver/driver-status";

@Component({
			   selector   : 'app-driver-busy-modal',
			   templateUrl: './driver-busy-modal.component.html',
			   styleUrls  : [ './driver-busy-modal.component.scss' ],
		   })
export class DriverBusyModalComponent implements OnInit {
	minutes: number = 7;
	distance: number;
	countDownDate: number = new Date().getTime();
	timerDisplay = "";
	timer: any = null;

	constructor(
		private nxEvents: NxEventService,
		private modalController: ModalController) {
		this.addMinutes(this.countDownDate, this.minutes);
		nxEvents.pushNewEvent(NxEvent.SetBusy, this.minutes);
		this.nxEvents.pushNewEvent(NxEvent.SetStatus, DriverStatusType.Busy);
	}

	private addMinutes(ms: number, minutes: number): void {
		let tmpDate = new Date(ms + minutes*60000);
		this.countDownDate = tmpDate.getTime();
	}

	public extendByMin(min: number): void {
		this.addMinutes(this.countDownDate, min);
	}

	public countDown() {
		// Update the count down every 1 second
		this.timer = setInterval(() => {
			let now = new Date().getTime();

			this.distance = this.countDownDate - now;

			let minutes = (this.distance / 1000)  / 60;
			let seconds = ((this.distance / 1000) % 60);

			let minFormatted = Math.round(minutes).toFixed();
			let secFormatted = Math.round(seconds).toFixed();

			// Display the result in the element with id="demo"
			this.timerDisplay = `${minFormatted}:${secFormatted}`;

			// If the count down is finished, write some text
			if (this.distance < 0) {
				clearInterval(this.timer);
				this.timerDisplay = "Time´s up..."
			}
		}, 1000);
	}

	ngOnInit() {
		this.countDown();
	}

	public setAvailable() {
		this.nxEvents.pushNewEvent(NxEvent.SetStatus, DriverStatusType.Available);
		this.dismiss();
	}

	public dismiss(data?: any) {
		this.modalController.dismiss(
			{ data: data }).then(() => {
		});
	}
}
