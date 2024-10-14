import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { IEditBox } from "../../models/EditBox";
import { useNavigate } from "react-router-dom";
import { DeleteBox } from "../../components/deletebox/DeleteBox";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import "./editBox.css";
import { Height } from "@mui/icons-material";

export function EditViewBox(props: IEditBox): JSX.Element {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    if (props.edit) {
      navigate(props.edit); // Utilise la prop edit pour naviguer
    }
  };

  const handleShow = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpenModal(true);
  };
  const handleExit = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    if (props.delete) {
      try {
        const response = await fetch(props.delete, {
          method: "DELETE",
        });

        if (response.ok) {
          // Suppression réussie, on met à jour l'état local
          navigate("/contacts");
        } else {
          alert("erreur de suppression");
        }
      } catch (error) {
        console.error("Erreur lors de la connexion à l'API", error);
      }
    }
  };

  return (
    <>
      <div className="edit" onClick={handleClick}>
        <MoreVertIcon />
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          edit
        </MenuItem>
        <MenuItem onClick={handleShow}>
          <ListItemIcon>
            <ClearIcon />
          </ListItemIcon>
          delete
        </MenuItem>
      </Menu>

      {openModal && (
        <DeleteBox
          title="deletion confirmation "
          open={openModal}
          body="Do you really want to delete this contact? Allentered data wil be lost and cannot be recovered."
          agreeMessage="delete"
          desagreeMessage="back"
          onAgree={handleDelete}
          onDesagree={handleExit}
          desagreeIcon={
            <ArrowBackIosNewIcon
              sx={{
                width: "15px",
                height: "15px",
                marginRight: "5px",
              }}
            />
          }
          agreeIcon={
            <ClearIcon
              sx={{
                width: "15px",
                height: "15px",
                marginRight: "5px",
              }}
            />
          }
          icon={<ReportGmailerrorredIcon />}
        />
      )}
    </>
  );
}
