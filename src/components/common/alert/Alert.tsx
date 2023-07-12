import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { AlertContainer } from './Alert.styles';
import { alertService } from '../../../services';

interface Props {
    id?: string;
    fade?: boolean;
}

const AlertDialog: React.FC<Props> = ({ id = 'default-alert', fade = true }) => {
    const [alerts, setAlerts] = useState(Array<any>());

    useEffect(() => {
        const subscription = alertService.onAlert(id).subscribe((alert: any) => {
            if (!alert.message) {
                setAlerts((alerts) => {
                    const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

                    filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
                    return filteredAlerts;
                });
            } else {
                setAlerts((alerts) => [...alerts, alert]);

                if (alert.autoClose) {
                    setTimeout(() => removeAlert(alert), 5000);
                }
            }
        });
        // const historyUnlisten = history?.listen(({ pathname }) => {
        //     if (pathname.endsWith('/')) return;

        //     alertService.clear(id);
        // });

        return () => {
            subscription.unsubscribe();
            // historyUnlisten();
        };
    }, []);

    const removeAlert = (alert: any) => {
        if (fade) {
            const alertWithFade = { ...alert, fade: true };
            setAlerts((alerts) => alerts.map((x) => (x === alert ? alertWithFade : x)));

            setTimeout(() => {
                setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
            }, 250);
        } else {
            setAlerts((alerts) => alerts.filter((x) => x !== alert));
        }
    };

    if (!alerts.length) return null;
    return (
        <AlertContainer className='fucker'>
            {alerts.map((alert, index) => (
                <Alert
                    key={index}
                    message={alert.message}
                    type={alert.type}
                    closable
                    className={alert.fixed ? 'fixed' : ''}
                />
            ))}
        </AlertContainer>
    );
};

export default AlertDialog;
