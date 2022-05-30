import { Component }        from '@angular/core';

import { DomSanitizer }     from '@angular/platform-browser';
import { SafeResourceUrl }  from '@angular/platform-browser';
import { Photo }            from "@capacitor/camera";
import { Camera }           from "@capacitor/camera";
import { CameraSource }     from "@capacitor/camera";
import { CameraResultType } from "@capacitor/camera";
import { Plugins }          from "@capacitor/core";

@Component(
	{
		selector:    'cm-camera',
		templateUrl: 'camera.page.html',
		styleUrls:   ['camera.page.scss']
	})
export class CmCameraDialog {
	photo: SafeResourceUrl;

	constructor(private sanitizer: DomSanitizer) {
	}

	async takePicture() {
		const image: Photo = await Camera.getPhoto(
			{
				quality:      100,
				allowEditing: false,
				resultType:   CameraResultType.DataUrl,
				source:       CameraSource.Camera
			});

		this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
	}
}
