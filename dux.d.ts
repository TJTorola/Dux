declare type State = any
declare type Action = {
  type: string
  payload?: any
}

declare type Introspector = (
  values: {
    actions: (void | Action)[]
    prevState: State
    nextState: State
    response: any
  }
) => void

declare type Middleware = (state: State, action: Action) => Action | void
declare type Reducer = (state: State, action: Action) => State

declare type Responder = (
  dispatch: Dispatch,
  getState: GetState
) => (action: Action) => any
declare type Responders = {
  [actionType: string]: Responder
}

declare type SetState = (state: State) => void
declare type GetState = () => State
declare type Dispatch = (action: Action) => any

declare type Listener = (state: State) => void
declare type Unsubscribe = () => boolean
declare type Subscribe = (listener: Listener) => Unsubscribe
declare type CallSubscribers = () => void

declare type GetReducer = () => Reducer
declare type ReplaceReducer = (nextReducer: Reducer) => void

declare type DuxInternalAPI = {
  getState: GetState
  setState: SetState
  getReducer: GetReducer
  responders: Responders
  introspectors: Introspector[]
  middleware: Middleware[]
  callSubscribers: CallSubscribers
}

declare type DuxExternalAPI = {
  getState: GetState
  dispatch: Dispatch
  subscribe: Subscribe
  replaceReducer: ReplaceReducer
}

declare type CreateStore = (
  arguments: {
    middleware?: Middleware[]
    reducer: Reducer
    responders?: Responders
    introspectors?: Introspector[]
  }
) => DuxExternalAPI
