import test from "ava"
import { createStore } from "../index"
import { spy, stub } from "sinon"
import { ADD, BORING_REDUCER, EXCITING_REDUCER } from "./fixtures"

const { createStore } = crossed.lib.dux

test("correctly replaces the reducer", t => {
  const store = createStore({
    reducer: BORING_REDUCER
  })
  store.replaceReducer(EXCITING_REDUCER)

  store.dispatch(ADD())
  t.is(store.getState(), -1)
})
