import * as React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
interface TPropsCustomSwitches extends SwitchProps  {
  handleChange: () =>void
}

const CustomSwitches = (props:TPropsCustomSwitches) => {
  const {checked,handleChange, ...rests} = props
  //const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      {...rests}
    />
  );
}

export default CustomSwitches