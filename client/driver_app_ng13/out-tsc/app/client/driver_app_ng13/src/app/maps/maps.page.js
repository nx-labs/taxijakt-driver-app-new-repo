import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController } from '@ionic/angular';
import { GoogleMapComponent } from '../components/google-map/google-map.component';
var TravelMode = google.maps.TravelMode;
let MapsPage = class MapsPage {
    constructor(loadingController) {
        this.loadingController = loadingController;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.mapOptions = {
            zoom: 15,
            center: { lat: -34.9199842, lng: -56.149849 }
            // uncomment the following line if you want to remove the default Map controls
            // disableDefaultUI: true
        };
    }
    ngAfterViewInit() {
        // GoogleMapComponent should be available
        this._GoogleMap.$mapReady.subscribe(map => {
            this.map = map;
            this.directionsDisplay.setMap(map);
            console.log('ngAfterViewInit - Google map ready');
        });
        this.createLoader();
        this.calculateAndDisplayRoute();
    }
    calculateAndDisplayRoute() {
        const scope = this;
        this.directionsService.route({
            origin: 'Luleå, Sweden',
            destination: 'Boden, Sweden',
            travelMode: TravelMode.DRIVING
        }, (response, status) => {
            if (status === 'OK') {
                scope.directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    createLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadingElement = yield this.loadingController.create({
                message: 'Trying to get your current location...'
            });
        });
    }
    presentLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingElement.present();
        });
    }
    dismissLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loadingElement) {
                yield this.loadingElement.dismiss();
            }
        });
    }
    geolocateMe() {
        this.presentLoader();
        Geolocation.getCurrentPosition().then(position => {
            const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.map.panTo(current_location);
            // add a marker
            const marker = new google.maps.Marker({
                position: current_location,
                title: 'You are here!',
                // animation: google.maps.Animation.DROP
            });
            // To add the marker to the map, call setMap();
            marker.setMap(this.map);
        }).catch((error) => {
            console.log('Error getting current location', error);
        }).finally(() => this.dismissLoader());
    }
};
__decorate([
    ViewChild(GoogleMapComponent, { static: false }),
    __metadata("design:type", GoogleMapComponent)
], MapsPage.prototype, "_GoogleMap", void 0);
MapsPage = __decorate([
    Component({
        selector: 'app-maps',
        templateUrl: './maps.page.html',
        styleUrls: [
            './styles/maps.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [LoadingController])
], MapsPage);
export { MapsPage };
