import React from "react";
import PropTypes from "prop-types";
// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import router from "next/router";

export default function CardTable({values,title,editUrl,deleteFunction,addUrl,renderBody,firstButtonTitle,secondButtonTitle}) {
  const allValues = values
  const headersList = Object.keys(allValues[0])
  const headers = headersList.map((header, index) => {
    const result = header.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  })
  delete headers[0]
  const val = []
  const ids = []
  for (let i = 0; i < allValues.length; i++) {
    val.push(Object.values(allValues[i]))

  }
  for(let i = 0; i < val.length; i++) {
    ids.push(val[i][0])
    delete val[i][0]
  }
  const color = "light";

 function addCompanyHandler(e) {
    e.preventDefault()
    router.push(addUrl)
  }

  return (
    <>
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
                {title}
              </h3>
            </div>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={addCompanyHandler}
            >
              Add Company
            </button>
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

                    <TableDropdown id = {ids[index]} deleteFunction = {deleteFunction} editUrl={editUrl} firstButtonTitle = {firstButtonTitle} secondButtonTitle = {secondButtonTitle}/>
                  </td>
                </tr>
              ))}
            </tbody>
            }
          </table>
        </div>
      </div>
    </>
  );
}
