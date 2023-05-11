import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper, { PaperProps } from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Draggable from "react-draggable";
import MultipleSelectChip from "./MultipleSelectChip";
import Selector from "./Selector";

interface Props {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

interface Participator {
  value: string;
  name: string;
}

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const CreateTaskDialog = (props: Props) => {
  const { isDialogOpen, handleDialogClose } = props;
  const [participators, setParticipators] = useState([1]);

  const handleParticipator = (add: boolean) => {
    if (add) {
      const arr = [...participators, 1];
      setParticipators(arr);
    } else {
      if (participators.length < 1) {
        return;
      }
      setParticipators(participators.slice(1));
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log(data.get("manager"));
    console.log(data.get("participatedTeam"));
    console.log(data.get("participator0"));
    console.log(data.get("participator1"));
    console.log(data.get("participator2"));
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        maxWidth="lg"
        onClose={handleDialogClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Project
        </DialogTitle>

        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Box
            component="form"
            // sx={{
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
            // noValidate
            // autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid sx={{ m: 3 }}>
              <Selector
                data={[
                  { value: "a", name: "a" },
                  { value: "b", name: "b" },
                ]}
                label={"manager"}
                width={300}
                id="manager"
              />
            </Grid>
            <Grid sx={{ m: 3 }}>
              <MultipleSelectChip
                label={"Participated Team"}
                data={["a", "b"]}
                id={"participatedTeam"}
              />
            </Grid>
            <Grid sx={{ m: 3 }}>
              <IconButton onClick={() => handleParticipator(true)}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => handleParticipator(false)}>
                <DeleteIcon />
              </IconButton>
              <br />
              {participators.map((participator, index) => (
                <Selector
                  data={[
                    { value: "a", name: "a" },
                    { value: "b", name: "b" },
                  ]}
                  label={`participator${index}`}
                  width={150}
                  id={`participator${index}`}
                />
              ))}
            </Grid>
            <Button type="submit">Create</Button>
          </Box>
        </DialogContent>

        <DialogActions>
          {/* <Button autoFocus onClick={handleDialogClose}>
            Cancel
          </Button> */}
          {/* <Button type="submit">Create</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
