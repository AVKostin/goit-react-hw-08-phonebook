import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import {
    Avatar,
    Container,
    Typography,
    Button,
    TextField,
    Box,
    Tooltip,
} from "@mui/material";
import {
    addContact,
    fetchContacts,
} from "redux/operations/operations-contacts";
import selectors from "redux/selectors";
import { LoaderButton } from "components/LoaderButton";
import styles from "../ContactForm/ContactForm.module.css";

const { getContacts, getContactsStatus } = selectors;

const NAME_REGEX = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const NUMBER_REGEX = /^\+?[0-9]?[0-9]?([0-9]{10})$/;

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const isCreating = useSelector(getContactsStatus) === "creating";
    const [values, setValues] = useState({
        name: "",
        number: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        number: "",
    });

    const reset = () => {
        setValues({
            name: "",
            number: "",
        });
    };
    const validationField = (name, value, regex) => {
        if (value.match(regex)) {
            setValues({
                ...values,
                [name]: value,
            });
            setErrors({
                ...errors,
                [name]: "",
            });
            return true;
        } else {
            if (value) {
                setValues({
                    ...values,
                    [name]: value,
                });
                setErrors({
                    ...errors,
                    [name]: `wrong ${name}`,
                });
                return false;
            } else {
                setValues({
                    ...values,
                    [name]: value,
                });
                setErrors({
                    ...errors,
                    [name]: `${name} is required`,
                });
                return false;
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case "name":
                validationField(name, value, NAME_REGEX);
                break;
            case "number":
                validationField(name, value, NUMBER_REGEX);
                break;
            default:
                return;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const hasName = contacts.find(
            (contact) => contact.name === values.name,
        );
        const hasNumber = contacts.find(
            (contact) => contact.number === values.number,
        );
        if (hasName) {
            toast.warn(`Name is already in contacts.`);
            return;
        }
        if (hasNumber) {
            toast.warn(`Number is already in contacts.`);
            return;
        }
        if (
            validationField("name", values.name, NAME_REGEX) &&
            validationField("number", values.number, NUMBER_REGEX)
        ) {
            const contact = {
                name: values.name,
                number: values.number,
            };
            dispatch(addContact(contact))
                .unwrap()
                .then((res) => {
                    toast.success(`${res.name} is add in contacts.`);
                    dispatch(fetchContacts())
                        .unwrap()
                        .then(() => {
                            toast.success(`Contacts updated`);
                        })
                        .catch(() => {
                            toast.error(`Contacts didn't updated`);
                        });
                    reset();
                })
                .catch(() => {
                    toast.error(`${values.name} isn't add in contacts.`);
                });
        }
    };
    return (
        <Container component="div" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div className={styles.titleName}>
                    <Avatar sx={{ m: 1, bgcolor: "orange" }}>
                        <ImportContactsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Phonebook
                    </Typography>
                </div>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        mt: 3,
                    }}
                >
                    <Tooltip title="Name may contain only letters, apostrophe, dash and spaces">
                        <TextField
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                            fullWidth
                            id="name"
                            name="name"
                            value={values.name}
                            label="Name"
                            autoComplete="name"
                            onChange={handleChange}
                        />
                    </Tooltip>
                    <Tooltip title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +">
                        <TextField
                            margin="normal"
                            error={!!errors.number}
                            helperText={errors.number}
                            required
                            fullWidth
                            id="number"
                            name="number"
                            value={values.number}
                            type="tel"
                            label="Number"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                    </Tooltip>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            ":hover": {
                                bgcolor: "rgba(39, 183, 35, 0.459)",
                                color: "black",
                            },
                            color: "black",
                            backgroundColor: "#e4f9f5fa",
                            borderColor: "green",
                        }}
                    >
                        {isCreating ? <LoaderButton /> : "Add Contact"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
