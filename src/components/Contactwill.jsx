import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import { db } from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclose from '../hooks/useDisclose'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Contactwill = ({id , Email , Name}) => {

  const {isOpen , onOpen , onClose} = useDisclose();
  const [isUpdate, setIsUpdate] = useState(false);

  const Updated = () => {
    setIsUpdate(true);
  }
  

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db,"contacts", id));
      toast.success("Deleted Sucessfully ")
    } catch (error) {
      console.log(error);
      
    }
    
  }
  


  return  ( <div key={id} className='flex bg-yellow-200 mt-4 justify-center items-center p-2 rounded-lg'>
            <FaRegUserCircle color='
            black' size={40}/>
            <div className='flex flex-col w-[98%] px-4 '>
              <h2 className='font-semibold'>{Name}</h2>
              <p className='font-light'>{Email}</p>              
            </div>
            <div className='flex gap-4'>
                <MdEdit onClick={() => {
                  onOpen();
                  Updated();
                  
                }
                 } className='cursor-pointer' size={25}/>
              <MdDelete className='cursor-pointer' onClick={() => { deleteContact(id)
                
              }
              }
               size={25}/>

            </div>
            <AddAndUpdateContact name={Name} Email={Email} id={id} isUpdate={isUpdate} isOpen={isOpen} onClose={onClose}/>
          </div>
          
        
      
    )
  
}



export default Contactwill

