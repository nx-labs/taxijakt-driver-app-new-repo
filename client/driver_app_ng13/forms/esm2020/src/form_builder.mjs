/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from './form_providers';
import { AbstractControl } from './model/abstract_model';
import { FormArray } from './model/form_array';
import { FormControl } from './model/form_control';
import { FormGroup } from './model/form_group';
import * as i0 from "@angular/core";
function isAbstractControlOptions(options) {
    return !!options &&
        (options.asyncValidators !== undefined ||
            options.validators !== undefined ||
            options.updateOn !== undefined);
}
function isFormControlOptions(options) {
    return !!options &&
        (isAbstractControlOptions(options) ||
            options.initialValueIsDefault !== undefined);
}
// clang-format on
/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a
 * `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to
 * build complex forms.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * @publicApi
 */
export class FormBuilder {
    /**
     * @description
     * Construct a new `FormGroup` instance.
     *
     * @param controls A collection of child controls. The key for each child is the name
     * under which it is registered.
     *
     * @param options Configuration options object for the `FormGroup`. The object should have the
     * `AbstractControlOptions` type and might contain the following fields:
     * * `validators`: A synchronous validator function, or an array of validator functions.
     * * `asyncValidators`: A single async validator or array of async validator functions.
     * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
     * | submit').
     */
    group(controls, options = null) {
        const reducedControls = this._reduceControls(controls);
        let validators = null;
        let asyncValidators = null;
        let updateOn = undefined;
        if (options !== null) {
            if (isAbstractControlOptions(options)) {
                // `options` are `AbstractControlOptions`
                validators = options.validators != null ? options.validators : null;
                asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
                updateOn = options.updateOn != null ? options.updateOn : undefined;
            }
            else {
                // `options` are legacy form group options
                validators = options['validator'] != null ? options['validator'] : null;
                asyncValidators =
                    options['asyncValidator'] != null ? options['asyncValidator'] : null;
            }
        }
        // Cast to `any` because the inferred types are not as specific as Element.
        return new FormGroup(reducedControls, { asyncValidators, updateOn, validators });
    }
    /**
     * @description
     * Construct a new `FormControl` with the given state, validators and options. Set
     * `{initialValueIsDefault: true}` in the options to get a non-nullable control. Otherwise, the
     * control will be nullable.
     *
     * @param formState Initializes the control with an initial state value, or
     * with an object that contains both a value and a disabled status.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     *
     * @usageNotes
     *
     * ### Initialize a control as disabled
     *
     * The following example returns a control with an initial value in a disabled state.
     *
     * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
     * </code-example>
     */
    control(formState, validatorOrOpts, asyncValidator) {
        return new FormControl(formState, validatorOrOpts, asyncValidator);
    }
    /**
     * Constructs a new `FormArray` from the given array of configurations,
     * validators and options.
     *
     * @param controls An array of child controls or control configs. Each child control is given an
     *     index when it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of such functions, or an
     *     `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions.
     */
    array(controls, validatorOrOpts, asyncValidator) {
        const createdControls = controls.map(c => this._createControl(c));
        // Cast to `any` because the inferred types are not as specific as Element.
        return new FormArray(createdControls, validatorOrOpts, asyncValidator);
    }
    /** @internal */
    _reduceControls(controls) {
        const createdControls = {};
        Object.keys(controls).forEach(controlName => {
            createdControls[controlName] = this._createControl(controls[controlName]);
        });
        return createdControls;
    }
    /** @internal */
    _createControl(controls) {
        if (controls instanceof FormControl) {
            return controls;
        }
        else if (controls instanceof AbstractControl) { // A control; just return it
            return controls;
        }
        else if (Array.isArray(controls)) { // ControlConfig Tuple
            const value = controls[0];
            const validator = controls.length > 1 ? controls[1] : null;
            const asyncValidator = controls.length > 2 ? controls[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else { // T or FormControlState<T>
            return this.control(controls);
        }
    }
}
FormBuilder.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: FormBuilder, deps: [], target: i0.????FactoryTarget.Injectable });
FormBuilder.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: FormBuilder, providedIn: ReactiveFormsModule });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: FormBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: ReactiveFormsModule }]
        }] });
/**
 * UntypedFormBuilder is the same as @see FormBuilder, but it provides untyped controls.
 */
