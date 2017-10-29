import { patch } from "picodom/src"
import createStore from "./createStore"

let store

export const createApp = (
  { reducer, middleware, responders, introspectors, view },
  mountNode
) => {
  store = createStore({
    reducer,
    middleware,
    responders,
    introspectors
  })
  let node

  const render = () => {
    const oldNode = node
    node = view()
    patch(oldNode, node)
  }

  store.subscribe(render)
  render()
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
