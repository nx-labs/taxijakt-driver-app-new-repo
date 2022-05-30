import { __decorate, __metadata, __param } from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, PLATFORM_ID, Inject } from '@angular/core';
let GoogleMapComponent = class GoogleMapComponent {
    constructor(_elementRef, platformId) {
        this._elementRef = _elementRef;
        this.platformId = platformId;
        this.$mapReady = new EventEmitter();
        this._mapIdledOnce = false;
    }
    ngOnInit() {
        // there are some issues with maps in server side
        if (isPlatformBrowser(this.platformId)) {
            this.initMap();
        }
    }
    initMap() {
        this._el = this._elementRef.nativeElement;
        this._map = new google.maps.Map(this._el, this.mapOptions);
        // Workarround for init method: try to catch the first idle event after the map creation
        // (this._mapIdledOnce). The following idle events don't matter.
        const _ready_listener = this._map.addListener('idle', () => {
            console.log('mapReady - IDLE');
            if (!this._mapIdledOnce) {
                this.$mapReady.emit(this._map);
                this._mapIdledOnce = true;
                // Stop listening to event, the map is ready
                google.maps.event.removeListener(_ready_listener);
            }
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GoogleMapComponent.prototype, "mapOptions", void 0);
GoogleMapComponent = __decorate([
    Component({
        selector: 'app-google-map',
        template: ''
    }),
    __param(1, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [ElementRef, Object])
], GoogleMapComponent);
export { GoogleMapComponent };
