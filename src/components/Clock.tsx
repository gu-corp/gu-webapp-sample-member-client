import { useSelector, shallowEqual } from 'react-redux'
import { RootState }　from '~/store/configure-store';
import useInterval from '~/utils/useInterval'
import { useDispatch } from 'react-redux'
import * as TickActions from '@store/actions/tick-actions';
import css from 'styled-jsx/css'

const useClock = () => {
  return useSelector(
    (state: RootState) => ({
      lastUpdate: state.tickState.lastUpdate,
      light: state.tickState.light
    }),
    shallowEqual
  )
}

const formatTime = (time) => {
  // cut off except hh:mm:ss
  return new Date(time).toJSON().slice(11, 19)
}

const styles = css`
div {
  padding: 15px;
  display: inline-block;
  color: #82fa58;
  font: 20px menlo, monaco, monospace;
  background-color: #000;
}

.light {
  background-color: #999;
}
`

const Clock = () => {
  const { lastUpdate, light } = useClock()
  const dispatch = useDispatch()

  // Tick the time every second
  useInterval(() => {
    dispatch(TickActions.tick())
  }, 1000)

  return (
    <div>
      {formatTime(lastUpdate)}
      <style jsx>{styles}</style>
    </div>
  )
}

export default Clock
