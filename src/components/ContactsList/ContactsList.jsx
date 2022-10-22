import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Container, TextField, Tooltip, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoaderPage from "components/LoaderPage";
import { ContactsItem } from "./ContactsItem";
import selectors from "redux/selectors";
import { fetchContacts } from "redux/operations/operations-contacts";
import { setFilterValue } from "redux/slice/contactsSlice";
import styles from "./ContactsItem/styles.module.css";

const { getContactsStatus, getFilterValue, getFilteredContacts } = selectors;

export const ContactsList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchContacts())
            .unwrap()
            .then(() => {
                toast.success(`Contacts updated`);
            })
            .catch(() => {
                toast.error(`Contacts didn't updated`);
            });
    }, [dispatch]);
    const contacts = useSelector(getFilteredContacts);
    const ContactsStatus = useSelector(getContactsStatus);
    const isLoading = ContactsStatus === "loading";
    const value = useSelector(getFilterValue);
    const handleFilterValue = (event) => {
        dispatch(setFilterValue(event.target.value));
    };
    return (
        <Container component="div" maxWidth="xs">
            {isLoading && <LoaderPage />}
            <Tooltip title="Find contacts. Please enter a name or number for search.">
                <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="name"
                    name="name"
                    value={value}
                    label="Enter a search name or number"
                    autoComplete="name"
                    onChange={handleFilterValue}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
            </Tooltip>
            <ul className={styles.contactsList}>
                {contacts.map(({ id, name, number }) => (
                    <ContactsItem
                        key={id}
                        name={name}
                        number={number}
                        id={id}
                    />
                ))}
            </ul>
        </Container>
    );
};
