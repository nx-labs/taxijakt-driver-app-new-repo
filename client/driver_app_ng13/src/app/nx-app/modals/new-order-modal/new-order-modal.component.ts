/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ViewChild }              from "@angular/core";
import { AfterViewInit }          from "@angular/core";
import { Input }                  from "@angular/core";
import { Component, OnInit }      from '@angular/core';
import { GoogleMapComponent }     from "@components/google-map/google-map.component";
import { SocketService }          from "@core/services/socket.service";
import { AlertController }        from "@ionic/angular";
import { LoadingController }      from "@ionic/angular";
import { ModalController }        from "@ionic/angular";
import { DriverApiService }       from "@api/driver-api.service";
import { OrderApiService }        from "@api/order-api.service";
import { NxAppManagerService }    from "@nxApp/nx-app-manager.service";
import { IBooking }               from "@nxApp/services/booking/booking-entry.type";
import { IBookingEntry }          from "@nxApp/services/booking/booking-entry.type";
import { DriverService }          from "@nxApp/services/driver/driver.service";
import { IOrderCompleteResponse } from "@shared/types/order-complete-response";
import { IMessage }               from "@shared/messages/message-types";
import { MsgType }                from "../../../shared/messages/message-types";
import { ModalDataType }          from "../modal-data.type";

@Component(
	{
		selector   : 'app-new-order-modal',
		templateUrl: './new-order-modal.component.html',
		styleUrls  : [ './new-order-modal.component.scss' ],
	})
export class NewOrderModalComponent implements OnInit, AfterViewInit {
	@Input() data2: ModalDataType;

	header: string;
	data: IBooking;
	customerInCar: boolean = false;
	isActive: boolean;

	orderId: string;
	orderCompleted: IOrderCompleteResponse = null;

	constructor(
		private loadingController: LoadingController,
		private socketService: SocketService,
		private modalController: ModalController,
		private orderApi: OrderApiService,
		private driverApi: DriverApiService,
		private driverService: DriverService,
		private appManagerService: NxAppManagerService,
		private alertController: AlertController
	) {
		if (this.data?.orderData?.id) {
			appManagerService.muteOrder(this.data.orderData.id);
			driverService.orderActive = true;
		}
	}

	@ViewChild(GoogleMapComponent, { static: false }) _GoogleMap: GoogleMapComponent;
	map: google.maps.Map;

	mapOptions: google.maps.MapOptions = {
		zoom  : 15,
		center: { lat: -34.9199842, lng: -56.149849 }
		// uncomment the following line if you want to remove the default Map controls
		// disableDefaultUI: true
	};
	loadingElement: any;

	ngOnInit() {
		this.isActive      = this.data.active;
		this.orderId       = this.data.orderData.id;
		this.customerInCar = this.data.orderData.customer_in_car;

		console.log("Data received in ModalDataaType :::", this.data2);
		console.log("Data received :: header :::", this.header);
		console.log("Data received :: ModalDataaType :::", this.data);
	}

	ngAfterViewInit() {
		// GoogleMapComponent should be available
		this._GoogleMap.$mapReady.subscribe(map => {
			this.map = map;
			console.log('ngAfterViewInit - Google map ready');
		});
		this.createLoader();
	}

	async createLoader(text: string = "Loading...") {
		this.loadingElement = await this.loadingController.create(
			{
				message: text
			});
	}

	async presentLoader() {
		await this.loadingElement.present();
	}

	async dismissLoader() {
		if (this.loadingElement) {
			await this.loadingElement.dismiss();
		}
	}

	public geolocateMe(): void {
		/*this.presentLoader();
		 Geolocation.getCurrentPosition().then(position => {

		 const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		 this.map.panTo(current_location);

		 // add a marker
		 const marker = new google.maps.Marker({
		 position: current_location,
		 title   : 'You are here!',
		 // animation: google.maps.Animation.DROP
		 });

		 // To add the marker to the map, call setMap();
		 marker.setMap(this.map);

		 }).catch((error) => {
		 console.log('Error getting current location', error);

		 }).finally(() => this.dismissLoader());
		 */
	}

