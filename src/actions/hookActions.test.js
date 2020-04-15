import moxios from 'moxios';

import { getSecretWord } from "./hookActions";

describe('hookActions', () => {
  describe('moxios tests', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    test('calls the getSecretWord callback on axios response', async() => {
      const secretWord = 'party';

      // mocks the last request to axios to respond wit a 200 with
      // a response body of secret word.
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: secretWord
        })
      })

      // create mock for callback arg
      const mockSetSecretWord = jest.fn();

      await getSecretWord(mockSetSecretWord);

      // see whether mock was run with the correct argument
      expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
    });





  })
})
