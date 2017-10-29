import test from "ava"
import { createStore } from "../index"
import { BORING_REDUCER, ADD, UNADD } from "./fixtures.js"

const { createStore } = crossed.lib.dux

const store = createStore({
  reducer: BORING_REDUCER
})

test("are initialized before an action is dispatched", t => {
  t.is(store.getState(), 0)
})

test("affect state", t => {
  store.dispatch(ADD())
  t.is(store.getState(), 1)
})

test("continue to affect state", t => {
  store.dispatch(ADD())
  t.is(store.getState(), 2)
})

test("can take differant actions", t => {
  store.dispatch(UNADD())
  t.is(store.getState(), 1)
})
