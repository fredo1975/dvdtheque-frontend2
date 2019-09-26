import { Pipe, PipeTransform } from '@angular/core';
import { JmsStatusMessage } from '../jms-status-message';
import { JmsStatus } from '../jms-status.enum';
@Pipe({
  name: 'jmsStatus'
})
export class JmsStatusPipe implements PipeTransform {

  transform(value: JmsStatus, args?: any): any {
    // console.log('value=', value);
    return value;
  }

}
