import React from 'react';
import PropTypes from 'prop-types';
import ActionsWrapper from "../styled/ActionsWrapper";
import { Button } from "@crpt/react-button";
import defaultTheme from "../theme/defaultTheme";
import { innerMerge } from "../utils";


const getButtonTheme = (name, theme) => {
  const passedTheme = theme
    && theme.DatePicker
    && theme.DatePicker.DatePickerPanelWrap
    && theme.DatePicker.DatePickerPanelWrap[name] || {};

  const defTheme = defaultTheme.DatePicker.DatePickerPanelWrap[name];
  return innerMerge({}, defTheme, { Button: passedTheme } );
};

const Actions = ({
  onReset,
  resetText,
  onAccept,
  acceptText,
  theme
}) => (
  <ActionsWrapper>
    <Button
      onClick={onReset}
      theme={getButtonTheme('Reset', theme)}
    >
      {resetText}
    </Button>
    <Button
      onClick={onAccept}
      theme={getButtonTheme('Accept', theme)}
    >
      {acceptText}
    </Button>
  </ActionsWrapper>
);

Actions.propTypes = {
  onReset: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  resetText: PropTypes.string.isRequired,
  acceptText: PropTypes.string.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default Actions;
