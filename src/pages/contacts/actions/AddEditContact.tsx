import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AddEditContact.css";
import stethoscope from "../../../assets/images/contact/stethoscope.svg";
import speciality from "../../../assets/images/contact/speciality.jpeg";
import phone from "../../../assets/images/contact/phone.jpeg";
import email from "../../../assets/images/contact/message.jpeg";
import location from "../../../assets/images/contact/location.jpeg";
import note from "../../../assets/images/contact/notes.jpeg";
import save from "../../../assets/images/contact/save.svg";
import { useState } from "react";
import {
  formError,
  formValues,
  validateContactForm,
  validationContactField,
} from "../../../utils/validationAddEditContact";
import { IContact } from "../../../models/Contact";
import { useNavigate } from "react-router-dom";

export function AddEditContact() {
  const [contact, setContact] = useState<formValues>({
    name: "",
    notes: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<formError>({
    name: "",
    notes: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
  });

  const [labelEnable, setEnable] = useState({
    name: false,
    notes: false,
    profession: false,
    phone: false,
    email: false,
    address: false,
    note: false,
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationContactField(fieldName, value);

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: error || "",
    }));

    setContact({
      ...contact,
      [fieldName]: value,
    });
  };
  function handleOnFocus(field: keyof IContact) {
    setEnable((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validate the entire form before proceeding
    const validationErrors = validateContactForm(contact);

    // If there are validation errors, update the errors state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors to the state
      return; // Stop submission if validation fails
    }

    try {
      const newContact: IContact = {
        name: contact.name,
        notes: contact.notes,
        qualification: "Dr",
        profession: contact.profession,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
      };

      // If validation passes, make the API call to submit the data
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });
      console.log(newContact);

      if (response.ok) {
        setContact({
          name: "",
          notes: "",
          profession: "",
          phone: "",
          email: "",
          address: "",
        });
        const savedContact = await response.json(); // Get the saved contact with the ID
        navigate("/contacts", { state: { newContact: savedContact } }); // Pass the new contact
      } else {
        alert("Error adding contact.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="contenair">
        <div className="headerContainer">
          <IconButton type="button" sx={{ p: "10px" }} aria-label="arrowBack">
            <ArrowBackIcon />
          </IconButton>
          <Typography className="textTypography" paddingLeft={15}>
            New doctor
          </Typography>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit} className="formcolor">
            <div className="textfieldContenair">
              <TextField
                id="outlined-basic"
                onChange={handleChange}
                label={labelEnable.name ? "Name" : ""}
                onFocus={() => handleOnFocus("name")}
                variant="outlined"
                placeholder="name"
                color="error"
                name="name"
                value={contact.name}
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={stethoscope} alt="stethoscope" />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            fontStyle: "normal",
                            color: "#444",
                          }}
                          paddingLeft={2}
                        >
                          Dr.{" "}
                        </Typography>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="error"
                placeholder="specialty"
                onChange={handleChange}
                label={labelEnable.profession ? "Specialty" : ""}
                onFocus={() => handleOnFocus("profession")}
                name="profession"
                value={contact.profession}
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={speciality} alt="speciality" />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.profession}
                helperText={errors.profession}
              />
              <TextField
                id="outlined-basic"
                label={labelEnable.phone ? "Phone number" : ""}
                onFocus={() => handleOnFocus("phone")}
                variant="outlined"
                color="error"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                name="phone"
                placeholder="Phone number"
                value={contact.phone}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={phone} alt="location" />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                id="outlined-basic"
                label={labelEnable.email ? "E-mail" : ""}
                onFocus={() => handleOnFocus("email")}
                variant="outlined"
                color="error"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                name="email"
                placeholder="E-mail"
                value={contact.email}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={email} alt="location" />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                id="outlined-basic"
                label={labelEnable.address ? "Address" : ""}
                onFocus={() => handleOnFocus("address")}
                variant="outlined"
                color="error"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                name="address"
                placeholder="address"
                value={contact.address}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={location} alt="location" />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.address}
                helperText={errors.address}
              />

              <TextField
                id="outlined-basic"
                label={labelEnable.notes ? "Notes" : ""}
                onFocus={() => handleOnFocus("notes")}
                variant="outlined"
                color="error"
                sx={{ width: "100%", color: "Primary", marginBottom: 2 }}
                name="notes"
                placeholder="notes"
                value={contact.notes}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={note} alt="notes" />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.notes}
                helperText={errors.notes}
              />
            </div>
            <div className="saveContainer">
              <Button
                className="saveButton"
                type="submit"
                sx={{ backgroundColor: "#F00", borderRadius: 4, padding: 1 }}
              >
                <img alt="save-icon" src={save} />
                <Typography className="saveText">Save</Typography>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
