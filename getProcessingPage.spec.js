import getProcessingPage, { MESSAGES, stateActions } from "./getProcessingPage";

describe('getProcessingPage', () => {
  jest.spyOn(stateActions, 'processing');

  it('is getProcessingPage', async () => {
    const exp = await getProcessingPage([]);

    expect(exp).toEqual(MESSAGES.undefined)
  });
  it('is should return success', async () => {
    const exp = await getProcessingPage([{ state: 'success' }]);

    expect(exp).toEqual(MESSAGES.SUCCESS)
  });
  it('is should return named error', async () => {
    const exp = await getProcessingPage([{ state: 'error', errorCode: 'NO_STOCK' }]);

    expect(exp).toEqual(MESSAGES.NO_STOCK)
  });
  it('is should return UNnamed error', async () => {
    const exp = await getProcessingPage([{ state: 'error' }]);

    expect(exp).toEqual(MESSAGES.undefined)
  });
  it('is should return error after two processes', async () => {
    const exp = await getProcessingPage([{ state: 'processing' }, { state: 'processing' }, { state: 'error' }]);

    expect(stateActions.processing).toHaveBeenCalledTimes(2);
    expect(exp).toEqual(MESSAGES.undefined)
  });
});
