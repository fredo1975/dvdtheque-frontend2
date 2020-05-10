import { Pipe, PipeTransform } from '@angular/core';
import { JmsStatus } from '../model/jms-status.enum';
@Pipe({
  name: 'jmsStatus'
})
export class JmsStatusPipe implements PipeTransform {

  transform(value: JmsStatus, args?: any): any {
    // console.log('value=', value);
    return value;
  }

}
