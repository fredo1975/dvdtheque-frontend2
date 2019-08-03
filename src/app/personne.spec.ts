import {Personne} from './personne';

const real = new Personne(1, 'wong kar', 'wyy');
const act1 = new Personne(2, 'chung', 'fat');

describe('Personne', () => {
  it('should create an instance', () => {
    expect(real).toBeTruthy();
  });
});
