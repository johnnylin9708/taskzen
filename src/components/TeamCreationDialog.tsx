import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper, { PaperProps } from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Draggable from "react-draggable";
import { createTeam } from "API";

interface Props {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  handleGetTeamsAPI: () => void;
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

const TeamCreationDialog = (props: Props) => {
  const { isDialogOpen, handleDialogClose, handleGetTeamsAPI } = props;

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const teamInfo = {
      name: data.get("name")?.toString(),
      description: data.get("description")?.toString(),
    };

    const response = await createTeam(teamInfo);

    if (response.message === "created") {
      handleDialogClose();
      handleGetTeamsAPI();
    }
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
          Team
        </DialogTitle>
        <Box
          component="form"
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
          // noValidate
          // autoComplete="off"
          onSubmit={handleSubmit}
        >
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}

            <Grid sx={{ m: 3 }}>
              <TextField required id="name" name="name" label="Name" />
            </Grid>
            <Grid sx={{ m: 3 }}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
              />
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default TeamCreationDialog;
