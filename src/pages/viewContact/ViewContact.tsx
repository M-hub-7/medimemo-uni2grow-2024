import phone from "../../assets/images/contact/white_call (1).svg";
import email from "../../assets/images/contact/white_mail (1).svg";
import localisation from "../../assets/images/contact/white_location_on (1).svg";
import notes from "../../assets/images/contact/notes.jpeg";
import phoneI from "../../assets/images/contact/phone.jpeg";
import emailI from "../../assets/images/contact/message.jpeg";
import localisationI from "../../assets/images/contact/location.jpeg";
import "./viewcContact.css";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import edit from "../../assets/images/contact/more_vert.svg";

export function ViewContact() {
  return (
    <>
      <div className="contenair">
        <div className="headerContainer">
          <Button type="button" sx={{ p: "10px" }} aria-label="arrowBack">
            <ArrowBackIcon sx={{ color: "black" }} />
          </Button>
          <Typography className="textTypography" paddingLeft={15}>
            New doctor
          </Typography>
          <Button type="button" sx={{ p: "10px" }} aria-label="arrowBack">
            <img src={phone} alt="telephone" className="imgbutton" />
          </Button>
        </div>
        <div className="viewinfo">
          <div className="headerpanel">
            <Button
              variant="contained"
              className="bouton1"
              sx={{ backgroundColor: "red" }}
            >
              <img src={phone} alt="telephone" className="imgbutton" />
              <Typography className="typographie">ring</Typography>
            </Button>
            <Button
              variant="contained"
              className="bouton2"
              sx={{ backgroundColor: "red", boxSizing: 40 }}
            >
              <img src={email} alt="telephone" className="imgbutton" />
              <Typography className="typographie">E-mail</Typography>
            </Button>
            <Button
              variant="contained"
              className="bouton3"
              sx={{ backgroundColor: "red" }}
            >
              <img src={localisation} alt="telephone" className="imgbutton" />
              <Typography className="typographie">view</Typography>
            </Button>
          </div>
          <div className="contentInfo">
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="error"
              sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
              name="phone"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={phoneI} alt="location" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="error"
              sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
              name="email"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={emailI} alt="location" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="error"
              sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
              name="address"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <div>
                        <img src={localisationI} alt="location" />
                      </div>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              color="error"
              sx={{
                width: "100%",
                color: "Primary",
                marginBottom: 2,
              }}
              className="notesTexfield"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={notes} alt="notes" className="imgnotes" />
                    </InputAdornment>
                  ),
                },
              }}
              defaultValue="mes notes ici lkhflhlhlkhdlhdhslkh"
            />
          </div>
        </div>
      </div>
    </>
  );
}
