import React from "react";
import {withProtected} from "backend/hook/routeProtector";
// components
import Admin from '../../layouts/Admin'

import {updateCourse , getCourseById} from '../api/courses';
import { useRouter } from "next/router";

function EditCourse({course}) {
  const router = useRouter();
  const [courseTitle, setCourseTitle] = React.useState(course.courseTitle);
  const [courseCode, setCourseCode] = React.useState(course.courseCode);
  async function submitHandler(e) {
    e.preventDefault();
    course.courseTitle = courseTitle;
    course.courseCode = courseCode;
    const res= await updateCourse(course);
    if(res){
      router.push('/courses')
    }
  }

  return (
    <>
    <Admin title="Add Course">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <form>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Course Information</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={submitHandler}
            >
              Submit Form
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
                    Course Title
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setCourseTitle(e.target.value)}
                    value={courseTitle}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Course Code
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setCourseCode(e.target.value)}
                    value={courseCode}
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
export default withProtected(EditCourse)

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await getCourseById(id)
  return {
      props: {
          course:data
      }, // will be passed to the page component as props
  }
}