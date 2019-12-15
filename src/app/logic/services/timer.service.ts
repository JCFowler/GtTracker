import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalHelper } from '../helpers';

@Injectable({providedIn: 'root'})
export class TimerService {

    public time = new BehaviorSubject<string>('00:00:00');

    private intervalId: number;

    constructor() { }

    startTimer(startTime: Date) {
        this.stopTimer();
        this.intervalId = setInterval(() => {
            this.updateTime(startTime);
        }, 1000);
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private updateTime(time: Date): any {
        const currentTime = new Date(Date.now());

        let difference = currentTime.getTime() - time.getTime();
        let h: string;
        let m: string;
        let s: string;

        h = `${Math.floor(difference / 3600000)}`;
        difference = difference - (+h * 3600000);
        h = GlobalHelper.checkIfOneDigit(h);

        m = `${Math.floor(difference / 60000)}`;
        difference = difference - (+m * 60000);
        m = GlobalHelper.checkIfOneDigit(m);

        s = `${Math.floor(difference / 1000)}`;
        difference = difference - (+s * 1000);
        s = GlobalHelper.checkIfOneDigit(s);

        this.time.next(`${h}:${m}:${s}`);
    }
}
