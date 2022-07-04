import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
} from 'redux/operations/operations-contacts';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import selectors from 'redux/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Link from '@mui/material/Link';
import styles from './styles.module.css';
import { BsTelephone } from 'react-icons/bs';
import { IoIosContact } from 'react-icons/io';

const { getContactsStatus } = selectors;

export const ContactsItem = props => {
  const { id, name, number } = props;
  const dispatch = useDispatch();
  const deleting = useSelector(getContactsStatus) === 'deleting';
  const [isDeleting, setDeleting] = useState(deleting);

  const handleDeleteContact = async id => {
    setDeleting(true);
    dispatch(deleteContact(id))
      .unwrap()
      .then(res => {
        toast.success(`Contact "${name}" is deleting`);
        dispatch(fetchContacts())
          .unwrap()
          .then(() => {
            toast.success(`Contacts updated`);
          })
          .catch(() => {
            toast.error(`Contacts didn't updated`);
          });
      })
      .catch(error => {
        setDeleting(false);
        console.log(error.message);
        toast.error(`Contact "${name}" is not deleting`);
      });
  };
  return (
    <>
      <li className={styles.listItem}>
        <span className={styles.contactName}>
          <IoIosContact size={20} />: {name}{' '}
        </span>
        <span className={styles.phoneNumber}>
          <Link
            href={`tel:${number}`}
            color="blue"
            underline="hover"
            sx={{ display: 'flex' }}
          >
            <BsTelephone size={15} />
            <span> : </span>
            {number}
          </Link>
        </span>
        <button
          className={styles.buttons}
          onClick={() => handleDeleteContact(id)}
        >
          {isDeleting ? (
            <CircularProgress size={24} color="error" />
          ) : (
            <MdOutlineDeleteForever size={30} />
          )}
        </button>
      </li>
    </>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
