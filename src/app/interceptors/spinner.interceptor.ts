import { HttpInterceptorFn } from "@angular/common/http";
import { SpinnerService } from "../services/spinner.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";

export const SpinnerInterceptor : HttpInterceptorFn = (req, next) => {
    const spinnerService = inject(SpinnerService);
    if(req.url.includes("/auth")) spinnerService.showSpinAuth();
    if(req.url.includes("/plant/all") ) spinnerService.showSpinTable();
    if(req.url.includes("/plant/delete") ) spinnerService.showSpinDelete();
    if(req.url.includes("/plant/edit") ) spinnerService.showSpinEdit();
    if(req.url.includes("/plant/add") ) spinnerService.showSpinAdd();
    return next(req).pipe(
        finalize(() => {
            spinnerService.hideSpinAuth();
            spinnerService.hideSpinTable();
            spinnerService.hideSpinDelete();
            spinnerService.hideSpinEdit();
            spinnerService.hideSpinAdd();

        })
    )
}