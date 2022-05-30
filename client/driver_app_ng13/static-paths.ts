export const REDIRECT_ROUTES = [
  {
    from: '/',
    to: '/messages'
  },
  {
    from: '/auth',
    to: '/auth/login'
  },
  {
    from: '/app',
    to: '/app/start'
  },
  {
    from: '/firebase',
    to: '/firebase/auth/sign-in'
  },
  {
    from: '/firebase/auth',
    to: '/firebase/auth/sign-in'
  },
  // We don't store state in the server, redirect to sign-in.
  // [/sign-in] should redirect to profile if the user is logged in the Browser
  {
    from: '/firebase/auth/profile',
    to: '/firebase/auth/sign-in'
  },
  {
    from: '/firebase/crud',
    to: '/firebase/crud/listing'
  },
  {
    from: '/showcase',
    to: '/showcase/app-shell'
  }
];

export const APP_ROUTES = [
  '/messages',
  '/orders',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/app/start',
  '/app/start/home-screen',
  '/app/start/home-screen/:productId',
  '/app/user',
  '/app/user/friends',
  '/app/notifications',
  '/firebase/auth/sign-in',
  '/firebase/auth/sign-up',
  '/firebase/crud/listing',
  '/firebase/crud/details/:id',
  '/contact-card',
  '/forms-and-validations',
  '/forms-filters',
  '/maps',
  '/page-internal-error',
  '/showcase/app-shell',
  '/showcase/app-shell/aspect-ratio',
  '/showcase/app-shell/image-shell',
  '/showcase/app-shell/text-shell',
  '/showcase/app-shell/simple-data-binding',
  '/showcase/app-shell/data-store-basic',
  '/showcase/app-shell/data-store-list',
  '/showcase/app-shell/data-store-subset',
  '/showcase/app-shell/data-store-combined',
  '/showcase/app-shell/data-store-multiple',
  '/showcase/app-shell/data-store-pagination',
  '/showcase/app-shell/data-store-stacked',
  '/showcase/app-shell/data-store-dependant',
  '/showcase/route-resolvers-ux',
  '/showcase/route-resolvers-ux/blocking-resolvers',
  '/showcase/route-resolvers-ux/non-blocking-resolvers',
  '/showcase/route-resolvers-ux/progressive-shell-resolvers',
  '/showcase/custom-components'
];
