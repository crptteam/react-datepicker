import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.input`
  display: block;
  position: relative;
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => props.height};
  line-height: ${props => props.height};
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box !important;
  outline: 0;
  border: 0;
  overflow: hidden;
  padding: 0;
  top: ${props => (props.top ? props.top : props.centered ? '0' : '10px')};
  background: ${props => props.background};
  cursor: ${props => props.cursor};
  color: ${props => (props.noCaret ? 'rgba(0,0,0,0)' : props.color)};
  text-shadow: ${props => (props.noCaret ? '0 0 0 ' + props.color : 'none')};
  ::-webkit-input-placeholder {
    color: ${props => props.placeholderColor};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
  }
`;

const InputElem = props => {

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(merged);

  const mergedInputElem = innerMerge(
    {},
    defaultTheme.DatePicker && defaultTheme.DatePicker.InputElem || {},
    props.theme && props.theme.DatePicker && props.theme.DatePicker.InputElem || {}
  );

  Object.assign(theme, getThemeAsPlainTextByKeys(
    mergedInputElem,
    props.disabled ? 'disabled' : props.isError ? 'error' : 'main',
    props.centered ? 'centered' : 'normal'
  ));

  return <Elem {...theme} {...props}  />;
};

export default InputElem;
