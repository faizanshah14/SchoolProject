import React from "react";
import {withProtected} from "backend/hook/routeProtector";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/router";
// components
import Admin from '../../layouts/Admin'

import {updateTraining , getTrainingById} from '../api/trainings';
import {getCourses} from '../api/courses';

function EditTraining({training,courses}) {
  const router = useRouter();
  const options = courses;
  const [title, setTitle] = React.useState(training.title);
  const [startDate, setStartDate] = React.useState(training.startDate);
  const [endDate, setEndDate] = React.useState(training.endDate);
  const [status, setStatus] = React.useState(training.status);
  const [selected, setSelected] = React.useState(training.courses);
  async function submitHandler(e) {
    e.preventDefault();
    training.title = title;
    training.startDate = startDate;
    training.endDate = endDate;
    training.status = status;
    const res= await updateTraining(course);
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
            <h6 className="text-blueGray-700 text-xl font-bold">Training Information</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={submitHandler}
            >
             SOUMETTRE LE FORMULAIRE
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
                    Training Title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
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
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Select Course
                  </label>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select Course"
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
export default withProtected(EditTraining)

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await getTrainingById(id)
  const courses = await getCourses();
  const options = courses.map(course => {
    return {
      label: `${course.courseTitle} - ${course.courseCode}`,
      value: course.id
    }
  })
  return {
      props: {
          training: data,
          courses: options
      }, // will be passed to the page component as props
  }
}