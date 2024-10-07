import { CheckCircle, CircleOutlined } from "@mui/icons-material"
import { alpha, Avatar, Checkbox, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import { IDose } from "../../models/Dose"
import pill from "../../assets/images/medications/pill.svg";

interface DoseProps {
    item: IDose
    handleToggle: (dose: IDose) => void;
    handleClick: (dose: IDose) => void;
}


function ShowDose(props: DoseProps) {
    const labelId = `checkbox-list-primary-label-${props.item.id}`;

    return (

        <ListItem
            key={props.item.id}
            disablePadding
            sx={{ bgcolor: "#F4F4F4" }}
        >
            <ListItemButton
                sx={{
                    backgroundColor: props.item.taken ? alpha("#4DD8A7", 0.1) : "transparent",
                }}
                role={undefined}
                onClick={() => props.handleClick(props.item)}
                dense
            >
                <ListItemAvatar>
                    <Avatar alt="pill" src={pill} />
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant="body2">{props.item.therapyName}</Typography>}
                    secondary={"conjunctivis"}
                />
                <div>
                    <Typography
                        variant="caption"
                        sx={{
                            p: "5px",
                            bgcolor: "white",
                            borderRadius: "15px",
                            cursor: "pointer"
                        }}
                    >{props.item.time}</Typography>
                    <Checkbox
                        icon={<CircleOutlined sx={{ color: "#4DD8A7" }} />}
                        checkedIcon={<CheckCircle sx={{ color: "#4DD8A7" }} />}
                        edge="end"
                        checked={props.item.taken}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </div>
            </ListItemButton>
        </ListItem>
    )
}

export default ShowDose
