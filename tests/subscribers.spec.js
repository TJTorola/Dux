import test from "ava"
import { createStore } from "../index"
import { spy } from "sinon"
import { ADD, BORING_REDUCER, DISPATCHER } from "./fixtures"

const { createStore } = crossed.lib.dux

test("are called", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)
})

test("are passed newState", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledWith(1), true)
})

test("are called for each dispatch", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  store.dispatch(ADD())
  t.is(mySpy.calledTwice, true)
})

test("can be unsubscribed", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER
  })
  const unsubscribe = store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)

  unsubscribe()
  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)
})

test("only get called once for multiple syncronous calls to dispatch from responders", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: DISPATCHER
    }
  })
  store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.calledOnce, true)
})

test("are given the newest state if responders syncronously dispatch more actions", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: DISPATCHER
    }
  })
  const unsubscribe = store.subscribe(mySpy)

  store.dispatch(ADD())
  t.is(mySpy.args[0][0], 0)
})
