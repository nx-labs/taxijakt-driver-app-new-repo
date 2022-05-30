import { Component }             from '@angular/core';
import { ActionSheetController } from "@ionic/angular";
import { ToastController }       from "@ionic/angular";
import { Platform }              from "@ionic/angular";
import { LoadingController }     from "@ionic/angular";
import { NavController }         from "@ionic/angular";

@Component({
  selector:    'app-contact-card',
  templateUrl: './contact-card.page.html',
  styleUrls:   [
	  './styles/contact-card.page.scss',
	  './styles/contact-card.shell.scss'
  ]
})
export class ContactCardPage {

	/*
	lastImage: string = null;
	loading: Loading;

	constructor(public navCtrl: NavController, private cm-camera-dialog: Camera, private
					transfer: Transfer, private file: File, private filePath: FilePath, public
					actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
				public platform: Platform, public loadingCtrl: LoadingController) { }
	public presentActionSheet()
	{
		let actionSheet = this.actionSheetCtrl.create({
														  title: 'Select Image Source',
														  buttons: [
															  {
																  text: 'Load from Library',
																  handler: () => {
																	  this.takePicture(this.cm-camera-dialog.PictureSourceType.PHOTOLIBRARY);
																  }
															  },
															  {
																  text: 'Use Camera',
																  handler: () => {
																	  this.takePicture(this.cm-camera-dialog.PictureSourceType.CAMERA);
																  }
															  },
															  {
																  text: 'Cancel',
																  role: 'cancel'
															  }
														  ]
													  });
		actionSheet.present();
	}
}

public takePicture(sourceType)
{
	// Create options for the Camera Dialog
	var options = {
		quality: 100,
		sourceType: sourceType,
		saveToPhotoAlbum: false,
		correctOrientation: true
	};

	// Get the data of an image
	this.cm-camera-dialog.getPicture(options).then((imagePath) => {
		// Special handling for Android library
		if (this.platform.is('android') && sourceType ===
			this.cm-camera-dialog.PictureSourceType.PHOTOLIBRARY) {
			this.filePath.resolveNativePath(imagePath)
				.then(filePath => {
					let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
					let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1,
														  imagePath.lastIndexOf('?'));
					this.copyFileToLocalDir(correctPath, currentName,
											this.createFileName());
				});
		} else {
			var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
			var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
			this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
		}
	}, (err) => {
		this.presentToast('Error while selecting image.');
	});
}

private
createFileName()
{
	var d = new Date(),
		n = d.getTime(),
		newFileName = n + ".jpg";
	return newFileName;
}

// Copy the image to a local folder
private
copyFileToLocalDir(namePath, currentName, newFileName)
{
	this.file.copyFile(namePath, currentName, cordova.file.dataDirectory,
					   newFileName).then(success => {
		this.lastImage = newFileName;
	}, error => {
		this.presentToast('Error while storing file.');
	});
}

private presentToast(text)
{
	let toast = this.toastCtrl.create({
										  message: text,
										  duration: 3000,
										  position: 'top'
									  });
	toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img)
{
	if (img === null) {
		return '';
	} else {
		return cordova.file.dataDirectory + img;
	}
}

*/
}
