/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IAppSection {
	title?: string;
	url: string;
	icon?: string;
}

export module NxAppPages {
	export module Driver {
		export const title = 'Driver Page';
		export const url   = '/app/start';
		export const icon  = 'list-outline';
	}

	export module TaxiShift {
		export const title = 'Taxi Shift';
		export const url   = '/app/shift';
		export const icon  = 'list-outline';
	}

	export module InternalError {
		export const title = "Internal Error"
		export const url = "/internal-error"
	}
}

export const AppPages: IAppSection[] = [
	{
		title: 'Driver Start Page',
		url:   '/app/start',
		icon:  'list-outline'
	},
	{
		title: 'Profile',
		url:   '/app/user',
		icon:  'person-outline'
	},
	{
		title: 'Contact Card',
		url:   '/contact-card',
		icon:  './assets/custom-icons/side-menu/contact-card.svg'
	},
	{
		title: 'Notifications',
		url:   '/app/notifications',
		icon:  'notifications-outline'
	}
];

export const AccountPages = [
	{
		title:     'Log In',
		url:       '/auth/login',
		ionicIcon: 'log-in-outline'
	},
	{
		title:     'Sign Up',
		url:       '/auth/signup',
		ionicIcon: 'person-add-outline'
	},
	{
		title:     'Tutorial',
		url:       '/messages',
		ionicIcon: 'school-outline'
	},
	{
		title:     'Getting Started',
		url:       '/orders',
		ionicIcon: 'rocket-outline'
	},
	{
		title:     '404 page',
		url:       '/page-internal-error',
		ionicIcon: 'alert-circle-outline'
	}
];

