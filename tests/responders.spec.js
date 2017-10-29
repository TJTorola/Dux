import test from "ava"
import { createStore } from "../index"
import { spy, stub } from "sinon"
import {
  ADD,
  BORING_REDUCER,
  UNADD,
  ADD_WARE,
  SPIER,
  ACTIONER,
  RETURNER,
  DISPATCHER
} from "./fixtures"

const { createStore } = crossed.lib.dux

test("are called by action type", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: SPIER(mySpy)
    }
  })

  store.dispatch(ADD())
  t.is(mySpy.called, true)
})

test("are not called by other action types", t => {
  const addSpy = spy()
  const unaddSpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: SPIER(addSpy),
      UNADD: SPIER(unaddSpy)
    }
  })

  store.dispatch(ADD())
  t.is(addSpy.called, true)
  t.is(unaddSpy.called, false)
})

test("dictate the return value of dispatch", t => {
  const mySymbol = Symbol()
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: RETURNER(mySymbol)
    }
  })

  t.is(store.dispatch(ADD()), mySymbol)
})

test("are passed dispatch and getState", t => {
  const mySpy = stub().returns(() => {})
  const store = createStore({
    reducer: BORING_REDUCER,
    responders: {
      ADD: mySpy
    }
  })

  t.is(mySpy.args[0][0], store.dispatch)
  t.is(mySpy.args[0][1], store.getState)
})

test("gets passed middleware modified action", t => {
  const mySpy = spy()
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [ADD_WARE],
    responders: {
      ADD: SPIER(mySpy)
    }
  })

  store.dispatch(UNADD())
  t.is(mySpy.args[0][0].type, "ADD")
})
