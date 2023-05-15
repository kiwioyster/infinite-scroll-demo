import { getPkmnById } from './pokemon';

describe('pokemon service', () => {
  it('should call get pkmn by id with the correct id', async () => {
    const testId = 123;
    const spy = jest.spyOn(global, 'fetch');
    await getPkmnById(123);

    expect(spy).toHaveBeenCalledWith(
      `https://pokeapi.co/api/v2/pokemon/${testId}`
    );
  });
});
