import { useCallback } from 'react';
import { useFormikContext } from 'formik';

import { TextField, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { FormFieldProps, FormValues } from '../types';
import { FORM_FIELD_PROPERTY } from '../constants';
import { getFormikError } from '../../../utils';

type Props = {
  field: FormFieldProps;
  formFieldIndex: number;
  onClickRemove: (field: FormFieldProps) => void;
}

function TextFieldDisplay({ field, onClickRemove, formFieldIndex }: Props) {
  const formik = useFormikContext<FormValues>();

  const handleClick = useCallback(() => {
    onClickRemove(field);
  }, [field, onClickRemove]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, p: 2 }}>
      <TextField
        name={`${FORM_FIELD_PROPERTY}[${formFieldIndex}].value`}
        value={
          formik.values[FORM_FIELD_PROPERTY][formFieldIndex].value ?? ''
        }
        onChange={formik.handleChange}
        variant="outlined"
        placeholder="Label"
        error={Boolean(getFormikError(formik.errors, formik.touched, FORM_FIELD_PROPERTY, formFieldIndex, 'value'))}
        helperText={getFormikError(formik.errors, formik.touched, FORM_FIELD_PROPERTY, formFieldIndex, 'value')}
        fullWidth
      />
      <IconButton size="small" onClick={handleClick}>
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default TextFieldDisplay;
