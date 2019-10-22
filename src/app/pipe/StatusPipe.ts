import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {

    transform(status: string) {
        if (status == 'REQ_FROM_ENT_WITH_USER_AND_ACCEPTED_BY_USER_PAY_AFTER_CONFIRMED_BY_ENT') {
            return "PENDIENTE";
        } else if (status == 'REQ_FROM_ENT_WITH_USER_AND_ACCEPTED_BY_USER_PAY_AFTER_CONFIRMED_BY_ENT_PAID_BY_USER' || status == 'REQ_FROM_SEAC_APPROVED_DIRECTLY') {
            return "REALIZADA";
        } else {
            return status;
        }
    }

}