export function useWorker(workerUrl: string) {
  const socketWorker = new Worker(workerUrl, { type: 'module' })

  const sendMessage = (value: any, action: string = 'send') => {
    socketWorker.postMessage({action, value})
  }

  const onMessage = (cb: any = () => {}) => {
    socketWorker.onmessage = ({ data }) => cb(data)
  }

  const terminate = () => {
    socketWorker.terminate()
  }

  return {
    sendMessage,
    onMessage,
    terminate
  }
}
