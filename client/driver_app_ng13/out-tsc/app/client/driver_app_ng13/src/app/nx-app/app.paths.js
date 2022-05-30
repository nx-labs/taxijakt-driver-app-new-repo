/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var NxAppPages;
(function (NxAppPages) {
    let Driver;
    (function (Driver) {
        Driver.title = 'Driver Page';
        Driver.url = '/app/start';
        Driver.icon = 'list-outline';
    })(Driver = NxAppPages.Driver || (NxAppPages.Driver = {}));
    let TaxiShift;
    (function (TaxiShift) {
        TaxiShift.title = 'Taxi Shift';
        TaxiShift.url = '/app/shift';
        TaxiShift.icon = 'list-outline';
    })(TaxiShift = NxAppPages.TaxiShift || (NxAppPages.TaxiShift = {}));
    let InternalError;
    (function (InternalError) {
        InternalError.title = "Internal Error";
        InternalError.url = "/internal-error";
    })(InternalError = NxAppPages.InternalError || (NxAppPages.InternalError = {}));
})(NxAppPages || (NxAppPages = {}));
export const AppPages = [
    {
        title: 'Driver Start Page',
        url: '/app/start',
        icon: 'list-outline'
    },
    {
        title: 'Profile',
        url: '/app/user',
        icon: 'person-outline'
    },
    {
        title: 'Contact Card',
        url: '/contact-card',
        icon: './assets/custom-icons/side-menu/contact-card.svg'
    },
    {
        title: 'Notifications',
        url: '/app/notifications',
        icon: 'notifications-outline'
    }
];
export const AccountPages = [
    {
        title: 'Log In',
        url: '/auth/login',
        ionicIcon: 'log-in-outline'
    },
    {
        title: 'Sign Up',
        url: '/auth/signup',
        ionicIcon: 'person-add-outline'
    },
    {
        title: 'Tutorial',
        url: '/messages',
        ionicIcon: 'school-outline'
    },
    {
        title: 'Getting Started',
        url: '/orders',
        ionicIcon: 'rocket-outline'
    },
    {
        title: '404 page',
        url: '/page-internal-error',
        ionicIcon: 'alert-circle-outline'
    }
];
