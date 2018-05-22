import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '@crpt/utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.label`
  js-display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  width: ${props => (props.inline ? props.width : '100%')};
  min-width: ${props => (props.inline ? props.width : '100%')};
  height: ${props => props.height};
  box-sizing: border-box;
  background: ${props => props.background};
  border: ${props => props.border};
  box-sizing: border-box;
  border-radius: ${props => props.borderRadius};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  position: relative;
  cursor: ${props => props.cursor};
`;

const InputWrap = props => {
  const theme = getThemeAsPlainTextByKeys(props.theme || defaultTheme);

  Object.assign(theme, getThemeAsPlainTextByKeys(
    (props.theme && props.theme.InputWrap) || defaultTheme.InputWrap,
    props.disabled ? 'disabled' : props.isError ? 'error' : 'main'
  ));

  return <Elem {...theme} {...props}  />;
};

export default InputWrap;
