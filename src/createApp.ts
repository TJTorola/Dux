import { patch } from "picodom/src"
import createStore from "./createStore"

let store

export const createApp: CreateApp = (
  { reducer, middleware, responders, introspectors, view },
  mountNode
) => {
  store = dux.createStore(
    {
      reducer,
      middleware,
      responders,
      introspectors
    },
    mountNode
  )
  let node

  const render = state => {
    const oldNode = node
    node = view(state)
    patch(oldNode, node)
  }

  store.subscribe(render)
  render(store.getState())
}

export const connect = (
  mapStateToProps,
  mapDispatchToProps
) => component => ownProps =>
  component(
    Object.assign(
      mapStateToProps(store.getState(), ownProps),
      mapDispatchToProps(store.dispatch, ownProps),
      ownProps
    )
  )
