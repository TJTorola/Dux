const BORING_REDUCER = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1

    case "UNADD":
      return state - 1

    default:
      return state
  }
}

const EXCITING_REDUCER = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state - 1

    case "UNADD":
      return state + 1

    default:
      return state
  }
}

const ADD = () => ({ type: "ADD" })
const UNADD = () => ({ type: "UNADD" })

const NOTHINGER = (dispatch, getState) => action => null
const SPIER = spy => (dispatch, getState) => spy
const STATER = (dispatch, getState) => action => getState()
const ACTIONER = (dispatch, getState) => action => action
const RETURNER = thingToReturn => (dispatch, getState) => action =>
  thingToReturn
const DISPATCHER = (dispatch, getState) => action => {
  dispatch(UNADD())
}

const STOP_WARE = (state, action) => undefined
const NULL_WARE = (state, action) => null
const PASS_WARE = (state, action) => action
const FOO_WARE = (state, action) => Object.assign({}, action, { foo: "foo" })
const BAR_WARE = (state, action) => Object.assign({}, action, { bar: "bar" })
const BAZ_WARE = (state, action) => Object.assign({}, action, { baz: "baz" })
const ADD_WARE = (state, action) => ADD()

module.exports = {
  BORING_REDUCER,
  EXCITING_REDUCER,
  ADD,
  UNADD,
  NOTHINGER,
  STATER,
  ACTIONER,
  RETURNER,
  SPIER,
  DISPATCHER,
  STOP_WARE,
  NULL_WARE,
  PASS_WARE,
  FOO_WARE,
  BAR_WARE,
  BAZ_WARE,
  ADD_WARE
}
