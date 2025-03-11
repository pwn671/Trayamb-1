import express from 'express';
import { createContact, getAllContacts, updateContactStatus } from '../controllers/Contact.js';
import { isAdmin } from '../middleware/CheckAdmin.js';

const ContactRoutes = express.Router();

ContactRoutes.post('/submit', createContact);
ContactRoutes.get('/all', getAllContacts);
ContactRoutes.patch('/status/:id', updateContactStatus);

export default ContactRoutes;
