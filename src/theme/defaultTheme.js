import chroma from "chroma-js";
import { themes } from '@crpt/react-button';

export default {
  DatePicker: {
    height: "64px",
    fontFamily: 'SegoeUI, sans-serif',
    main: {
      background: "#FFFFFF",
      color: "#52535A",
      placeholder: "#868686"
    },
    disabled: {
      background: "#FFFFFF",
      color: "#212C42",
      placeholder: "#868686"
    },
    error: {
      background: "#FFEBEB",
      color: "#212C42",
      placeholder: "#868686"
    },
    borderRadius: "2px",
    fontSize: "16px",
    fontWeight: 200,
    DayWrap: {
      width: '20px',
      height: '20px',
      hoverBackground: "#F8EC31",
      hovered: {
        background: chroma("#F8EC31")
          .brighten(0.8)
          .css(),
      },
      disabled: {
        background: '#abadb6',
      }
    },
    Day: {
      width: "20px",
      height: "20px",
      borderRadius: "2px",
      hoverBackground: "#F8EC31",
      hovered: {
        background: chroma("#F8EC31")
          .brighten(0.8)
          .css(),
      },
      selected: {
        background: "#F8EC31",
      },
      main: {
        color: "#52535A",
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
        color: "#abadb6",
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
        top: "19px"
      },
      focused: {
        top: "11px",
        fontSize: "14px",
        height: "14px"
      }
    },
    InputWrap: {
      main: {
        background: "#FFFFFF",
        border: "1px solid #ABADB5",
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
      height: "64px",
      borderRadius: "2px",
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
      width: 'calc(100% - 32px)'
    },
    DatePickerPanelWrap: {
      top: '62px',
      bottom: '62px',
      borderRadius: '3px',
      paddingTop: '50px',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingBottom: '16px',
      border: '0',
      boxShadow: '0 3px 4px rgba(0, 0, 0, 0.13), 0 1px 3px rgba(0, 0, 0, 0.1)',
      Accept: {
        Button: {
          fontSize: "16px",
          fontWeight: 400,
          normal: {
            paddingLeft: "35px",
            paddingRight: "35px",
            height: "40px"
          },
          main: {
            border: "0",
            color: "#52535A",
            background: "#ffffff"
          },
          disabled: {
            border: "0",
            color: "#ABADB6",
            background: "#ffffff"
          },
          minWidth: "108px",
          borderTopLeftRadius: "3px",
          borderBottomLeftRadius: "3px",
          borderTopRightRadius: "3px",
          borderBottomRightRadius: "3px",
          boxShadow: '0 3px 4px rgba(0, 0, 0, 0.13), 0 1px 3px rgba(0, 0, 0, 0.1)',
        }
      },
      Reset: {
        Button: {
          fontSize: "16px",
          fontWeight: 400,
          cursor: "normal",
          normal: {
            paddingLeft: "22px",
            paddingRight: "37px",
            height: "40px"
          },
          main: {
            border: "0",
            color: "#52535A",
            background: "#ffffff"
          },
          disabled: {
            border: "0",
            color: "#2d3d5b",
            background: "#b9b9b9"
          },
          minWidth: "0px",
        }
      }
    }
  }
};
