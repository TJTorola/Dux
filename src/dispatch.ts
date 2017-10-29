export const objMap = (object: { [key: string]: any }, mapper: Mapper) =>
  Object.keys(object).reduce(
    (acc, key) => Object.assign(acc, { [key]: mapper(object[key], key) }),
    {}
  )

export default ({
  responders,
  setState,
  getState,
  getReducer,
  introspectors,
  middleware,
  callSubscribers
}: DuxInternalAPI) => {
  let syncDispatchCount = 0
  let mappedResponders = {}

  const dispatch: Dispatch = action => {
    syncDispatchCount++

    const actions = middleware.reduce(
      (acc, ware) => {
        const lastAction = acc[acc.length - 1]
        const nextAction = lastAction
          ? ware(getState(), lastAction)
          : lastAction

        return [...acc, nextAction]
      },
      [action]
    )
    const finalAction = actions[actions.length - 1]

    if (!finalAction) {
      syncDispatchCount--
      introspectors.forEach(i =>
        i({
          actions,
          prevState: getState(),
          nextState: getState(),
          response: undefined
        })
      )
      return
    }

    const prevState = getState()
    const nextState = getReducer()(getState(), finalAction)
    setState(nextState)

    const response = mappedResponders[finalAction.type]
      ? mappedResponders[finalAction.type](finalAction)
      : undefined

    introspectors.forEach(i => i({ actions, prevState, nextState, response }))

    if (syncDispatchCount-- === 1) callSubscribers()

    return response
  }

  mappedResponders = objMap(responders, r => r(dispatch, getState))

  return dispatch
}
