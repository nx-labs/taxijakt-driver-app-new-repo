import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmCameraDialog } from './cm-camera.dialog';

const routes: Routes = [
	{
		path:      '',
		component: CmCameraDialog
	}
];

@NgModule(
	{
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule],
	})
export class CameraPageRoutingModule {
}
