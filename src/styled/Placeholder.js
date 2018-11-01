import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  display: ${props =>
    props.isSaved
      ? "block"
      : props.focused || props.fromValue || props.toValue ? "none" : "block"};
  position: absolute;
  line-height: ${props => props.height};
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  font-weight: ${props => props.fontWeight};
  font-family: ${props => props.fontFamily};
  top: ${props => props.focused ? '30' : '50'}%;
  transform: translateY(-50%);
  text-align: left;
  transition: all 0.3s ease;
`;

const Placeholder = props => {
  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(merged);

  const mergedPlaceholder = innerMerge(
    {},
    defaultTheme.DatePicker.Placeholder,
    (props.theme &&
      props.theme.DatePicker &&
      props.theme.DatePicker.Placeholder) ||
      {}
  );

  const key = props.disabled ? "disabled" : props.isError ? "error" : "main";

  Object.assign(
    theme,
    getThemeAsPlainTextByKeys(
      mergedPlaceholder,
      key,
      props.focused ? "focused" : "normal"
    )
  );

  return <Elem {...theme} {...props} />;
};

export default Placeholder;
