import React from "react";
import { db } from "./config/firebase";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import Contactwill from "./components/Contactwill";
import NoContact from "./components/NoContact";

const App = () => {
  const [contact, setcontact] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");
        

        onSnapshot(contactRef , (snapshot) =>{

          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          console.log(contactList);
          setcontact(contactList);
          return contactList;
        });

      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts =(e) => {
    const value = e.target.value;
    const contactRef = collection(db, "contacts");
        
        onSnapshot(contactRef , (snapshot) =>{

          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const filteredContacts = contactList.filter((contact) => {
            return contact.Name.toLowerCase().includes(value.toLowerCase());
            
          }
          )
          // console.log(contactList);
          setcontact(filteredContacts);
          return filteredContacts;
        });

    
  }
  

  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <Navbar />
        <div className="relative flex items-center  gap-2 ">
          <FiSearch color="white" className="absolute ml-2" size={25} />
          <input
           onChange={filterContacts}
            type="text"
            className="flex-grow text-white px-12 rounded-lg
         border-white border h-[40px]"
            name=""
            id=""
          />
          <div>
            <FaCirclePlus
              onClick={onOpen}
              color="white"
              className="cursor-pointer"
              size={30}
            />
          </div>
        </div>
        <div>
          {contact.length==0? <NoContact/>: contact.map((contact) => {
            return <Contactwill id={contact.id} Name={contact.Name} Email={contact.Email} /> ;
          })}
        </div>
         
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer/>
    </>
  );
};

export default App;
