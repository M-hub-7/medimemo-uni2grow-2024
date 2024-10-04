import phone from "../../assets/images/contact/phone.jpeg";

import { Button, Typography } from "@mui/material";

export function ViewContact() {
  return (
    <>
      <div className="contenair">
        <div className="headerContenair">
          <Button variant="contained">
            <img src={phone} alt="telephone" />
            <Typography>ring</Typography>
          </Button>
        </div>
      </div>
    </>
  );
}
