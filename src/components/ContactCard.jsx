import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import { db } from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclose from '../hooks/useDisclose'

const ContactCard = ({contact}) => {

  const {isOpen , onOpen , onClose} = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db,"contacts", id));
    } catch (error) {
      console.log(error);
      
    }
    
  }
  


  return  (<div>
        {contact.map((contact) => {
          return <div key={contact.id} className='flex bg-yellow-200 mt-4 justify-center items-center p-2 rounded-lg'>
            <FaRegUserCircle color='
            black' size={40}/>
            <div className='flex flex-col w-[98%] px-4 '>
              <h2 className='font-semibold'>{contact.Name}</h2>
              <p className='font-light'>{contact.Email}</p>              
            </div>
            <div className='flex gap-4'>
                <MdEdit onClick={() => {
                  onOpen();
                }
                 } className='cursor-pointer' size={25}/>
              <MdDelete className='cursor-pointer' onClick={() => { deleteContact(contact.id)
                
              }
              }
               size={25}/>

            </div>
            <AddAndUpdateContact isUpdate={} isOpen={isOpen} onClose={onClose}/>
          </div>
          
        }
      )}
      </div>
    )
  
}



export default ContactCard

