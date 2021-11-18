import React from "react";
import { createPopper } from "@popperjs/core";
import router from "next/router";


const NotificationDropdown = (props) => {
  // dropdown props
  const {id,deleteFunction,editUrl,secondButtonTitle,firstButtonTitle,editTrainingUrl,approvedStudentUrl} = props;
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  async function deleteHandler(e){
    e.preventDefault();
    const flag = await deleteFunction(id)
    if(flag){
      closeDropdownPopover();
      window.location.reload();
    }
  }
  function editHandler(e){
    e.preventDefault();
    router.push(`${editUrl}${id}`)
  }
  function editTrainingHandler(e){
    e.preventDefault();
    router.push(`${editTrainingUrl}${id}`)
  }
  function approvedStudentHandler(e){
    e.preventDefault();
    router.push(`${approvedStudentUrl}${id}`)
  }
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"> </i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
        
      >
                <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={editTrainingHandler}
              >
                Edit Training
        </a>
        <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={approvedStudentHandler}
              >
                Liste des étudiants approuvés
        </a>
        {firstButtonTitle && 
                <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={editHandler}
              >
                {firstButtonTitle}
              </a>
        }
        {!firstButtonTitle && 
                <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={editHandler}
              >
               
              Éditer
              </a>
        }
        {secondButtonTitle && 
                <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={deleteHandler}
              >
                {secondButtonTitle}
              </a>
        }
        {!secondButtonTitle && 
                  <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  }
                  onClick={deleteHandler}
                >
                 
                Effacer
                </a>
        }

      </div>
    </>
  );
};

export default NotificationDropdown;
	