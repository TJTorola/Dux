const makeSubscriptionHandler = getState => {
  let key = 0
  let subscriptionMap = new Map()

  const subscribe = listener => {
    const thisKey = key++
    subscriptionMap.set(thisKey, listener)

    return () => subscriptionMap.delete(thisKey)
  }

  const callSubscribers = () => {
    subscriptionMap.forEach(listener => listener(getState()))
  }

  return {
    subscribe,
    callSubscribers
  }
}

export default makeSubscriptionHandler
