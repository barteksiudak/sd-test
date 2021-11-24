export const MESSAGES = {
  SUCCESS: { title: 'Order complete', message: null },
  NO_STOCK: { title: 'Error page', message: 'No stock' },
  INCORRECT_DETAILS: { title: 'Error page', message: 'Incorrect details have been entered' },
  'null': { title: 'Error page', message: null },
  'undefined': { title: 'Error page', message: null }
}


const getProcessing = async (processes, position) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(getProcessingPage(processes, position));
    }, 2000)
  })
}

const getSuccess = () => {
  return Promise.resolve(MESSAGES['SUCCESS']);
}

const getError = (processes, position) => {
  const { errorCode } = processes[position] || {};
  return Promise.resolve(MESSAGES[String(errorCode)]);
}

export const stateActions = {
  processing: getProcessing,
  success: getSuccess,
  error: getError,
}

export default function getProcessingPage(processes, processPosition = -1) {
  const position = processPosition + 1;

  const { state } = processes[position] || { state: 'error' };
  const { [state]: currentStateAction } = stateActions;

  return currentStateAction(processes, position);

}
