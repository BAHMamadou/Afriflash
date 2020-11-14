import { Injectable } from '@angular/core';

/**
 * Service permettant de gérer tous ce qui touche aux dates
 */
@Injectable()
export class AfriflashDateProvider {

    /**
     * Aujourd'hui
     */
    private today  = 'Aujourd\'hui,';

    /**
     * Hier
     */
    private yesturday = 'Hier,';

    /**
     * Jours
     */
    private days = 'Jours,';

    /**
     * Liste des mois
     */
    private months = {
        0: 'Jan',
        1: 'Fev',
        2: 'Mars',
        3: 'Avr',
        4: 'Mai',
        5: 'Juin',
        6: 'Juil',
        7: 'Août',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    };

    /**
     * Liste des mois
     */
    private monthsComplet = {
        0: 'Janvier',
        1: 'Fevrier',
        2: 'Mars',
        3: 'Avril',
        4: 'Mai',
        5: 'Juin',
        6: 'Juillet',
        7: 'Août',
        8: 'Septembre',
        9: 'Octobre',
        10: 'Novembre',
        11: 'Decembre',
    };

    constructor() {}

    /**
     * Retourne la difference en jours entre deux dates
     * @param d1 date 1
     * @param d2 date 2
     */
    public getDifference(d1: any, d2: any) {
        d1 = new Date(d1);
        d2 = new Date(d2);
        d1 = d1.getTime() / 86400000;
        d2 = d2.getTime() / 86400000;
        // tslint:disable-next-line: no-construct
        const diff = new Number(d2 - d1).toFixed(0);
        return parseInt(diff, 10);
    }

    /**
     * Retourne la structure d'une Date
     * @param day nombre de jours
     * @param date date
     */
    public getStructDate(day: number, date: Date): any {
        date = new Date(date);
        let dateFormat = '';
        if (day === 0) {
            dateFormat += this.today + ' ' + this.getCustomizeNumber(date.getHours())
                                     + ':' + this.getCustomizeNumber(date.getMinutes());
        }
        if (day === 1) {
            dateFormat += this.yesturday + ' ' + this.getCustomizeNumber(date.getHours())
                                         + ':' + this.getCustomizeNumber(date.getMinutes());
        }
        if (day === 2) {
            dateFormat += day + ' ' + this.days + ' ' + this.getCustomizeNumber(date.getHours())
                                                + ':' + this.getCustomizeNumber(date.getMinutes());
        }
        if (day > 2) {
            dateFormat += date.getDate() + ' ' + this.getMonth(date.getMonth())
                                                                 + ' ' + date.getFullYear();
        }
        return dateFormat;
    }

    public getMonth(index: number) {
        return this.months[index];
    }

    public getMonthComplet(index: number) {
        return this.monthsComplet[index];
    }

    /**
     * Renvoie la valeur customizer
     * @param item jours, mois, heure, minutes, seconds
     */
    public getCustomizeNumber(item: any) {
        if (item >= 0 && item <= 9) {
            item = '0' + item;
        }
        return item;
    }

    /**
     * Retourne un nouveau format => 01 Jan 2020
     * @param dateTime date time
     */
    public format(dateTime: any): any {
        const date = dateTime.split('T');
        const elements = date[0].split('-');
        const index = parseInt(elements[1], 10) >= 0 && parseInt(elements[1], 10) <= 9 ?
                      elements[1].slice(1) : elements[1];
        const format = elements[2] + ' ' + this.months[index - 1] + ' ' + elements[0];
        return format;
    }

    /**
     * Retourne un nouveau format => Sat Apr 11 2020 02:00:00 GMT+0200
     * @param date string date => 01 Jan 2020
     */
    public formatDateTime(dateTime: any): any {

        const stringDate = dateTime.split(' ');
        const months = Object.keys(this.months);
        let month = '';

        months.forEach(element => {
            if (this.months[element] === stringDate[1]) {
                // tslint:disable-next-line: radix
                month = (parseInt(element) + 1).toString();
            }
        });

        const monthIndex = parseInt(month, 10) >= 0 && parseInt(month, 10) <= 9 ?
        '0' + month : month;

        const format = stringDate[2] + '-' + monthIndex + '-' + stringDate[0];
        return new Date(format);
    }

    /**
     * Retourne la structure d'une Date
     * @param day nombre de jours
     * @param date date
     */
    public getStructNormalDate(dateTime: any): any {
        const date = dateTime.split('T');
        const elements = date[0].split('-');
        const index = parseInt(elements[1], 10) >= 0 && parseInt(elements[1], 10) <= 9 ?
            elements[1].slice(1) : elements[1];
        const format = elements[2] + ' ' + this.monthsComplet[index - 1] + ' ' + elements[0];
        return format;
     /*   let dateFormat = '';
        dateFormat +=  date.getDay() + ' ' + this.getMonth(date.getMonth()) + ' ' + date.getFullYear();
        return dateFormat;*/
    }


    /**
     * Retourne la structure d'une Date
     * @param date date
     */
    public getStructMonthYear(date: Date): any {
        date = new Date(date);
        let dateFormat = '';
        dateFormat += this.getMonthComplet(date.getMonth()) + ' ' + date.getFullYear();
        return dateFormat;
    }
}
