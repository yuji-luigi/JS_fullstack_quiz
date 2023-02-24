import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs, { Dayjs } from 'dayjs';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers';
import { Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
interface OptionInterface {
  id: string;
  label: string;
}
const ImportFilterForm = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

  const { control, setValue } = useFormContext();

  const currencyOptions = [
    { id: 'USD', label: 'USD' },
    { id: 'EUR', label: 'EUR' },
  ];
  const accountOptions = [
    { id: '1612660', label: '1612660:(Main)' },
    { id: '1612661', label: '1612661' },
  ];
  return (
    <Box sx={{ mt: 2 }}>
      <DatePicker
        label="Date of the file"
        value={date}
        onChange={newValue => {
          setDate(newValue);
          setValue('date', newValue);
        }}
        renderInput={params => <TextField {...params} />}
      />
      <Controller
        name="currency"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            sx={{ mt: 2 }}
            options={currencyOptions}
            getOptionLabel={(option: OptionInterface) => option.label || ''}
            onChange={(event, newValue) => {
              field.onChange(newValue?.id);
            }}
            defaultValue={{ id: '', label: '' }}
            renderOption={(props: any, option: OptionInterface) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
            renderInput={(params: any) => (
              <TextField
                label="Currency"
                {...field}
                error={!!error}
                {...params}
              />
            )}
          />
        )}
      />
      <Controller
        name="account"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            sx={{ mt: 2 }}
            options={accountOptions}
            getOptionLabel={(option: OptionInterface) => option.label || ''}
            onChange={(event, newValue) => {
              field.onChange(newValue?.id);
            }}
            defaultValue={{ id: '', label: '' }}
            renderOption={(props: any, option: OptionInterface) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
            renderInput={(params: any) => (
              <TextField
                label="Account"
                {...field}
                error={!!error}
                {...params}
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default ImportFilterForm;
