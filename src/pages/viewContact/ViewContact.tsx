import phone from "../../assets/images/contact/white_call (1).svg";
import email from "../../assets/images/contact/white_mail (1).svg";
import localisation from "../../assets/images/contact/white_location_on (1).svg";
import notes from "../../assets/images/contact/notes.jpeg";
import phoneI from "../../assets/images/contact/phone.jpeg";
import emailI from "../../assets/images/contact/message.jpeg";
import localisationI from "../../assets/images/contact/location.jpeg";
import "./viewcContact.css";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IContact } from "../../models/Contact";
import Header from "../../components/header/Header";
import { EditViewBox } from "../editBox/EditViewBox";

export function ViewContact() {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID comme une chaîne de caractères
  const [contact, setContact] = useState<IContact>({
    id: "",
    name: "",
    notes: "",
    qualification: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
  }); // L'utilisateur peut être de type contact ou null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contactName: string = `${contact.qualification}.${contact.name}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/contacts/${id}`) // Simuler une API qui retourne un utilisateur spécifique par ID
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des détails de l'utilisateur"
            );
          }
          return response.json();
        })
        .then((data: IContact) => {
          setContact(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBackButton = () => {
    navigate("/contacts");
  };
  const editroute: string = `/addeditcontact`;

  const deleteRoute: string = `http://localhost:3000/contacts/${id}`;

  return (
    <>
      <Header
        title={contactName}
        showBackButton={true}
        showRightButton={true}
        onBackButtonClick={handleBackButton}
        RightButton={
          <EditViewBox edit={editroute} delete={deleteRoute} id={id} />
        }
      />
      <div className="divProf">
        <Typography
          variant="button"
          height={22}
          sx={{
            fontSize: 14,
            fontWeight: 400,
            textAlign: "center",
            paddingBottom: 2,
            color: "#444",
          }}
        >
          {contact?.profession}
        </Typography>
      </div>

      <div className="viewinfo">
        <div className="boxDiv">
          <div className="box">
            <img src={phone} alt="telephone" className="imgbutton" />
            <Typography className="typographie">ring</Typography>
          </div>

          <div className="box">
            <img src={email} alt="telephone" className="imgbutton" />
            <Typography className="typographie">E-mail</Typography>
          </div>
          <div className="box">
            <img src={localisation} alt="telephone" className="imgbutton" />
            <Typography className="typographie">view</Typography>
          </div>
        </div>
        <div className="bodyForm">
          <div className="doctorProps">
            <img src={phoneI} alt="call" />
            <Typography
              sx={{
                paddingTop: 0.1,
                // fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.phone}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={emailI} alt="email" />
            <Typography
              sx={{
                paddingTop: 0.1,
                // fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.email}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={localisation} alt="location" />
            <Typography
              sx={{
                paddingTop: 0.1,
                // fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.address}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={phoneI} alt="call" />
            <Typography
              sx={{
                paddingTop: 0.1,
                // fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.phone}
            </Typography>
          </div>{" "}
          <div className="doctorProps">
            <img src={notes} alt="notes" />
            <Typography
              sx={{
                paddingTop: 0.1,
                // fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2,
              }}
            >
              {contact?.notes}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
