import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform  {

    transform(status: string) {
        if (status == 'REQ_FROM_ENT_WITH_USER_AND_ACCEPTED_BY_USER_PAY_AFTER_CONFIRMED_BY_ENT') {
            return "PENDIENTE";
        } else {
            return status;
        }
    }
    
}