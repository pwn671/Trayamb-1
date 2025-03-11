import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newContact = new Contact({ name, email, phone, subject, message });
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully',
      data: savedContact
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error submitting contact', error: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving contacts', error: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['Pending', 'Reviewed', 'Resolved'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, message: 'Contact status updated successfully', data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact status', error: error.message });
  }
};
