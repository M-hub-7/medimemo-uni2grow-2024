import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import "./contact.css";
import add_icon from "../../assets/icons/add_circle.svg";
import stethoscope from "../../assets/icons/stethoscope.svg";
import { ChangeEvent, useEffect, useState } from "react";

interface Contacts {
  id: Number;
  name: string;
  qualification: string;
  profession: string;
}

function isEmptyContact(item: Contacts[]): boolean {
  return item.length === 0;
}

export function Contacts() {
  const [show, setshow] = useState<Contacts[]>([]);

  const showContact = async (): Promise<void> => {
    try {
      const result = await fetch("http://localhost:3001/contacts");
      const datas = await result.json();

      setshow(datas);
    } catch (e) {
      console.error();
    }
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredContacts = show?.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    showContact();
  }, []);
  return (
    <>
      <div className="contenair">
        <div className="menu">
          <div className="title">
            {" "}
            <Typography className="typography" style={{ color: "black" }}>
              {" "}
              Contacts
            </Typography>
          </div>
          <div className="home">
            <div className="search-contenair">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 280,
                  backgroundColor: "#FFEFEF",
                  borderRadius: 20,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Therapy"
                  inputProps={{ "aria-label": "search google maps" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
            <div className="list-therapies">
              {isEmptyContact(show) ? (
                <Typography> no contact available</Typography>
              ) : (
                filteredContacts.map((shows) => (
                  <Paper
                    key={shows.id}
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 280,
                      backgroundColor: "#f4f4f4",
                      justifyContent: "space-between",
                      height: 50,
                    }}
                  >
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <img src={stethoscope} alt="stethoscope" />
                    </IconButton>
                    <div className="contactName">
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 700 }}
                        className="typography1"
                      >
                        {shows.qualification}. {shows.name}
                      </Typography>

                      <Typography
                        sx={{ fontSize: 10, fontWeight: 400 }}
                        className="typography2"
                      >
                        {shows.profession}
                      </Typography>
                    </div>
                    <div className="arrow_button"></div>
                    <IconButton
                      type="button"
                      sx={{
                        p: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "right",
                      }}
                      aria-label="search"
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Paper>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="add-contenair">
          <img src={add_icon} alt="boutton d'ajout" />
        </div>
      </div>
    </>
  );
}