	public test() {
		let testObj = {
			"type": 9,
			"uuid": "d011a979-60ca-446d-bcf3-10a1a2e136d4",
			"data": {
				"success": true,
				"data"   : {
					"order": {
						"id"                                    : "2172751",
						"created"                               : "2022-05-10 14:31:56",
						"dispatch_time"                         : "2022-05-10 14:31:56",
						"cancelled"                             : null,
						"confirmed"                             : "2022-05-10 14:32:20",
						"finished"                              : null,
						"pickup_time"                           : "2022-05-10 14:31:56",
						"estimated_pickup_time"                 : null,
						"taxi_at_from_address"                  : null,
						"taxi_at_from_address_min_distance"     : null,
						"taxi_at_from_address_min_distance_time": null,
						"taxi_at_to_address"                    : null,
						"taxi_at_to_address_min_distance"       : null,
						"taxi_at_to_address_min_distance_time"  : null,
						"from_address"                          : "Gültzauuddens Badplats, Repslagargatan, Luleå",
						"from_zipcode"                          : "97239",
						"from_name"                             : "Gültzauuddens Badplats, Repslagargatan",
						"from_formatted"                        : "Gültzauuddens Badplats, Repslagargatan, Luleå",
						"from_area"                             : "Luleå C",
						"from_lat"                              : "65.587352",
						"from_lng"                              : "22.125006",
						"from_is_establishment"                 : "1",
						"to_address"                            : "Norrbottensteatern, Luleå",
						"to_zipcode"                            : "97239",
						"to_name"                               : "Norrbottensteatern",
						"to_formatted"                          : "Norrbottensteatern, Luleå",
						"to_area"                               : "Luleå C",
						"to_lat"                                : "65.58500599999999",
						"to_lng"                                : "22.142910999999998",
						"via_addresses"                         : null,
						"via_positions"                         : null,
						"route"                                 : "[{\"address\":\"G\\u00fcltzauuddens Badplats\",\"lat\":\"65.587352\",\"lng\":\"22.125006\",\"city\":\"Lule\\u00e5\"},{\"address\":\"Norrbottensteatern\",\"lat\":\"65.58500599999999\",\"lng\":\"22.142910999999998\",\"city\":\"Lule\\u00e5\"}]",
						"distance"                              : "825",
						"duration"                              : "186",
						"currency"                              : "SEK",
						"price"                                 : "128",
						"price_net"                             : "120.75",
						"price_vat"                             : "7.25",
						"taxameter_price"                       : null,
						"prepaid"                               : null,
						"prepaid_voucher"                       : null,
						"prepaid_reduction"                     : null,
						"prepaid_card"                          : null,
						"prepaid_card_net"                      : null,
						"prepaid_card_vat"                      : null,
						"prepaid_invoice"                       : null,
						"prepaid_vat"                           : null,
						"flight_no"                             : null,
						"wave_session_id"                       : "13477953",
						"customer_id"                           : null,
						"customer_name"                         : "qwdqwd yu",
						"customer_phone"                        : "+46708633007",
						"customer_email"                        : "dsfg@oij.se",
						"customer_lat"                          : "59.3438896",
						"customer_lng"                          : "18.0531736",
						"target_driver_id"                      : null,
						"driver_id"                             : "2673",
						"driver_company"                        : "test",
						"driver_car_registration_number"        : "TAXI01",
						"driver_name"                           : "Kierowca",
						"driver_phone"                          : "+48888777657",
						"driver_email"                          : null,
						"driver_popup_message"                  : "Ny körning!\n\nFrån: Gültzauuddens Badplats, Repslagargatan, Luleå\n\nTill: Norrbottensteatern, Luleå\n\nSträcka: 0.8 km\n\nFast pris: 128 kr\n\nKunden: qwdqwd yu | +46708633007",
						"ip_address"                            : "35.156.42.228",
						"user_agent"                            : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
						"http_referer"                          : "http://dev.taxijakt.se/",
						"order_page_url"                        : "http://dev.taxijakt.se/",
						"customer_did_not_show_up"              : null,
						"driver_did_not_show_up"                : null,
						"admin_notified"                        : null,
						"admin_confirmed"                       : null,
						"handled_by_admin"                      : null,
						"admin_user_id"                         : null,
						"super_admin_notified"                  : null,
						"test"                                  : "0",
						"validated"                             : "1",
						"suspect"                               : "0",
						"resent"                                : null,
						"resent_by_customer"                    : null,
						"resent_by_customer_wait"               : null,
						"target_taxi_company_id"                : null,
						"taxi_company_id"                       : null,
						"jackpot"                               : null,
						"carrier_id"                            : "1787",
						"carrier_name"                          : "Test",
						"invoice_id"                            : null,
						"carrier_fee"                           : null,
						"carrier_compensation"                  : null,
						"delivery_type"                         : "PASSENGER",
						"urgent"                                : null,
						"urgent_distance"                       : null,
						"duplicate_of_order_id"                 : null,
						"app_version"                           : "4.19",
						"mode"                                  : null,
						"country_code"                          : "SE",
						"locale"                                : "en",
						"admin_id"                              : null,
						"closed"                                : null,
						"company_id"                            : null,
						"device_id"                             : null,
						"number_of_passengers"                  : null,
						"number_of_luggages"                    : null,
						"ref"                                   : null,
						"accept_sms_id"                         : null,
						"baby_seats"                            : null,
						"child_seats"                           : null,
						"booster_seats"                         : null,
						"animals_in_cage"                       : null,
						"animals_without_cage"                  : null,
						"combi"                                 : null,
						"left_to_pay"                           : null,
						"payica_transaction_id"                 : null,
						"payica_card_id"                        : null,
						"secret"                                : "8C7079",
						"domain"                                : "dev.taxijakt.se",
						"signup_min_points"                     : "0",
						"points"                                : "73.6",
						"dialed_phone"                          : null,
						"partner_id"                            : null,
						"partner_reference_no"                  : null,
						"query_id"                              : "76593",
						"message_to_driver"                     : null,
						"admin_note_id"                         : null,
						"accept_id"                             : null,
						"success_id"                            : null,
						"taxi_company_customer_id"              : null,
						"taxi_company_customer_no"              : null,
						"allow_forwarding"                      : null,
						"vehicle_id"                            : "12630",
						"rate_sms_id"                           : null,
						"status"                                : null,
						"is_phone_order"                        : "0",
						"customer_in_car"                       : null,
						"should_be_watched"                     : "1",
						"is_cancelled"                          : "0",
						"is_confirmed"                          : "1",
						"is_finished"                           : "0"
					}
				},
				"headers": {
					"date"                            : "Tue, 10 May 2022 12:32:21 GMT",
					"content-type"                    : "text/html; charset=UTF-8",
					"content-length"                  : "1486",
					"connection"                      : "keep-alive",
					"server"                          : "Apache/2.4.37 (Unix) OpenSSL/1.1.0j",
					"x-powered-by"                    : "PHP/7.1.23",
					"access-control-allow-origin"     : "https://dev.taxijakt.se",
					"access-control-allow-credentials": "true",
					"access-control-allow-headers"    : "Authorization,Content-Type,Accept,Accept-Language,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since",
					"access-control-allow-methods"    : "PUT, GET, POST, DELETE, OPTIONS",
					"vary"                            : "Accept-Encoding,Origin",
					"cache-control"                   : "max-age=0, no-store"
				}
			},
			"tag" : "9378d721-5b0f-4efc-8274-3c44751c0369"
		}

		this.socketService.fake(MsgType.AcceptOrder, testObj);

	}

