import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/contact';

export const submitContact = async (contactData) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const updateContactStatus = async (contactId, newStatus) => {
  try {
    const response = await axios.patch(`${BASE_URL}/status/${contactId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
};