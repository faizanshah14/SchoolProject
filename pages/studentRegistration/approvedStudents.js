import React from "react";
import CardTable from '../../components/Cards/whiteTable'
import {withProtected} from "backend/hook/routeProtector";
// components
import Admin from '../../layouts/Admin'

import { getApprovedStudentTrainingsByTrainingId , deleteStudentTraining } from '../api/studentRegistration';

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import router from "next/router";

function Application({studentRegistration,renderBody}){
        const allValues = studentRegistration
        const headers = ['First Name', 'Last Name','DOB','Nationality','Email','Phone Number', 'Application Status']
        const val = []
        const ids = []
        allValues.map((value) =>{
            const {firstName, lastName, email, phoneNumber,dob, nationality,applicationStatus} = value
            val.push(Object.values({firstName, lastName, email, phoneNumber,dob,nationality, applicationStatus}));
            ids.push(value.id)
        })
        const color = "light";  
        return (
          <Admin title="Applicant List">
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
              }
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3
                      className={
                        "font-semibold text-lg " +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }
                    >
                      List Of Applications
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                        }
                      >
                        #
                      </th>
                      {headers.map((header, index) => (
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                          }
                        >
                          {header}
                        </th>
                      ))}
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                        }
                      ></th>
                    </tr>
                  </thead>
                  {renderBody && 
                  <tbody>
                    {val.map((value, index) => (
                      <tr>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {index + 1}
                        </td>
                        {value.map((vall, index) => (
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {vall}
                          </td>
                        ))}
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
      
                          <TableDropdown id = {ids[index]} deleteFunction = {deleteStudentTraining} editUrl={'/studentRegistration/viewApplication?id='} firstButtonTitle = {'View Application'}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  }
                </table>
              </div>
            </div>
          </Admin>
        );
}
export default withProtected(Application)

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await getApprovedStudentTrainingsByTrainingId(id)
  let renderBody = true;
  if(data.length < 1){
    renderBody = false;
  }
  return {
      props: {
          studentRegistration: data,
          renderBody
      }, // will be passed to the page component as props
  }
}