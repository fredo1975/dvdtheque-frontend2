import {Dvd} from './dvd';

const dvd = new Dvd(1, 2014, '2', 'sony');
describe('Dvd', () => {
  it('should create an instance', () => {
    expect(dvd).toBeTruthy();
  });
});
