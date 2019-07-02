import React, { Component } from "react";
import { render } from "react-dom";

import { DatePicker, RangePicker } from "../../src";

const theme = {
  height: "38px",
  borderRadius: "2px",
  fontSize: "16px",
  fontWeight: 200,
  Day: {
    width: "24px",
    height: "24px",
    borderRadius: "2px",
    hoverBackground: "#F8EC31",
    hoverColor: "#434343",
    hovered: {
      background: "#f8f27a",
      color: "#434343"
    },
    selected: {
      background: "#F8EC31",
      color: "#434343",
      fontWeight: 600
    },
    main: {
      color: "#212C42",
      background: "rgba(0,0,0,0)"
    }
  },
  DayWrap: {
    width: "28px",
    height: "28px",
    hoverBackground: "#F8EC31",
    hoverColor: "#434343",
    hovered: {
      background: "#f8f27a",
      color: "#434343"
    }
  },
  placeholder: {
    normal: "#ACADB5",
    disabled: "#ACADB5",
    error: "#ACADB5"
  },
  Placeholder: {
    fontWeight: 200,
    main: {
      color: "#abadb6"
    },
    error: {
      color: "#abadb6"
    },
    disabled: {
      color: "#abadb6"
    },
    normal: {
      fontSize: "16px",
      height: "24px",
      top: "11px"
    },
    focused: {
      top: "4px",
      fontSize: "12px",
      height: "14px"
    }
  },
  InputWrap: {
    main: {
      background: "#FFFFFF",
      border: "1px solid rgba(196, 196, 196, 0.25)",
      cursor: "normal"
    },
    disabled: {
      background: "#FFFFFF",
      border: "1px solid #ABADB5",
      cursor: "not-allowed"
    },
    error: {
      background: "#FFEBEB",
      border: "1px solid #FF3C21",
      cursor: "normal"
    },
    height: "38px",
    borderRadius: "3px",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  InputElem: {
    main: {
      color: "#212C42",
      placeholderColor: "#ACADB5",
      cursor: "text",
      background: "rgba(0,0,0,0)"
    },
    normal: {
      top: '8px'
    },
    disabled: {
      color: "#212C42",
      placeholderColor: "#ACADB5",
      cursor: "not-allowed",
      background: "rgba(0,0,0,0)"
    },
    error: {
      color: "#212C42",
      placeholderColor: "#ACADB5",
      cursor: "text",
      background: "rgba(0,0,0,0)"
    },
    height: "24px"
  },
  InputContentWrap: {
    width: "calc(100% - 32px)"
  },
  DatePickerPanelWrap: {
    top: "35px",
    bottom: "36px",
    borderRadius: "3px",
    paddingTop: "15px",
    paddingLeft: "23px",
    paddingRight: "23px",
    paddingBottom: "15px",
    main: {
      border: "1px solid rgba(196, 196, 196, 0.25)"
    },
  }
};

class Demo extends Component {
  state = {
    date: ""
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          date: "09.10.2018",
          from: "01.01.2018",
          to: "01.10.2018"
        }),
      500
    );
  }

  render() {
    return (
      <div style={{ textAlign: "center", width: '400px' }}>
        <h1>react-datepicker Demo</h1>
        <DatePicker
          format="DD.MM.YYYY"
          minDate="20.01.2013"
          maxDate="01.01.2020"
          positionX="left"
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          onTogglePanel={console.log}
          onRef={console.log}
          isError={true}
          showCurrent
        />
        <h1>react-datepicker Demo</h1>
        <DatePicker
          positionX="left"
          positionY="bottom"
          placeholder="Выбор месяца"
          savePlaceholder
          monthView={true}
          onClearDate={'12-2017'}
          rightIconReplacer={<div>1</div>}
          format={"MM-YYYY"}
          acceptText="Применить"
          resetText="Сбросить"
          onTogglePanel={console.log}
        />
        <h1>RangePicker Demo</h1>
        <RangePicker
          format="DD.MM.YYYY"
          minDate="20.01.2013"
          maxDate="01.01.2020"
          positionX="left"
          positionY="bottom"
          placeholder="Фильтр по дате"
          acceptText="Применить"
          resetText="Сбросить"
          savePlaceholder
          noActions
          theme={{ DatePicker: theme }}
        />
        <h1>RangePicker</h1>
        <RangePicker
          positionX="left"
          positionY="bottom"
          isError={true}
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          onChange={vals => console.log("VALS", vals)}
        />

        <h1>RangePicker with noAutoFocus</h1>
        <RangePicker
          leftPlaceholder={"Дата регистрации от"}
          rightPlaceholder={"Дата регистрации до"}
          positionX="left"
          positionY="bottom"
          isError={true}
          noAutoFocus
          savePlaceholder
          noActions
          showCurrent
          onChange={vals => console.log("VALS", vals)}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
