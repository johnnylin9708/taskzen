import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface props {
  id: string;
  label: string;
  data: { name: string; value: string }[];
  width: number;
}

export default function Selector({ id, label, data, width }: props) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: width }} size="small">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        name={label}
        id={id}
        labelId={id}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {data.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
