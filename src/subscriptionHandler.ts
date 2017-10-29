const makeSubscriptionHandler = (getState: GetState) => {
  let key = 0
  let subscriptionMap = new Map()

  const subscribe: Subscribe = listener => {
    const thisKey = key++
    subscriptionMap.set(thisKey, listener)

    return () => subscriptionMap.delete(thisKey)
  }

  const callSubscribers: CallSubscribers = () => {
    subscriptionMap.forEach(listener => listener(getState()))
  }

  return {
    subscribe,
    callSubscribers
  }
}

export default makeSubscriptionHandler
