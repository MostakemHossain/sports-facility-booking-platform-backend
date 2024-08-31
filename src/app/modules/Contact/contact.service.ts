import { TContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContact = async (payload: TContact) => {
  const result = await Contact.create(payload);
  return result;
};
const getAllContact = async () => {
  const result = await Contact.find();
  return result;
};
const deleteContact = async (id: string) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

export const contactService = {
  createContact,
  getAllContact,
  deleteContact,
};
