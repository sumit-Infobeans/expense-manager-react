import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

export const TextField = props => {
  const { invalid, label, errorText } = props;
  return (
    <FormGroup>
      <Label for="amount">{label}</Label>
      <Input {...props} invalid={invalid} />
      {invalid && <FormFeedback valid>{errorText}</FormFeedback>}
    </FormGroup>
  );
};
