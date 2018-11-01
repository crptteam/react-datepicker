import React, { Component } from "react";
import { render } from "react-dom";

import { DatePicker, RangePicker } from "../../src";

class Demo extends Component {
  state = {
    date: '',
  };

  componentDidMount() {
    setTimeout(() => this.setState({ date: '09.10.2018', from: '01.01.2018', to: '01.10.2018' }), 500);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>react-datepicker Demo</h1>
        <DatePicker
          format="DD.MM.YYYY"
          positionX="left"
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          onTogglePanel={console.log}
          onRef={console.log}
          isError={true}
        />
        <h1>react-datepicker Demo</h1>
        <DatePicker
          positionX="left"
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          monthView={true}
          acceptText="Применить"
          resetText="Сбросить"
          onTogglePanel={console.log}
        />
        <h1>react-datepicker Demo</h1>
        <RangePicker
          format="DD.MM.YYYY"
          positionX="left"
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          acceptText="Применить"
          resetText="Сбросить"
          savePlaceholder
          onTogglePanel={console.log}
        />
        <h1>react-datepicker Demo</h1>
        <RangePicker
          positionX="left"
          positionY="bottom"
          isError={true}
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          onChange={vals => console.log('VALS', vals)}
          onTogglePanel={console.log}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
