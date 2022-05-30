import { isPlatformBrowser }                                                     from '@angular/common';
import { Component, AfterViewInit, ViewChild, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl }                                                from '@angular/forms';

import { IonSlides, MenuController } from '@ionic/angular';

@Component({
			   selector   : 'app-orders',
			   templateUrl: './settings.page.html',
			   styleUrls  : [
				   './styles/getting-started.page.scss',
				   './styles/getting-started.shell.scss',
				   './styles/getting-started.responsive.scss'
			   ]
		   })
export class SettingsPage implements AfterViewInit {
	@ViewChild(IonSlides, { static: true }) slides: IonSlides;
	@HostBinding('class.last-slide-active') isLastSlide = false;

	gettingStartedForm: FormGroup;

	constructor(
		@Inject(PLATFORM_ID) private platformId: object,
		public menu: MenuController
	) {
	}

	// Disable side menu for this page
	ionViewDidEnter(): void {
		this.menu.enable(false);
	}

	// Restore to default when leaving this page
	ionViewDidLeave(): void {
		this.menu.enable(true);
	}

	ngAfterViewInit(): void {
		// Accessing slides in server platform throw errors
		if (isPlatformBrowser(this.platformId)) {
			// ViewChild is set
			this.slides.isEnd().then(isEnd => {
				this.isLastSlide = isEnd;
			});

			// Subscribe to changes
			this.slides.ionSlideWillChange.subscribe(changes => {
				this.slides.isEnd().then(isEnd => {
					this.isLastSlide = isEnd;
				});
			});
		}
	}
}
