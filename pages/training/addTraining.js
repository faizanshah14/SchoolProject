import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import {withProtected} from "backend/hook/routeProtector";
// components
import Admin from '../../layouts/Admin'

import {addTraining} from '../api/trainings';
import {getCourses} from '../api/courses';
import router from "next/router";

function AddTraining(props) {


  const options = props.courses;
  const training = {
    title: '',
    startDate: '',
    endDate: '',
    status: ''
}


  const [selected, setSelected] = useState([]);
  const [title, setTitle] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('')
  const [status, setStatus] = React.useState('');

  async function submitHandler(e) {
    e.preventDefault();
    training.title = title;
    training.startDate = startDate;
    training.endDate = endDate;
    training.status = status;
    training.courses = selected;
    training.applicants = 0;
    const res= await addTraining(training);
    if(res){
      router.push('/training')
    }
  }

  return (
    <>
    <Admin title="AJOUTER UNE FORMATION">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <form>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Informations sur la formation</h6>
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
            INFORMATIONS
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Titre de la formation
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    STATUT
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date de d??but
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date de fin
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    S??lectionnez le cours
                  </label>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="S??lectionnez le cours"
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
export default withProtected(AddTraining)

export async function getServerSideProps(context) {
  const courses = await getCourses();
  const options = courses.map(course => {
    return {
      label: `${course.courseTitle} - ${course.courseCode}`,
      value: course.id
    }
  })
  return {
      props: {
        courses: options
      }, // will be passed to the page component as props
  }
}