import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  multipleValue: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      multipleValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  label: string;
  data: string[];
  id: string;
}

export default function MultipleSelectChip({ id, label, data }: Props) {
  const theme = useTheme();
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof multipleValue>) => {
    const {
      target: { value },
    } = event;
    setMultipleValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200, width: 600 }}>
      <InputLabel id={id} sx={{ backgroundColor: "white", padding: "0 7px" }}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        id={id}
        multiple
        value={multipleValue}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {data.map((value) => (
          <MenuItem
            key={value}
            value={value}
            style={getStyles(value, multipleValue, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
