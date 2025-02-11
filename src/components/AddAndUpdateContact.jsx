import React from "react";
import Modal from "./Modal";
import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
  Name: Yup.string().required("Name is Required"),
  Email: Yup.string().email("Invalid Email").required("Email is Required"),

  
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, name, Email , id }) => {
  

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Added Succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose()
      toast.success("Updated Succesfully");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  Name: name,
                  Email: Email,
                }
              : {
                  Name: "",
                  Email: "",
                }
          }
          onSubmit={(val) => {
            console.log(val); 
            isUpdate ? UpdateContact( val, id): addContact(val);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="Name">Name</label>
              <Field name="Name" className="border h-[35px] p-2" />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="Name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Eail">E-Mail</label>
              <Field name="Email" className="border h-[35px] p-2" />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="Email"/>
              </div>
            </div>
            <button
              
              className="bg-orange-300 self-end mt-2 font-semibold px-3 py-1.5 border "
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