export class UntypedFormBuilder extends FormBuilder {
    group(controlsConfig, options = null) {
        return super.group(controlsConfig, options);
    }
    /**
     * @see FormBuilder#control
     */
    control(formState, validatorOrOpts, asyncValidator) {
        return super.control(formState, validatorOrOpts, asyncValidator);
    }
    /**
     * @see FormBuilder#array
     */
    array(controlsConfig, validatorOrOpts, asyncValidator) {
        return super.array(controlsConfig, validatorOrOpts, asyncValidator);
    }
}
UntypedFormBuilder.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: UntypedFormBuilder, deps: null, target: i0.????FactoryTarget.Injectable });
UntypedFormBuilder.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: UntypedFormBuilder, providedIn: ReactiveFormsModule });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: UntypedFormBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: ReactiveFormsModule }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybXMvc3JjL2Zvcm1fYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQW9DLE1BQU0sd0JBQXdCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFNBQVMsRUFBbUIsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUEyRCxNQUFNLHNCQUFzQixDQUFDO0FBQzNHLE9BQU8sRUFBQyxTQUFTLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7O0FBRS9ELFNBQVMsd0JBQXdCLENBQUMsT0FDUztJQUN6QyxPQUFPLENBQUMsQ0FBQyxPQUFPO1FBQ1osQ0FBRSxPQUFrQyxDQUFDLGVBQWUsS0FBSyxTQUFTO1lBQ2hFLE9BQWtDLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFDM0QsT0FBa0MsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsT0FDUztJQUNyQyxPQUFPLENBQUMsQ0FBQyxPQUFPO1FBQ1osQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUM7WUFDaEMsT0FBOEIsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBK0JELGtCQUFrQjtBQUVsQjs7Ozs7Ozs7Ozs7R0FXRztBQUVILE1BQU0sT0FBTyxXQUFXO0lBa0N0Qjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsS0FBSyxDQUFDLFFBQThCLEVBQUUsVUFDaUQsSUFBSTtRQUV6RixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FB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QkFEOUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvckZufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5pbXBvcnQge1JlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJy4vZm9ybV9wcm92aWRlcnMnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEFic3RyYWN0Q29udHJvbE9wdGlvbnMsIEZvcm1Ib29rc30gZnJvbSAnLi9tb2RlbC9hYnN0cmFjdF9tb2RlbCc7XG5pbXBvcnQge0Zvcm1BcnJheSwgVW50eXBlZEZvcm1BcnJheX0gZnJvbSAnLi9tb2RlbC9mb3JtX2FycmF5JztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIEZvcm1Db250cm9sT3B0aW9ucywgRm9ybUNvbnRyb2xTdGF0ZSwgVW50eXBlZEZvcm1Db250cm9sfSBmcm9tICcuL21vZGVsL2Zvcm1fY29udHJvbCc7XG5pbXBvcnQge0Zvcm1Hcm91cCwgVW50eXBlZEZvcm1Hcm91cH0gZnJvbSAnLi9tb2RlbC9mb3JtX2dyb3VwJztcblxuZnVuY3Rpb24gaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKG9wdGlvbnM6IEFic3RyYWN0Q29udHJvbE9wdGlvbnN8e1trZXk6IHN0cmluZ106IGFueX18bnVsbHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQpOiBvcHRpb25zIGlzIEFic3RyYWN0Q29udHJvbE9wdGlvbnMge1xuICByZXR1cm4gISFvcHRpb25zICYmXG4gICAgICAoKG9wdGlvbnMgYXMgQWJzdHJhY3RDb250cm9sT3B0aW9ucykuYXN5bmNWYWxpZGF0b3JzICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAob3B0aW9ucyBhcyBBYnN0cmFjdENvbnRyb2xPcHRpb25zKS52YWxpZGF0b3JzICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAob3B0aW9ucyBhcyBBYnN0cmFjdENvbnRyb2xPcHRpb25zKS51cGRhdGVPbiAhPT0gdW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gaXNGb3JtQ29udHJvbE9wdGlvbnMob3B0aW9uczogRm9ybUNvbnRyb2xPcHRpb25zfHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQpOiBvcHRpb25zIGlzIEZvcm1Db250cm9sT3B0aW9ucyB7XG4gIHJldHVybiAhIW9wdGlvbnMgJiZcbiAgICAgIChpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMob3B0aW9ucykgfHxcbiAgICAgICAob3B0aW9ucyBhcyBGb3JtQ29udHJvbE9wdGlvbnMpLmluaXRpYWxWYWx1ZUlzRGVmYXVsdCAhPT0gdW5kZWZpbmVkKTtcbn1cblxuLyoqXG4gKiBDb250cm9sQ29uZmlnPFQ+IGlzIGEgdHVwbGUgY29udGFpbmluZyBhIHZhbHVlIG9mIHR5cGUgVCwgcGx1cyBvcHRpb25hbCB2YWxpZGF0b3JzIGFuZCBhc3luY1xuICogdmFsaWRhdG9ycy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRyb2xDb25maWc8VD4gPSBbVHxGb3JtQ29udHJvbFN0YXRlPFQ+LCAoVmFsaWRhdG9yRm58KFZhbGlkYXRvckZuW10pKT8sIChBc3luY1ZhbGlkYXRvckZufEFzeW5jVmFsaWRhdG9yRm5bXSk/XTtcblxuLy8gRGlzYWJsZSBjbGFuZy1mb3JtYXQgdG8gcHJvZHVjZSBjbGVhcmVyIGZvcm1hdHRpbmcgZm9yIHRoZXNlIG11bHRpbGluZSB0eXBlcy5cbi8vIGNsYW5nLWZvcm1hdCBvZmZcblxuLyoqXG4gKiBGb3JtQnVpbGRlciBhY2NlcHRzIHZhbHVlcyBpbiB2YXJpb3VzIGNvbnRhaW5lciBzaGFwZXMsIGFzIHdlbGwgYXMgcmF3IHZhbHVlcy5cbiAqIEVsZW1lbnQgcmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgY29ycmVzcG9uZGluZyBtb2RlbCBjbGFzcy5cbiAqL1xuZXhwb3J0IHR5cGUgybVFbGVtZW50PFQ+ID1cbiAgVCBleHRlbmRzIEZvcm1Db250cm9sPGluZmVyIFU+ID8gRm9ybUNvbnRyb2w8VT4gOlxuICBUIGV4dGVuZHMgRm9ybUdyb3VwPGluZmVyIFU+ID8gRm9ybUdyb3VwPFU+IDpcbiAgVCBleHRlbmRzIEZvcm1BcnJheTxpbmZlciBVPiA/IEZvcm1BcnJheTxVPiA6XG4gIFQgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2w8aW5mZXIgVT4gPyBBYnN0cmFjdENvbnRyb2w8VT4gOlxuICBUIGV4dGVuZHMgRm9ybUNvbnRyb2xTdGF0ZTxpbmZlciBVPiA/IEZvcm1Db250cm9sPFV8bnVsbD4gOlxuICBUIGV4dGVuZHMgQ29udHJvbENvbmZpZzxpbmZlciBVPiA/IEZvcm1Db250cm9sPFV8bnVsbD4gOlxuICAvLyBDb250cm9sQ29uZmlnIGNhbiBiZSB0b28gbXVjaCBmb3IgdGhlIGNvbXBpbGVyIHRvIGluZmVyIGluIHRoZSB3cmFwcGVkIGNhc2UuIFRoaXMgaXNcbiAgLy8gbm90IHN1cnByaXNpbmcsIHNpbmNlIGl0J3MgcHJhY3RpY2FsbHkgZGVhdGgtYnktcG9seW1vcnBoaXNtIChlLmcuIHRoZSBvcHRpb25hbCB2YWxpZGF0b3JzXG4gIC8vIG1lbWJlcnMgdGhhdCBtaWdodCBiZSBhcnJheXMpLiBXYXRjaCBmb3IgQ29udHJvbENvbmZpZ3MgdGhhdCBtaWdodCBmYWxsIHRocm91Z2guXG4gIFQgZXh0ZW5kcyBBcnJheTxpbmZlciBVfFZhbGlkYXRvckZufFZhbGlkYXRvckZuW118QXN5bmNWYWxpZGF0b3JGbnxBc3luY1ZhbGlkYXRvckZuW10+ID8gRm9ybUNvbnRyb2w8VXxudWxsPiA6XG4gIC8vIEZhbGx0aG91Z2ggY2FzZTogVCBpcyBub3QgYSBjb250YWluZXIgdHlwZTsgdXNlIGlzIGRpcmVjdGx5IGFzIGEgdmFsdWUuXG4gIEZvcm1Db250cm9sPFR8bnVsbD47XG5cbi8vIGNsYW5nLWZvcm1hdCBvblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhbiBgQWJzdHJhY3RDb250cm9sYCBmcm9tIGEgdXNlci1zcGVjaWZpZWQgY29uZmlndXJhdGlvbi5cbiAqXG4gKiBUaGUgYEZvcm1CdWlsZGVyYCBwcm92aWRlcyBzeW50YWN0aWMgc3VnYXIgdGhhdCBzaG9ydGVucyBjcmVhdGluZyBpbnN0YW5jZXMgb2YgYVxuICogYEZvcm1Db250cm9sYCwgYEZvcm1Hcm91cGAsIG9yIGBGb3JtQXJyYXlgLiBJdCByZWR1Y2VzIHRoZSBhbW91bnQgb2YgYm9pbGVycGxhdGUgbmVlZGVkIHRvXG4gKiBidWlsZCBjb21wbGV4IGZvcm1zLlxuICpcbiAqIEBzZWUgW1JlYWN0aXZlIEZvcm1zIEd1aWRlXShndWlkZS9yZWFjdGl2ZS1mb3JtcylcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiBSZWFjdGl2ZUZvcm1zTW9kdWxlfSlcbmV4cG9ydCBjbGFzcyBGb3JtQnVpbGRlciB7XG4gIGdyb3VwPFQgZXh0ZW5kcyB7fT4oXG4gICAgICBjb250cm9sczogVCxcbiAgICAgIG9wdGlvbnM/OiBBYnN0cmFjdENvbnRyb2xPcHRpb25zfG51bGwsXG4gICAgICApOiBGb3JtR3JvdXA8e1tLIGluIGtleW9mIFRdOiDJtUVsZW1lbnQ8VFtLXT59PjtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIENvbnN0cnVjdCBhIG5ldyBgRm9ybUdyb3VwYCBpbnN0YW5jZS5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyBBUEkgaXMgbm90IHR5cGVzYWZlIGFuZCBjYW4gcmVzdWx0IGluIGlzc3VlcyB3aXRoIENsb3N1cmUgQ29tcGlsZXIgcmVuYW1pbmcuXG4gICAqIFVzZSB0aGUgYEZvcm1CdWlsZGVyI2dyb3VwYCBvdmVybG9hZCB3aXRoIGBBYnN0cmFjdENvbnRyb2xPcHRpb25zYCBpbnN0ZWFkLlxuICAgKiBOb3RlIHRoYXQgYEFic3RyYWN0Q29udHJvbE9wdGlvbnNgIGV4cGVjdHMgYHZhbGlkYXRvcnNgIGFuZCBgYXN5bmNWYWxpZGF0b3JzYCB0byBiZSB2YWxpZFxuICAgKiB2YWxpZGF0b3JzLiBJZiB5b3UgaGF2ZSBjdXN0b20gdmFsaWRhdG9ycywgbWFrZSBzdXJlIHRoZWlyIHZhbGlkYXRpb24gZnVuY3Rpb24gcGFyYW1ldGVyIGlzXG4gICAqIGBBYnN0cmFjdENvbnRyb2xgIGFuZCBub3QgYSBzdWItY2xhc3MsIHN1Y2ggYXMgYEZvcm1Hcm91cGAuIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGJlIGNhbGxlZFxuICAgKiB3aXRoIGFuIG9iamVjdCBvZiB0eXBlIGBBYnN0cmFjdENvbnRyb2xgIGFuZCB0aGF0IGNhbm5vdCBiZSBhdXRvbWF0aWNhbGx5IGRvd25jYXN0IHRvIGFcbiAgICogc3ViY2xhc3MsIHNvIFR5cGVTY3JpcHQgc2VlcyB0aGlzIGFzIGFuIGVycm9yLiBGb3IgZXhhbXBsZSwgY2hhbmdlIHRoZSBgKGdyb3VwOiBGb3JtR3JvdXApID0+XG4gICAqIFZhbGlkYXRpb25FcnJvcnN8bnVsbGAgc2lnbmF0dXJlIHRvIGJlIGAoZ3JvdXA6IEFic3RyYWN0Q29udHJvbCkgPT4gVmFsaWRhdGlvbkVycm9yc3xudWxsYC5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRyb2xzIEEgcmVjb3JkIG9mIGNoaWxkIGNvbnRyb2xzLiBUaGUga2V5IGZvciBlYWNoIGNoaWxkIGlzIHRoZSBuYW1lXG4gICAqIHVuZGVyIHdoaWNoIHRoZSBjb250cm9sIGlzIHJlZ2lzdGVyZWQuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBvYmplY3QgZm9yIHRoZSBgRm9ybUdyb3VwYC4gVGhlIGxlZ2FjeSBjb25maWd1cmF0aW9uXG4gICAqIG9iamVjdCBjb25zaXN0cyBvZjpcbiAgICogKiBgdmFsaWRhdG9yYDogQSBzeW5jaHJvbm91cyB2YWxpZGF0b3IgZnVuY3Rpb24sIG9yIGFuIGFycmF5IG9mIHZhbGlkYXRvciBmdW5jdGlvbnMuXG4gICAqICogYGFzeW5jVmFsaWRhdG9yYDogQSBzaW5nbGUgYXN5bmMgdmFsaWRhdG9yIG9yIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvciBmdW5jdGlvbnNcbiAgICogTm90ZTogdGhlIGxlZ2FjeSBmb3JtYXQgaXMgZGVwcmVjYXRlZCBhbmQgbWlnaHQgYmUgcmVtb3ZlZCBpbiBvbmUgb2YgdGhlIG5leHQgbWFqb3IgdmVyc2lvbnNcbiAgICogb2YgQW5ndWxhci5cbiAgICovXG4gIGdyb3VwKFxuICAgICAgY29udHJvbHM6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgb3B0aW9uczoge1trZXk6IHN0cmluZ106IGFueX0sXG4gICAgICApOiBGb3JtR3JvdXA7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYEZvcm1Hcm91cGAgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBjb250cm9scyBBIGNvbGxlY3Rpb24gb2YgY2hpbGQgY29udHJvbHMuIFRoZSBrZXkgZm9yIGVhY2ggY2hpbGQgaXMgdGhlIG5hbWVcbiAgICogdW5kZXIgd2hpY2ggaXQgaXMgcmVnaXN0ZXJlZC5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgQ29uZmlndXJhdGlvbiBvcHRpb25zIG9iamVjdCBmb3IgdGhlIGBGb3JtR3JvdXBgLiBUaGUgb2JqZWN0IHNob3VsZCBoYXZlIHRoZVxuICAgKiBgQWJzdHJhY3RDb250cm9sT3B0aW9uc2AgdHlwZSBhbmQgbWlnaHQgY29udGFpbiB0aGUgZm9sbG93aW5nIGZpZWxkczpcbiAgICogKiBgdmFsaWRhdG9yc2A6IEEgc3luY2hyb25vdXMgdmFsaWRhdG9yIGZ1bmN0aW9uLCBvciBhbiBhcnJheSBvZiB2YWxpZGF0b3IgZnVuY3Rpb25zLlxuICAgKiAqIGBhc3luY1ZhbGlkYXRvcnNgOiBBIHNpbmdsZSBhc3luYyB2YWxpZGF0b3Igb3IgYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9yIGZ1bmN0aW9ucy5cbiAgICogKiBgdXBkYXRlT25gOiBUaGUgZXZlbnQgdXBvbiB3aGljaCB0aGUgY29udHJvbCBzaG91bGQgYmUgdXBkYXRlZCAob3B0aW9uczogJ2NoYW5nZScgfCAnYmx1cidcbiAgICogfCBzdWJtaXQnKS5cbiAgICovXG4gIGdyb3VwKGNvbnRyb2xzOiB7W2tleTogc3RyaW5nXTogYW55fSwgb3B0aW9uczogQWJzdHJhY3RDb250cm9sT3B0aW9uc3x7W2tleTogc3RyaW5nXTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55fXxudWxsID0gbnVsbCk6XG4gICAgICBGb3JtR3JvdXAge1xuICAgIGNvbnN0IHJlZHVjZWRDb250cm9scyA9IHRoaXMuX3JlZHVjZUNvbnRyb2xzKGNvbnRyb2xzKTtcblxuICAgIGxldCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbnxWYWxpZGF0b3JGbltdfG51bGwgPSBudWxsO1xuICAgIGxldCBhc3luY1ZhbGlkYXRvcnM6IEFzeW5jVmFsaWRhdG9yRm58QXN5bmNWYWxpZGF0b3JGbltdfG51bGwgPSBudWxsO1xuICAgIGxldCB1cGRhdGVPbjogRm9ybUhvb2tzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIGlmIChvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICBpZiAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKG9wdGlvbnMpKSB7XG4gICAgICAgIC8vIGBvcHRpb25zYCBhcmUgYEFic3RyYWN0Q29udHJvbE9wdGlvbnNgXG4gICAgICAgIHZhbGlkYXRvcnMgPSBvcHRpb25zLnZhbGlkYXRvcnMgIT0gbnVsbCA/IG9wdGlvbnMudmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyA9IG9wdGlvbnMuYXN5bmNWYWxpZGF0b3JzICE9IG51bGwgPyBvcHRpb25zLmFzeW5jVmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIHVwZGF0ZU9uID0gb3B0aW9ucy51cGRhdGVPbiAhPSBudWxsID8gb3B0aW9ucy51cGRhdGVPbiA6IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGBvcHRpb25zYCBhcmUgbGVnYWN5IGZvcm0gZ3JvdXAgb3B0aW9uc1xuICAgICAgICB2YWxpZGF0b3JzID0gKG9wdGlvbnMgYXMgYW55KVsndmFsaWRhdG9yJ10gIT0gbnVsbCA/IChvcHRpb25zIGFzIGFueSlbJ3ZhbGlkYXRvciddIDogbnVsbDtcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzID1cbiAgICAgICAgICAgIChvcHRpb25zIGFzIGFueSlbJ2FzeW5jVmFsaWRhdG9yJ10gIT0gbnVsbCA/IChvcHRpb25zIGFzIGFueSlbJ2FzeW5jVmFsaWRhdG9yJ10gOiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhc3QgdG8gYGFueWAgYmVjYXVzZSB0aGUgaW5mZXJyZWQgdHlwZXMgYXJlIG5vdCBhcyBzcGVjaWZpYyBhcyBFbGVtZW50LlxuICAgIHJldHVybiBuZXcgRm9ybUdyb3VwKHJlZHVjZWRDb250cm9scywge2FzeW5jVmFsaWRhdG9ycywgdXBkYXRlT24sIHZhbGlkYXRvcnN9KSBhcyBhbnk7XG4gIH1cblxuICBjb250cm9sPFQ+KGZvcm1TdGF0ZTogVHxGb3JtQ29udHJvbFN0YXRlPFQ+LCBvcHRzOiBGb3JtQ29udHJvbE9wdGlvbnMme1xuICAgIGluaXRpYWxWYWx1ZUlzRGVmYXVsdDogdHJ1ZVxuICB9KTogRm9ybUNvbnRyb2w8VD47XG5cbiAgY29udHJvbDxUPihcbiAgICAgIGZvcm1TdGF0ZTogVHxGb3JtQ29udHJvbFN0YXRlPFQ+LFxuICAgICAgdmFsaWRhdG9yT3JPcHRzPzogVmFsaWRhdG9yRm58VmFsaWRhdG9yRm5bXXxGb3JtQ29udHJvbE9wdGlvbnN8bnVsbCxcbiAgICAgIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbnxBc3luY1ZhbGlkYXRvckZuW118bnVsbCk6IEZvcm1Db250cm9sPFR8bnVsbD47XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYEZvcm1Db250cm9sYCB3aXRoIHRoZSBnaXZlbiBzdGF0ZSwgdmFsaWRhdG9ycyBhbmQgb3B0aW9ucy4gU2V0XG4gICAqIGB7aW5pdGlhbFZhbHVlSXNEZWZhdWx0OiB0cnVlfWAgaW4gdGhlIG9wdGlvbnMgdG8gZ2V0IGEgbm9uLW51bGxhYmxlIGNvbnRyb2wuIE90aGVyd2lzZSwgdGhlXG4gICAqIGNvbnRyb2wgd2lsbCBiZSBudWxsYWJsZS5cbiAgICpcbiAgICogQHBhcmFtIGZvcm1TdGF0ZSBJbml0aWFsaXplcyB0aGUgY29udHJvbCB3aXRoIGFuIGluaXRpYWwgc3RhdGUgdmFsdWUsIG9yXG4gICAqIHdpdGggYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYm90aCBhIHZhbHVlIGFuZCBhIGRpc2FibGVkIHN0YXR1cy5cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvck9yT3B0cyBBIHN5bmNocm9ub3VzIHZhbGlkYXRvciBmdW5jdGlvbiwgb3IgYW4gYXJyYXkgb2ZcbiAgICogc3VjaCBmdW5jdGlvbnMsIG9yIGEgYEZvcm1Db250cm9sT3B0aW9uc2Agb2JqZWN0IHRoYXQgY29udGFpbnNcbiAgICogdmFsaWRhdGlvbiBmdW5jdGlvbnMgYW5kIGEgdmFsaWRhdGlvbiB0cmlnZ2VyLlxuICAgKlxuICAgKiBAcGFyYW0gYXN5bmNWYWxpZGF0b3IgQSBzaW5nbGUgYXN5bmMgdmFsaWRhdG9yIG9yIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvclxuICAgKiBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqICMjIyBJbml0aWFsaXplIGEgY29udHJvbCBhcyBkaXNhYmxlZFxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgcmV0dXJucyBhIGNvbnRyb2wgd2l0aCBhbiBpbml0aWFsIHZhbHVlIGluIGEgZGlzYWJsZWQgc3RhdGUuXG4gICAqXG4gICAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImZvcm1zL3RzL2Zvcm1CdWlsZGVyL2Zvcm1fYnVpbGRlcl9leGFtcGxlLnRzXCIgcmVnaW9uPVwiZGlzYWJsZWQtY29udHJvbFwiPlxuICAgKiA8L2NvZGUtZXhhbXBsZT5cbiAgICovXG4gIGNvbnRyb2w8VD4oXG4gICAgICBmb3JtU3RhdGU6IFR8Rm9ybUNvbnRyb2xTdGF0ZTxUPixcbiAgICAgIHZhbGlkYXRvck9yT3B0cz86IFZhbGlkYXRvckZufFZhbGlkYXRvckZuW118Rm9ybUNvbnRyb2xPcHRpb25zfG51bGwsXG4gICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm58QXN5bmNWYWxpZGF0b3JGbltdfG51bGwpOiBGb3JtQ29udHJvbCB7XG4gICAgcmV0dXJuIG5ldyBGb3JtQ29udHJvbChmb3JtU3RhdGUsIHZhbGlkYXRvck9yT3B0cywgYXN5bmNWYWxpZGF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgYEZvcm1BcnJheWAgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkgb2YgY29uZmlndXJhdGlvbnMsXG4gICAqIHZhbGlkYXRvcnMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBjb250cm9scyBBbiBhcnJheSBvZiBjaGlsZCBjb250cm9scyBvciBjb250cm9sIGNvbmZpZ3MuIEVhY2ggY2hpbGQgY29udHJvbCBpcyBnaXZlbiBhblxuICAgKiAgICAgaW5kZXggd2hlbiBpdCBpcyByZWdpc3RlcmVkLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9yT3JPcHRzIEEgc3luY2hyb25vdXMgdmFsaWRhdG9yIGZ1bmN0aW9uLCBvciBhbiBhcnJheSBvZiBzdWNoIGZ1bmN0aW9ucywgb3IgYW5cbiAgICogICAgIGBBYnN0cmFjdENvbnRyb2xPcHRpb25zYCBvYmplY3QgdGhhdCBjb250YWluc1xuICAgKiB2YWxpZGF0aW9uIGZ1bmN0aW9ucyBhbmQgYSB2YWxpZGF0aW9uIHRyaWdnZXIuXG4gICAqXG4gICAqIEBwYXJhbSBhc3luY1ZhbGlkYXRvciBBIHNpbmdsZSBhc3luYyB2YWxpZGF0b3Igb3IgYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9yIGZ1bmN0aW9ucy5cbiAgICovXG4gIGFycmF5PFQ+KFxuICAgICAgY29udHJvbHM6IEFycmF5PFQ+LCB2YWxpZGF0b3JPck9wdHM/OiBWYWxpZGF0b3JGbnxWYWxpZGF0b3JGbltdfEFic3RyYWN0Q29udHJvbE9wdGlvbnN8bnVsbCxcbiAgICAgIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbnxBc3luY1ZhbGlkYXRvckZuW118bnVsbCk6IEZvcm1BcnJheTzJtUVsZW1lbnQ8VD4+IHtcbiAgICBjb25zdCBjcmVhdGVkQ29udHJvbHMgPSBjb250cm9scy5tYXAoYyA9PiB0aGlzLl9jcmVhdGVDb250cm9sKGMpKTtcbiAgICAvLyBDYXN0IHRvIGBhbnlgIGJlY2F1c2UgdGhlIGluZmVycmVkIHR5cGVzIGFyZSBub3QgYXMgc3BlY2lmaWMgYXMgRWxlbWVudC5cbiAgICByZXR1cm4gbmV3IEZvcm1BcnJheShjcmVhdGVkQ29udHJvbHMsIHZhbGlkYXRvck9yT3B0cywgYXN5bmNWYWxpZGF0b3IpIGFzIGFueTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZHVjZUNvbnRyb2xzPFQ+KGNvbnRyb2xzOlxuICAgICAgICAgICAgICAgICAgICAgICAgIHtbazogc3RyaW5nXTogVHxDb250cm9sQ29uZmlnPFQ+fEZvcm1Db250cm9sU3RhdGU8VD58QWJzdHJhY3RDb250cm9sPFQ+fSk6XG4gICAgICB7W2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sfSB7XG4gICAgY29uc3QgY3JlYXRlZENvbnRyb2xzOiB7W2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sfSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGNvbnRyb2xzKS5mb3JFYWNoKGNvbnRyb2xOYW1lID0+IHtcbiAgICAgIGNyZWF0ZWRDb250cm9sc1tjb250cm9sTmFtZV0gPSB0aGlzLl9jcmVhdGVDb250cm9sKGNvbnRyb2xzW2NvbnRyb2xOYW1lXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNyZWF0ZWRDb250cm9scztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUNvbnRyb2w8VD4oY29udHJvbHM6IFR8Rm9ybUNvbnRyb2xTdGF0ZTxUPnxDb250cm9sQ29uZmlnPFQ+fEZvcm1Db250cm9sPFQ+fFxuICAgICAgICAgICAgICAgICAgICBBYnN0cmFjdENvbnRyb2w8VD4pOiBGb3JtQ29udHJvbDxUPnxGb3JtQ29udHJvbDxUfG51bGw+fEFic3RyYWN0Q29udHJvbDxUPiB7XG4gICAgaWYgKGNvbnRyb2xzIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgIHJldHVybiBjb250cm9scyBhcyBGb3JtQ29udHJvbDxUPjtcbiAgICB9IGVsc2UgaWYgKGNvbnRyb2xzIGluc3RhbmNlb2YgQWJzdHJhY3RDb250cm9sKSB7ICAvLyBBIGNvbnRyb2w7IGp1c3QgcmV0dXJuIGl0XG4gICAgICByZXR1cm4gY29udHJvbHM7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xzKSkgeyAgLy8gQ29udHJvbENvbmZpZyBUdXBsZVxuICAgICAgY29uc3QgdmFsdWU6IFR8Rm9ybUNvbnRyb2xTdGF0ZTxUPiA9IGNvbnRyb2xzWzBdO1xuICAgICAgY29uc3QgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbnxWYWxpZGF0b3JGbltdfG51bGwgPSBjb250cm9scy5sZW5ndGggPiAxID8gY29udHJvbHNbMV0hIDogbnVsbDtcbiAgICAgIGNvbnN0IGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZufEFzeW5jVmFsaWRhdG9yRm5bXXxudWxsID1cbiAgICAgICAgICBjb250cm9scy5sZW5ndGggPiAyID8gY29udHJvbHNbMl0hIDogbnVsbDtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w8VD4odmFsdWUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIH0gZWxzZSB7ICAvLyBUIG9yIEZvcm1Db250cm9sU3RhdGU8VD5cbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2w8VD4oY29udHJvbHMpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFVudHlwZWRGb3JtQnVpbGRlciBpcyB0aGUgc2FtZSBhcyBAc2VlIEZvcm1CdWlsZGVyLCBidXQgaXQgcHJvdmlkZXMgdW50eXBlZCBjb250cm9scy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46IFJlYWN0aXZlRm9ybXNNb2R1bGV9KVxuZXhwb3J0IGNsYXNzIFVudHlwZWRGb3JtQnVpbGRlciBleHRlbmRzIEZvcm1CdWlsZGVyIHtcbiAgLyoqXG4gICAqIEBzZWUgRm9ybUJ1aWxkZXIjZ3JvdXBcbiAgICovXG4gIG92ZXJyaWRlIGdyb3VwKFxuICAgICAgY29udHJvbHNDb25maWc6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgb3B0aW9ucz86IEFic3RyYWN0Q29udHJvbE9wdGlvbnN8bnVsbCxcbiAgICAgICk6IFVudHlwZWRGb3JtR3JvdXA7XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgQVBJIGlzIG5vdCB0eXBlc2FmZSBhbmQgY2FuIHJlc3VsdCBpbiBpc3N1ZXMgd2l0aCBDbG9zdXJlIENvbXBpbGVyIHJlbmFtaW5nLlxuICAgKiBVc2UgdGhlIGBGb3JtQnVpbGRlciNncm91cGAgb3ZlcmxvYWQgd2l0aCBgQWJzdHJhY3RDb250cm9sT3B0aW9uc2AgaW5zdGVhZC5cbiAgICovXG4gIG92ZXJyaWRlIGdyb3VwKFxuICAgICAgY29udHJvbHNDb25maWc6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgb3B0aW9uczoge1trZXk6IHN0cmluZ106IGFueX0sXG4gICAgICApOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIG92ZXJyaWRlIGdyb3VwKFxuICAgICAgY29udHJvbHNDb25maWc6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgICAgb3B0aW9uczogQWJzdHJhY3RDb250cm9sT3B0aW9uc3x7W2tleTogc3RyaW5nXTogYW55fXxudWxsID0gbnVsbCk6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIHJldHVybiBzdXBlci5ncm91cChjb250cm9sc0NvbmZpZywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQHNlZSBGb3JtQnVpbGRlciNjb250cm9sXG4gICAqL1xuICBvdmVycmlkZSBjb250cm9sKFxuICAgICAgZm9ybVN0YXRlOiBhbnksIHZhbGlkYXRvck9yT3B0cz86IFZhbGlkYXRvckZufFZhbGlkYXRvckZuW118Rm9ybUNvbnRyb2xPcHRpb25zfG51bGwsXG4gICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm58QXN5bmNWYWxpZGF0b3JGbltdfG51bGwpOiBVbnR5cGVkRm9ybUNvbnRyb2wge1xuICAgIHJldHVybiBzdXBlci5jb250cm9sKGZvcm1TdGF0ZSwgdmFsaWRhdG9yT3JPcHRzLCBhc3luY1ZhbGlkYXRvcik7XG4gIH1cblxuICAvKipcbiAgICogQHNlZSBGb3JtQnVpbGRlciNhcnJheVxuICAgKi9cbiAgb3ZlcnJpZGUgYXJyYXkoXG4gICAgICBjb250cm9sc0NvbmZpZzogYW55W10sXG4gICAgICB2YWxpZGF0b3JPck9wdHM/OiBWYWxpZGF0b3JGbnxWYWxpZGF0b3JGbltdfEFic3RyYWN0Q29udHJvbE9wdGlvbnN8bnVsbCxcbiAgICAgIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbnxBc3luY1ZhbGlkYXRvckZuW118bnVsbCk6IFVudHlwZWRGb3JtQXJyYXkge1xuICAgIHJldHVybiBzdXBlci5hcnJheShjb250cm9sc0NvbmZpZywgdmFsaWRhdG9yT3JPcHRzLCBhc3luY1ZhbGlkYXRvcik7XG4gIH1cbn1cbiJdfQ==