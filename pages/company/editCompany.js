import React from "react";
import {withProtected} from "backend/hook/routeProtector";
// components
import Admin from '../../layouts/Admin'

import {updateCompany , getCompanyById} from "pages/api/compnies";
import { useRouter } from "next/router";

function EditCompany({company}) {
  const router = useRouter();
  const [companyName, setCompanyName] = React.useState(company.companyName);
  const [companyEmail, setCompanyEmail] = React.useState(company.companyEmail);
  const [representativeName, setRepresentativeName] = React.useState(company.representativeName);
  const [companyPhone, setCompanyPhone] = React.useState(company.companyPhone);
  async function submitHandler(e) {
    e.preventDefault();
    company.companyName = companyName;
    company.companyEmail = companyEmail;
    company.companyPhone = companyPhone;
    company.representativeName = representativeName;
    const res= await updateCompany(company);
    if(res){
      router.push('/company')
    }
  }

  return (
    <>
    <Admin title="Add Company">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <form>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Informations sur la société</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={submitHandler}
            >
             SOUMETTRE
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
             Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    NOM DE LA COMPAGNIE
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ADRESSE E-MAIL
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    value={companyEmail}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   NOM DU REPRÉSENTANT
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setRepresentativeName(e.target.value)}
                    value={representativeName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    value={companyPhone}
                  />
                </div>
              </div>
            </div>
        </div>
        </form>
      </div>
    </Admin>
    </>
  );
}
export default withProtected(EditCompany)

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await getCompanyById(id)
  return {
      props: {
          company:data
      }, // will be passed to the page component as props
  }
}