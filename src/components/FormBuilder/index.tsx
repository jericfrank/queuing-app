import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Formik, Form, FieldArray } from 'formik';
 
import { IconButton, Stack, Box, Grid, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import { FORM_FIELD_PROPERTY, SUPPORTED_FORM_FIELDS } from './constants';
import { FormFieldProps, FormFieldType, FormValues } from './types';
import TextField from './Fields/TextField';
import Dropdown from './Fields/Dropdown';

type FieldSectionProps = {
  name: string;
  type: FormFieldType;
  onClick: (type: FormFieldType) => void;
}

function FieldSection({ name, type, onClick }: FieldSectionProps) {
  const handleClick = useCallback(() => {
    onClick(type);
  }, [type, onClick]);

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey', borderRadius: 2, m: 1 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
        <IconButton aria-label="delete" onClick={handleClick}>
          <Add />
        </IconButton>
        <Typography noWrap>{name}</Typography>
      </Stack>
    </Box>
  );
}

type Props = {
  field: FormFieldProps;
  formFieldIndex: number;
  onClickRemove: (field: FormFieldProps) => void;
};

function DisplayField({ field, formFieldIndex, onClickRemove }: Props) {
  const { type } = field;

  switch (type) {
    case 'text':
      return <TextField formFieldIndex={formFieldIndex} field={field} onClickRemove={onClickRemove} />;
    case 'select':
      return <Dropdown formFieldIndex={formFieldIndex} field={field} onClickRemove={onClickRemove} />;
    default:
      return null;
  }
}

export const validationSchema = Yup.object().shape({
  [FORM_FIELD_PROPERTY]: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Type is required'),
        value: Yup.string().required('Value is required'),
        options: Yup.lazy((_, ctx) =>
          ctx.parent.type === 'select'
            ? Yup.array()
                .of(
                  Yup.object().shape({
                    value: Yup.string().required('Option value is required'),
                  })
                )
                .min(1, 'At least one option is required')
            : Yup.mixed().notRequired()
        ),
      })
    )
    .required('At least one form field is required'),
});

export default function FormLayout() {
  const handleAddField = useCallback((type: FormFieldType, push: any) => {
    push({
      id: uuidv4(),
      type,
      value: '',
      ...(type === 'select' ? {options: [
        {
          id: uuidv4(),
          value: ''
        },
      ]} : [])
    })
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{
        [FORM_FIELD_PROPERTY]: [
          { id: uuidv4(), type: 'text', value: '' }
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {(formik) => (
        <Form>
          <FieldArray name={FORM_FIELD_PROPERTY}>
            {({ push, remove }) => (
              <Grid container spacing={4}>
                <Grid size={3}>
                  {SUPPORTED_FORM_FIELDS.map(({ name, type }) => (
                    <FieldSection
                      key={type}
                      name={name}
                      type={type}
                      onClick={(type: FormFieldType) => handleAddField(type, push)}
                    />
                  ))}
                </Grid>
                <Grid size={9}>
                  {formik.values[FORM_FIELD_PROPERTY].map((field, formFieldIndex) => (
                    <DisplayField
                      key={`${field.type}.${formFieldIndex}`}
                      field={field}
                      onClickRemove={() => remove(formFieldIndex)}
                      formFieldIndex={formFieldIndex}
                    />
                  ))}
                  {formik.values[FORM_FIELD_PROPERTY]?.length > 0 && (
                    <Button type="submit" variant="contained" color="primary">
                      Update
                    </Button>
                  )}
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
}
