import { Dvd } from './dvd';
import { DvdFormat } from './dvd-format.enum';

const dvd = new Dvd(2014, '2', 'sony', true, new Date(), new Date(), DvdFormat.DVD);
describe('Dvd', () => {
  it('should create an instance', () => {
    expect(dvd).toBeTruthy();
  });
});