	public accept(): void {
		this.orderApi.acceptOrder(this.data.orderData.id).subscribe(
			val => {
				console.log("ORDER API :::", val);
			}
		);

		this.isActive = true;

		/*toPromise().then(res => {
		 console.log("ACCEPT ORDER RESULT ::", res);
		 }).catch(err => {
		 console.log("ACCEPT ORDER ERR ::", err);
		 });*/
//		this.dismiss();
	}

	public setCustomerInCar() {
		this.data.orderData.customer_in_car = true;
		this.customerInCar                  = true;
	}

	async doFinishRide() {
		await this.createLoader("Finishing ride...");
		await this.presentLoader();

		await this.orderApi.completeOrder(this.orderId).subscribe(
			(msg: IMessage) => {
				let response: IOrderCompleteResponse = msg.data;

				if (response && response.status === "OK") {
					this.dismissLoader();
					this.orderCompleted = response;
				}
			}
		);
	}

	public finishRide() {
		this.alertController.create(
			{
				header   : 'Confirm Alert',
				subHeader: 'Beware lets confirm',
				message  : 'Are you sure? you want to leave without safty mask?',
				buttons  : [
					{
						text   : 'Yes',
						handler: () => {
							this.doFinishRide();
						}
					},
					{
						text   : 'No',
						handler: () => {
							console.log('Let me think');
						}
					}
				]
			}).then(res => {
			res.present();
		});
	}

	public async deny(): Promise<void> {
		alert("ORDER ID #" + this.data.orderData.id);

		await this.createLoader("Processing...");
		await this.presentLoader();

		this.orderApi.denyOrder(this.data.orderData.id).subscribe(
			(msg: IMessage) => {
				this.dismissLoader();
				this.dismiss();
			}
		);
	}

	public dismiss(data?: any) {
		data = !data ? this.data : data;
		this.modalController.dismiss(
			{data: data }).then(() => {
			this.driverService.orderActive = false;
		});
	}
}
