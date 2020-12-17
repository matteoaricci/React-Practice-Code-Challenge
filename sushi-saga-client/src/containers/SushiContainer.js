import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushis.map(sushi => (
            <Sushi eaten={props.eaten.includes(sushi)} eat={props.eat} sushi={sushi}/>
          ))
        }
        <MoreButton more={props.more}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer