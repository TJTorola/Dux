import test from "ava"
import { createStore } from "../index"
import { spy } from "sinon"
import {
  ADD,
  BORING_REDUCER,
  FOO_WARE,
  BAR_WARE,
  BAZ_WARE,
  RETURNER
} from "./fixtures"

const mySymbol = Symbol()
const mySpy = spy()
const myOtherSpy = spy()
createStore({
  reducer: BORING_REDUCER,
  middleware: [FOO_WARE, BAR_WARE, BAZ_WARE],
  responders: {
    ADD: RETURNER(mySymbol)
  },
  introspectors: [mySpy, myOtherSpy]
}).dispatch(ADD())

test("are all called", t => {
  t.is(mySpy.called, true)
  t.is(myOtherSpy.called, true)
})

test("are called with the array of action changes", t => {
  t.deepEqual(mySpy.args[0][0].actions, [
    { type: "ADD" },
    { type: "ADD", foo: "foo" },
    { type: "ADD", foo: "foo", bar: "bar" },
    { type: "ADD", foo: "foo", bar: "bar", baz: "baz" }
  ])
})

test("are passed the previous state", t => {
  t.is(mySpy.args[0][0].prevState, 0)
})

test("are passed the next state", t => {
  t.is(mySpy.args[0][0].nextState, 1)
})

test("are passed the return of the responder", t => {
  t.is(mySpy.args[0][0].response, mySymbol)
})
