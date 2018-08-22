import React, {Component} from 'react'
import {render} from 'react-dom'

import { DatePicker } from '../../src'

class Demo extends Component {
  render() {
    return <div style={{textAlign: 'center'}}>
      <h1>react-datepicker Demo</h1>
      <DatePicker  positionX="left"  positionY="bottom" />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
