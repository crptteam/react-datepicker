import styled from 'styled-components';
import React from "react";
import { getThemeAsPlainTextByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";


const Elem = styled.div`
  position: absolute;
  right: 0;
  z-index: 9999;

  ${props => (props.positionX && props.positionX === 'left'
    ? 'right: -1px'
    : 'left: -1px')};
  ${props => (props.positionY && props.positionY === 'top'
    ? `bottom: ${props.bottom}`
    : `top: ${props.top}`)};
  display: ${props => (props.visible ? "block" : "none")};

`;

const PanelWrap = props => {

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  innerMerge(merged, defaultTheme.DatePicker.DatePickerPanelWrap, (props.theme && props.theme.DatePicker && props.theme.DatePicker.DatePickerPanelWrap) || {});

  const theme = getThemeAsPlainTextByKeys(
    merged,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default PanelWrap;
