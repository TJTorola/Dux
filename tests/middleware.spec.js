import test from "ava"
import { spy } from "sinon"
import { createStore } from "../index"
import {
  ADD,
  BORING_REDUCER,
  UNADD,
  STOP_WARE,
  NULL_WARE,
  PASS_WARE,
  FOO_WARE,
  BAR_WARE,
  BAZ_WARE,
  ADD_WARE
} from "./fixtures"

test("is called", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [spyWare]
  })

  store.dispatch(ADD())
  t.is(spyWare.calledOnce, true)
})

test("are all called", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [spyWare, spyWare]
  })

  store.dispatch(ADD())
  t.is(spyWare.calledTwice, true)
})

test("are called each time a dispatch happens", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [spyWare]
  })

  store.dispatch(ADD())
  store.dispatch(UNADD())
  t.is(spyWare.calledTwice, true)
})

test("don't stop reducers from being called", t => {
  const deceitfulReducer = spy(BORING_REDUCER)
  const store = createStore({
    reducer: deceitfulReducer,
    middleware: [PASS_WARE]
  })

  const addAction = ADD()
  store.dispatch(addAction)
  t.is(deceitfulReducer.called, true)
})

test("don't stop reducers with mutiple middleware", t => {
  const deceitfulReducer = spy(BORING_REDUCER)
  const store = createStore({
    reducer: deceitfulReducer,
    middleware: [PASS_WARE, PASS_WARE]
  })

  const addAction = ADD()
  store.dispatch(addAction)
  t.is(deceitfulReducer.called, true)
})

test("can change the action that is reduced", t => {
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [ADD_WARE]
  })

  store.dispatch(UNADD())
  t.is(store.getState(), 1)
})

test("can stop the reducer if it returns undefined", t => {
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [STOP_WARE]
  })

  store.dispatch(UNADD())
  t.is(store.getState(), 0)
})

test("can stop the reducer if it returns null", t => {
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [NULL_WARE]
  })

  store.dispatch(UNADD())
  t.is(store.getState(), 0)
})

test("can stop the later middleware if it returns null", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [NULL_WARE, spyWare]
  })

  store.dispatch(UNADD())
  t.is(spyWare.called, false)
})

test("can stop the later middleware if it returns undefined", t => {
  const spyWare = spy(PASS_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [STOP_WARE, spyWare]
  })

  store.dispatch(UNADD())
  t.is(spyWare.called, false)
})

test("is called in order", t => {
  const fooSpy = spy(FOO_WARE)
  const barSpy = spy(BAR_WARE)
  const bazSpy = spy(BAZ_WARE)
  const store = createStore({
    reducer: BORING_REDUCER,
    middleware: [fooSpy, barSpy, bazSpy]
  })

  store.dispatch(ADD())
  t.is(fooSpy.args[0][1].foo, undefined)
  t.is(fooSpy.args[0][1].bar, undefined)
  t.is(fooSpy.args[0][1].baz, undefined)

  t.is(barSpy.args[0][1].foo, "foo")
  t.is(barSpy.args[0][1].bar, undefined)
  t.is(barSpy.args[0][1].baz, undefined)

  t.is(bazSpy.args[0][1].foo, "foo")
  t.is(bazSpy.args[0][1].bar, "bar")
  t.is(bazSpy.args[0][1].baz, undefined)
})
