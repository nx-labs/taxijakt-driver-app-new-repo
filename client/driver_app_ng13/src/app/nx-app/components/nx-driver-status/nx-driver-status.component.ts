/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { EventEmitter, Output } from "@angular/core";
import { Input }                from "@angular/core";
import { Component, OnInit }    from '@angular/core';
import { DriverStatusType }     from "@shared/driver/driver-status";
import { VarUtils }             from "@shared/utils/var.utils";
import { pipe }                 from "rxjs";
import { Subject }              from "rxjs";
import { ICmStatusCallback }    from "../../../coldmind/components/cm-messenger-status/cm-status-callback";

export interface IDriverStatusStorage {

	add(statusType: DriverStatusType, strVal?: string): any;

	/**
	 * You guessed it
	 * @returns {boolean}
	 */
	has(): boolean;



	/**
	 * You guessed it
	 * @returns {boolean}
	 */
	isEmpty(): boolean;
}

export class DriverStatusStorageBase extends Map<string, DriverStatusType> implements IDriverStatusStorage {
	/**
	 * Add new Status type
	 * @param {DriverStatusType} statusType
	 * @param {string} strVal
	 * @returns {any}
	 */
	public set(statusType: DriverStatusType): string | any {
		return this.add(DriverStatusType[statusType]);
	}

	public add(strVal: any): any {
		let val2 = !VarUtils.isEmpty(strVal) ? strVal : DriverStatusType[DriverStatusType.Unset];
		return DriverStatusType[this.setVal(val2)];
	}

	public setVal(strVal: string): string | any {
		let statusType = DriverStatusType[strVal];
		return this.set(statusType);
	}

	public has(strVal?: string): boolean {
		return this.get(strVal) !== null;
	}

	/**
	 * You guessed it
	 * @returns {boolean}
	 */
	public isEmpty(): boolean {
		return this.size < 1;
	}
}

export class DriverStatusStorage extends DriverStatusStorageBase implements IDriverStatusStorage {}

export enum NxButtonType {
	Custom,
	SetBusy,
	DropDown
}

@Component(
	{
		selector   : 'nx-driver-status',
		templateUrl: 'nx-driver-status.component.html',
		styleUrls  : [ 'nx-driver-status.component.scss' ],
	})
export class NxDriverStatusComponent implements OnInit {
	public initEvent = new EventEmitter();
	/*
	public selector: string | any;
	public templateUrl: string | any;
	public styleUrls: string[] | any;
*/

	@Input() public button: NxButtonType;

	private statusEventStream = new Subject<ICmStatusCallback | any>().pipe((event: ICmStatusCallback | any) => {
		return event;
	});

	@Output() beforeStatusChange = this.statusEventStream.subscribe(
		pipe((event: ICmStatusCallback) => {
			let doCancel = !event.cancel;

			if (!doCancel || !this.beforeStatusChange.closed) {
				return event.type
			}
		})
	);

	// This sucker is triggered when a server confirmation have beem reveived
	@Output() statusDidChange = new EventEmitter<DriverStatusType>();

	ngOnInit(): void {
		this.initEvent.emit(this);
	}

	triggerStatusChange(value?: DriverStatusType) {
		this.statusDidChange.emit(value);
	}

	protected _choosableStatuses?: DriverStatusStorage | any;

	public set buttonType(value: NxButtonType) {
		let storage: DriverStatusStorage = this._choosableStatuses;
		if (value === NxButtonType.DropDown && ( !storage || storage?.isEmpty() )) {

		}
		else if (storage && !storage.isEmpty()) {
			this.button = value;

		}
	}

	public set statuses(storage: any) {
		if (!storage) {
			storage = new DriverStatusStorage();
		}

		this._choosableStatuses = storage;
	}

	public get statuses()
		:
		DriverStatusStorage | any {
		return this._choosableStatuses;
	}

	public onClick(): void {

	}
}

/*
export class NxDriverStatus implements Component {
}


export class NxDriverStatus implements ComponentDecorator{

	public set statusButton(val: ButtonType) {
		this.button = val;
	}
	public get statusButton(): ButtonType {
		return this.button | ButtonType.SetBusy;
	}
}
 */
