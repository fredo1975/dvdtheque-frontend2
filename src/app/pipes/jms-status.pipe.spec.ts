import { JmsStatusPipe } from './jms-status.pipe';

describe('JmsStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new JmsStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
