import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IModalDelete } from "../../models/Delete";
import { Typography } from "@mui/material";
import "./deleteBox.css";

export function DeleteBox(props: IModalDelete) {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onDesagree}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: { borderRadius: "25px", bgcolor: "#f8f4f4" },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="title">
            {props.icon}
            <Typography fontWeight={700} fontSize={30} textAlign={"center"}>
              {props.title}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="buttonstyle">
            <Button
              onClick={props.onDesagree}
              autoFocus
              sx={{ color: "black" }}
            >
              {props.desagreeIcon} {props.desagreeMessage}
            </Button>
            <Button autoFocus onClick={props.onAgree} sx={{ color: "red" }}>
              <div className="agreeIcon">
                {props.agreeIcon} {props.agreeMessage}
              </div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
