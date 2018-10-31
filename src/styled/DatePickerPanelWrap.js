import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  font-family: ${props => props.fontFamily};
  border-radius: ${props => props.borderRadius};
  padding-top: ${props => props.paddingTop};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  padding-bottom: ${props => props.paddingBottom};
  font-size: 0px;
  position: relative;
  white-space: nowrap;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  background: ${props => props.background};
  border: ${props => props.border};
  box-shadow: ${props => props.boxShadow};
  margin-top: ${props => props.marginTop};
  
  &:before {
    ${props => props.marginTop && 'content: \' \';'};
    position: absolute;
    right: 21px;
    background: ${props => props.background};
    width: 18px;
    height: 2px;
    bottom: calc(100% - 1px);
  }
`;

const DatePickerPanelWrap = props => {

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

export default DatePickerPanelWrap;
