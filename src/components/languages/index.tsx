import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material';

const ToggleLanguages = ()=>{
  const {i18n} = useTranslation();
  const [language, setLanguage] = React.useState<string>('');
  const handleChange = (event: SelectChangeEvent<typeof language>) => {
    const {
      target: { value },
    } = event;
     i18n.changeLanguage(value);
    setLanguage(
    value
    );
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
           onChange={handleChange}
        >
          <option value={'en'}>English</option>
          <option value={'vi'}>Viet Nam</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
export default ToggleLanguages