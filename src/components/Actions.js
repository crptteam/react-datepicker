import React from 'react';
import PropTypes from 'prop-types';
import ActionsWrapper from "../styled/ActionsWrapper";
import { Button } from "@crpt/react-button";

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
      theme={theme.DatePicker.DatePickerPanelWrap.Reset}
    >
      {resetText}
    </Button>
    <Button
      onClick={onAccept}
      theme={theme.DatePicker.DatePickerPanelWrap.Accept}
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
