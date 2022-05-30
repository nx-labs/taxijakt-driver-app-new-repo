import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule }          from '@ionic/angular';
import { ComponentsModule }     from '@components/components.module';
import { NxComponentsModule }   from "@nxApp/components/nx-components.module";
import { MessagesPage }         from './messages.page';

const routes: Routes = [
	{
		path     : '',
		component: MessagesPage
	}
];

@NgModule({
			  imports: [
				  CommonModule,
				  FormsModule,
				  IonicModule,
				  RouterModule.forChild(routes),
				  ComponentsModule,
				  NxComponentsModule
			  ],
			  declarations: [ MessagesPage ]
		  })
export class MessagesPageModule {
}
