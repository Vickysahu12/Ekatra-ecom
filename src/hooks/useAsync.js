import { useEffect, useState } from 'react'

/**
 * Runs an async loader and tracks { data, error, loading }.
 * `deps` works like useEffect deps. Stale results are ignored.
 */
export function useAsync(loader, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  useEffect(() => {
    let active = true
    setState((s) => ({ ...s, loading: true, error: null }))
    loader()
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: null, error, loading: false }))
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
