import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import "./AddEditContact.css";
import stethoscope from "../../../assets/images/contact/stethoscope.svg";
import speciality from "../../../assets/images/contact/speciality.jpeg";
import phone from "../../../assets/images/contact/phone.jpeg";
import email from "../../../assets/images/contact/message.jpeg";
import location from "../../../assets/images/contact/location.jpeg";
import note from "../../../assets/images/contact/notes.jpeg";
import save from "../../../assets/images/contact/save.svg";
import { useEffect, useState } from "react";
import { IContact } from "../../../models/Contact";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";

export function AddEditContact() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Vous devez remplir le champ nom"),
    profession: Yup.string().required("Vous devez remplir le champ speciality"),
    email: Yup.string().email("Email non valide"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Doit être un numéro valide")
      .required("Vous devez remplir le champ numéro"),
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
  function handleOnFocus(field: keyof IContact) {
    setEnable((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }
  const navigate = useNavigate();
  const locationID = useLocation();
  const { id } = locationID.state || "";
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchContactById = async (contactId: string) => {
        try {
          const response = await fetch(`
            http://localhost:3000/contacts/${contactId}`);
          const data: IContact = await response.json();
          formik.setValues({
            name: data.name || "",
            notes: data.notes || "",
            profession: data.profession || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
          });
        } catch (error) {
          console.error("Failed to fetch contact", error);
        }
      };
      fetchContactById(id!);
    }
  }, [id, isEditing]);

  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const newContact = {
          name: values.name,
          notes: values.notes,
          qualification: "Dr",
          profession: values.profession,
          phone: values.phone,
          email: values.email,
          address: values.address,
        };

        let response;
        if (isEditing) {
          response = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
          });
        } else {
          response = await fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
          });
        }

        if (response.ok) {
          formik.resetForm();
          const savedContact = await response.json();
          navigate("/contacts", { state: { newContact: savedContact } });
        } else {
          alert("Erreur lors de l'ajout du contact.");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    },
  });
  let title;
  if (isEditing) {
    title = "Edit doctor";
  } else {
    title = "New doctor";
  }

  return (
    <>
      <Header
        title={title}
        showBackButton={true}
        onBackButtonClick={() => {
          navigate("/contacts");
        }}
      />

      <div className="formContainer">
        <div className="infofield">
          <div className="textfieldContenair">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="name"
                  color="error"
                  name="name"
                  label={labelEnable.name ? "Name" : ""}
                  onFocus={() => handleOnFocus("name")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{
                    width: "100%",
                    color: "Primary",
                    marginBottom: 2,
                  }}
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
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="profession"
                  color="error"
                  placeholder="specialty"
                  label={labelEnable.profession ? "Specialty" : ""}
                  onFocus={() => handleOnFocus("profession")}
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.profession &&
                    Boolean(formik.errors.profession)
                  }
                  helperText={
                    formik.touched.profession && formik.errors.profession
                  }
                  sx={{
                    width: "100%",
                    color: "Primary",
                    marginBottom: 2,
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={speciality} alt="speciality" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  color="error"
                  name="phone"
                  placeholder="Phone number"
                  label={labelEnable.phone ? "Phone number" : ""}
                  onFocus={() => handleOnFocus("phone")}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  sx={{
                    width: "100%",
                    color: "Primary",
                    marginBottom: 2,
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={phone} alt="location" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  color="error"
                  name="email"
                  placeholder="E-mail"
                  label={labelEnable.email ? "E-mail" : ""}
                  onFocus={() => handleOnFocus("email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{
                    width: "100%",
                    color: "Primary",
                    marginBottom: 2,
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={email} alt="location" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  color="error"
                  name="address"
                  placeholder="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={labelEnable.address ? "Address" : ""}
                  onFocus={() => handleOnFocus("address")}
                  sx={{
                    width: "100%",
                    color: "Primary",
                    marginBottom: 2,
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={location} alt="location" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  color="error"
                  name="notes"
                  placeholder="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                  label={labelEnable.notes ? "Notes" : ""}
                  onFocus={() => handleOnFocus("notes")}
                  sx={{
                    width: "100%",
                    color: "Primary",
                    marginBottom: 2,
                  }}
                  multiline
                  maxRows={4}
                  slotProps={{
                    input: {
                      sx: { display: "flex", alignItems: "start" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={note} alt="notes" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <div className="saveContainer">
                  <Button
                    className="saveButton"
                    type="submit"
                    sx={{
                      backgroundColor: "#F00",
                      borderRadius: 4,
                      padding: 1,
                    }}
                  >
                    <img alt="save-icon" src={save} />
                    <Typography className="saveText">Save</Typography>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
