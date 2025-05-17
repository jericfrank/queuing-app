import { Fragment, useCallback } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { Stack, TextField, Box, IconButton } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

import { FormFieldOptions, FormFieldProps, FormValues } from '../types';
import { FORM_FIELD_PROPERTY } from '../constants';
import { getFormikError } from '../../../utils';

type Props = {
  field: FormFieldProps;
  formFieldIndex: number;
  onClickRemove: (field: FormFieldProps) => void;
}

function Dropdown({ field, formFieldIndex, onClickRemove }: Props) {
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
        error={Boolean(getFormikError(formik.errors, formik.touched, FORM_FIELD_PROPERTY, formFieldIndex, 'value'))}
        helperText={getFormikError(formik.errors, formik.touched, FORM_FIELD_PROPERTY, formFieldIndex, 'value')}
        variant="outlined"
        placeholder="Label"
        fullWidth
      />
      <FieldArray name={`${FORM_FIELD_PROPERTY}[${formFieldIndex}].options`}>
        {({ push, remove }) => (
          <Fragment>
            {field.options?.map((option: FormFieldOptions, index: number) => (
              <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                <TextField
                  name={`${FORM_FIELD_PROPERTY}[${formFieldIndex}].options[${index}].value`}
                  value={
                    formik.values[FORM_FIELD_PROPERTY][formFieldIndex].options?.[index]?.value ?? ''
                  }
                  onChange={formik.handleChange}
                  error={Boolean(
                    getFormikError(
                      formik.errors,
                      formik.touched,
                      FORM_FIELD_PROPERTY,
                      formFieldIndex,
                      'options',
                      index,
                      'value'
                    )
                  )}
                  helperText={getFormikError(
                    formik.errors,
                    formik.touched,
                    FORM_FIELD_PROPERTY,
                    formFieldIndex,
                    'options',
                    index,
                    'value'
                  )}
                  placeholder="Option"
                  variant="outlined"
                  size="small"
                />
                <IconButton size="small" onClick={() => remove(index)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            ))}
            <IconButton size="small" onClick={() => push({ id: uuidv4(), value: '' })}>
              <Add fontSize="small" />
            </IconButton>
          </Fragment>
        )}
      </FieldArray>
      <IconButton size="small" onClick={handleClick}>
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default Dropdown;

