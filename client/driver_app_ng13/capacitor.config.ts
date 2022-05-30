import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.coldmind.driverapp',
  appName: 'DriverApp',
  webDir: 'app-browser-assets',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    CapacitorFirebaseAuth: {
      providers: [
        "google.com",
        "twitter.com",
        "facebook.com",
        "apple.com"
      ],
      languageCode: "en",
      nativeAuth: false
    }
  }
};

export default config;

