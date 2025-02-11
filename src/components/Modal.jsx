import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(<>
      {isOpen && (
        <div  className="flex place-items-center absolute top-0 h-screen w-screen backdrop-blur z-40 justify-center items-center " >
          <div className="z-50 relative bg-white m-auto  min-w-[330px] min-h-[250px] p-4 rounded-md">
            <div className="flex justify-end ">
              <AiOutlineClose onClick={onClose} color="black" size={25} />
            </div>
            {children}
          </div>
          <div />
        </div>
      )}
    </>
  ,document.getElementById("modal-root")
);
};

export default Modal;
