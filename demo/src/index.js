import React, { Component } from "react";
import { render } from "react-dom";

import { DatePicker, RangePicker } from "../../src";
import chroma from "chroma-js";
import { themes } from "@crpt/react-button";

const customTheme = {
  DatePicker: {
    height: "47px",
    borderRadius: "2px",
    fontSize: "16px",
    fontWeight: 200,
    Day: {
      width: "24px",
      height: "24px",
      borderRadius: "2px",
      hoverBackground: "#1A99F4",
      hoverColor: "#FFFFFF",
      hovered: {
        background: chroma("#1A99F4")
          .brighten(0.8)
          .css(),
        color: "#FFFFFF"
      },
      selected: {
        background: "#1A99F4",
        color: "#FFFFFF"
      },
      main: {
        color: "#212C42",
        background: "rgba(0,0,0,0)"
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
      height: "47px",
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
      top: "46px",
      bottom: "46px",
      borderRadius: '3px',
      paddingTop: '15px',
      paddingLeft: '23px',
      paddingRight: '23px',
      paddingBottom: '15px',
      main: {
        border: "1px solid rgba(196, 196, 196, 0.25)",
      },
      Accept: {
        Button: {
          ...themes.bgWhiteTheme.Button,
        }
      },
      Reset: {
        Button: {
          ...themes.whiteTheme.Button,
          marginRight: 30,
        }
      }
    }
  }
};

class Demo extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>react-datepicker Demo</h1>
        <DatePicker
          format="DD.MM.YYYY"
          date="09.10.2018"
          positionX="left"
          positionY="bottom"
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          isError={true}
          theme={customTheme}
        />
        <h1>react-datepicker Demo</h1>
        <DatePicker
          date="2018-10-01"
          positionX="left"
          positionY="bottom"
          theme={customTheme}
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          monthView={true}
          controls={true}
          acceptText="Применить"
          resetText="Сбросить"
        />
        <h1>react-datepicker Demo</h1>
        <RangePicker
          format="DD.MM.YYYY"
          positionX="left"
          positionY="bottom"
          theme={customTheme}
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          acceptText="Применить"
          resetText="Сбросить"
          savePlaceholder
          controls
        />
        <h1>react-datepicker Demo</h1>
        <RangePicker
          from="09.10.2018"
          to="10.12.2018"
          positionX="left"
          positionY="bottom"
          theme={customTheme}
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
