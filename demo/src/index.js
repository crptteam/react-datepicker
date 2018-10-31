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
          date={this.state.date}
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
          date="2018-10-01"
          positionX="left"
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          monthView={true}
          acceptText="Применить"
          resetText="Сбросить"
        />
        <h1>react-datepicker Demo</h1>
        <RangePicker
          format="DD.MM.YYYY"
          positionX="left"
          from={this.state.from}
          to={this.state.to}
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          acceptText="Применить"
          resetText="Сбросить"
          savePlaceholder
        />
        <h1>react-datepicker Demo</h1>
        <RangePicker
          from="09.10.2018"
          to="10.12.2018"
          positionX="left"
          positionY="bottom"
          isError={true}
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          onChange={vals => console.log('VALS', vals)}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
