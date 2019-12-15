/**
 * This is a static Helper class used for generic functions.
 *
 * No need to call in the constructor to use this function.
 */
export class GlobalHelper {

    /**
     * Get Ratio of 2 numbers. KD / WL, etc
     */
    public static getRatio(a: number, b: number): string {
        if (a === 0) {
            return '0.00';
        } else if (b === 0) {
            return `${a}.00`;
        }

        return (a / b).toFixed(2);
    }

    /**
     * Returns an object of h and m differences.
     */
    public static getTimeDiff(startDate: Date, endDate: Date): string {
        if (!startDate || !endDate) {
            return '0h, 0m';
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        let difference = endDate.getTime() - startDate.getTime();
        let h: string;
        let m: string;

        h = `${Math.floor(difference / 3600000)}`;
        difference = difference - (+h * 3600000);

        m = `${Math.floor(difference / 60000)}`;
        difference = difference - (+m * 60000);

        return `${h}h, ${m}m`;
    }

    public static checkIfOneDigit(time: string) {
        if (time.length === 1) {
            return `0${time}`;
        }
        return time;
    }
}
