import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertOptions } from '../models/alert/enums';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear,
};

export const AlertType = {
    Success: 'success',
    Error: 'error',
    Info: 'info',
    Warning: 'warning',
};

function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter((x: any) => x && x.id === id));
}

function success(message: string, options?: AlertOptions) {
    alert({ ...options, type: AlertType.Success, message });
}

function error(message: string, options?: AlertOptions) {
    alert({ ...options, type: AlertType.Error, message });
}

function info(message: string, options?: AlertOptions) {
    alert({ ...options, type: AlertType.Info, message });
}

function warn(message: string, options?: AlertOptions) {
    alert({ ...options, type: AlertType.Warning, message });
}

function alert(alert: any) {
    alert.id = alert.id || defaultId;
    alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
    if (alertSubject) {
        alertSubject.next(alert);
    }
}

function clear(id = defaultId) {
    alertSubject.next({ id });
}
