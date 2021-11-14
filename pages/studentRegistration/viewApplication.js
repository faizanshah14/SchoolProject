import React, { useState } from "react";
import { withProtected } from "backend/hook/routeProtector";

import Select from "react-select";
import Creatable from "react-select/creatable";
import SignatureCanvas from "react-signature-canvas";

import { InputField } from "../../components/Fields/InputField";
import { getTrainings } from "../api/trainings";
import fileUpload from "../../backend/api/fileUpload";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

import htmlToPdfmake from 'html-to-pdfmake';
import pdfmake from 'pdfmake/build/pdfmake'

import {getStudentTrainingById} from "../api/studentRegistration"

import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
//important for getting nice style.
import "image-upload-react/dist/index.css";

function ViewApplication(props) {
  const data = props.application.data;
  const alert = useAlert();
  const allTrainings = {}
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [dob, setDobName] = useState(data.dob);
  const [nationality, setNationality] = useState(data.nationality);
  const [email, setEmail] = useState(data.email);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [currentSituation, setCurrentSituation] = useState(data.currentSituation);
  const [disabledEmployees, setDisabledEmployees] = useState(data.disabledEmployees);
  const [employeeDisablity, setEmployeeDisablity] = useState(data.employeeDisablity);
  const [studyLevel, setStudyLevel] = useState(data.studyLevel);
  const [lastDiploma, setLastDiploma] = useState(data.lastDiploma);
  const [lastJobHeld, setLastJobHeld] = useState(data.lastJobHeld);
  const [trainings, setTrainings] = useState(data.trainings);
  const [trainingDate, setTrainingDate] = useState(data.trainingDate);
  const [careerPlan, setCareerPlan] = useState(data.careerPlan);
  const [trainingProvidedByCompany, setTrainingProvidedByCompany] =
    useState(data.trainingProvidedByCompany);
  const [trainingHelpCurrentSkills, setTrainingHelpCurrentSkills] =
    useState(data.trainingHelpCurrentSkills);
  const [useFullForNewSkills, setUseFullForNewSkills] = useState(data.useFullForNewSkills);
  const [useFullForPersonalDevelopment, setUseFullForPersonalDevelopment] =
    useState(data.useFullForPersonalDevelopment);
  const [otherToSpecify, setOtherToSpecify] = useState(data.otherToSpecify);
  const [expectedFromTraining, setExpectedFromTraining] = useState(data.expectedFromTraining);
  const [accidentsAtWork, setAccidentsAtWork] = useState(data.accidentsAtWork);
  const [gesturesThatSave, setGesturesThatSave] = useState(data.gesturesThatSave);
  const [riskPreventionAtWork, setRiskPreventionAtWork] = useState(data.riskPreventionAtWork);
  const [howDidYouHeard, setHowDidYouHeard] = useState(data.howDidYouHeard);
  const [trainingLocation, setTrainingLocation] = useState(data.trainingLocation);
  const [cb1, setCb1] = useState(true);
  const [cb2, setCb2] = useState(true);
  const [identityCard, setIdentityCard] = useState(data.identityCard);
  const [cv, setCv] = useState(data.cv);
  const [coverLetter, setCoverLetter] = useState(data.coverLetter);
  const [diploma, setDiploma] = useState(data.diploma);
  const fiveOptions = [
    {
      value: "1 - Unsatisfactory",
      label: "1 - Unsatisfactory",
    },
    {
      value: "2 - Very Unsatisfactory",
      label: "2 - Very Unsatisfactory",
    },
    {
      value: "3 - No Opinion",
      label: "3 - No Opinion",
    },
    {
      value: "4 - Satisfactory",
      label: "4 - Satisfactory",
    },
    {
      value: "5 - Very Satisfactory",
      label: "5 - Very Satisfactory",
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap" id="capture">
        <div className="w-full flex-grow flex-1">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Registration Form
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Trainee
                </h6>
                <div className="flex flex-wrap">
                  <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Last Name"
                  />

                  <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="First Name"
                  />

                  <InputField
                    label="Date Of Birth"
                    name="dob"
                    type="date"
                    value={dob}
                    onChange={setDobName}
                  />

                  <InputField
                    label="Nationality"
                    name="nationality"
                    type="text"
                    value={nationality}
                    onChange={setNationality}
                    placeholder="Nationality"
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Email"
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="text"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder="Phone Number"
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Your Personal Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Current Situation
                      </label>
                      <Creatable
                        options={[
                          {
                            value: "Salaried",
                            label: "Salaried",
                          },
                          {
                            value: "Job Seeker",
                            label: "Job Seeker",
                          },
                        ]}
                        onChange={setCurrentSituation}
                        value={currentSituation}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Disabled Employee
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Yes",
                          },
                          {
                            value: "No",
                            label: "No",
                          },
                        ]}
                        onChange={setDisabledEmployees}
                        value={
                          disabledEmployees
                            ? disabledEmployees
                            : {
                                value: "No",
                                label: "No",
                              }
                        }
                      />
                    </div>
                  </div>
                  <InputField
                    label="Employee Disablity"
                    name="employeeDisablity"
                    type="text"
                    value={employeeDisablity}
                    onChange={setEmployeeDisablity}
                    placeholder="Employee Disablity"
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Education
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Level Of Study
                      </label>
                      <Select
                        options={[
                          {
                            value: "Without diploma",
                            label: "Without diploma",
                          },
                          {
                            value: "BEP",
                            label: "BEP",
                          },
                          {
                            value: "Bac level",
                            label: "Bac level",
                          },
                          {
                            value: "Bac + 1 level",
                            label: "Bac + 1 level",
                          },
                          {
                            value: "Bac + 2 level",
                            label: "Bac + 2 level",
                          },
                          {
                            value: "Bac + 3 level",
                            label: "Bac + 3 level",
                          },
                          {
                            value: "Bac + 4 level",
                            label: "Bac + 4 level",
                          },
                          {
                            value: "Bac + 5 level",
                            label: "Bac + 5 level",
                          },
                        ]}
                        onChange={setStudyLevel}
                        value={studyLevel}
                      />
                    </div>
                  </div>
                  <InputField
                    label="Last Diploma"
                    name="lastDiploma"
                    type="text"
                    value={lastDiploma}
                    onChange={setLastDiploma}
                    placeholder="Last Diploma"
                  />

                  <InputField
                    label="Last Job Held"
                    name="lastJobHeld"
                    type="text"
                    value={lastJobHeld}
                    onChange={setLastJobHeld}
                    placeholder="Last Job Held"
                  />

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Training
                      </label>
                      <Select
                        options={allTrainings}
                        onChange={setTrainings}
                        value={trainings}
                      />
                    </div>
                  </div>
                  <InputField
                    label="Choose Date"
                    name="chooseDate"
                    type="date"
                    value={trainingDate}
                    onChange={setTrainingDate}
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Your Motivation
                </h6>
                <div className="flex flex-wrap">
                  <InputField
                    label="What is Your Career Plan"
                    name="careerPlan"
                    type="text"
                    value={careerPlan}
                    onChange={setCareerPlan}
                    placeholder="Career Plan"
                  />

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Training Provided By Company ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Yes",
                          },
                          {
                            value: "No",
                            label: "No",
                          },
                        ]}
                        onChange={setTrainingProvidedByCompany}
                        value={
                          trainingProvidedByCompany
                            ? trainingProvidedByCompany
                            : {
                                value: "No",
                                label: "No",
                              }
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Useful to strengthen your skills in your current
                        position ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Yes",
                          },
                          {
                            value: "No",
                            label: "No",
                          },
                        ]}
                        onChange={setTrainingHelpCurrentSkills}
                        value={
                          trainingHelpCurrentSkills
                            ? trainingHelpCurrentSkills
                            : {
                                value: "No",
                                label: "No",
                              }
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Useful for acquiring new skills ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Yes",
                          },
                          {
                            value: "No",
                            label: "No",
                          },
                        ]}
                        onChange={setUseFullForNewSkills}
                        value={
                          useFullForNewSkills
                            ? useFullForNewSkills
                            : {
                                value: "No",
                                label: "No",
                              }
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Useful for your professional development ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Yes",
                          },
                          {
                            value: "No",
                            label: "No",
                          },
                        ]}
                        onChange={setUseFullForPersonalDevelopment}
                        value={
                          useFullForPersonalDevelopment
                            ? useFullForPersonalDevelopment
                            : {
                                value: "No",
                                label: "No",
                              }
                        }
                      />
                    </div>
                  </div>
                  <InputField
                    label="Other To Specify"
                    name="otherToSpecify"
                    type="text"
                    value={otherToSpecify}
                    onChange={setOtherToSpecify}
                    placeholder="Other To Specify"
                  />
                  <InputField
                    label="What Do you expect from this training ?"
                    name="whatToExpect"
                    type="text"
                    value={expectedFromTraining}
                    onChange={setExpectedFromTraining}
                    placeholder="What Do you expect from this training ?"
                  />
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Your Level in relation to lifeguard training at work
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Accidents at work
                      </label>
                      <Select
                        options={fiveOptions}
                        onChange={setAccidentsAtWork}
                        value={accidentsAtWork}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Gestures that save
                      </label>
                      <Select
                        options={fiveOptions}
                        onChange={setGesturesThatSave}
                        value={gesturesThatSave}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Risk prevention at work
                      </label>
                      <Select
                        options={fiveOptions}
                        onChange={setRiskPreventionAtWork}
                        value={riskPreventionAtWork}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  INSCRIPTION
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        How did you hear about our school
                      </label>
                      <Select
                        options={[
                          {
                            value: "Word of mouth",
                            label: "Word of mouth",
                          },
                          {
                            value: "Social Network",
                            label: "Social Network",
                          },
                          {
                            value: "Forum / Blog",
                            label: "Forum / Blog",
                          },
                          {
                            value: "Search Engine",
                            label: "Search Engine",
                          },
                        ]}
                        onChange={setHowDidYouHeard}
                        value={howDidYouHeard}
                      />
                    </div>
                  </div>
                  <InputField
                    label="Training location"
                    name="trainingLocation"
                    type="text"
                    value={trainingLocation}
                    onChange={setTrainingLocation}
                    placeholder="Enter your training location"
                  />
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  DOCUMENT TO BE PROVIDED
                </h6>
                <div className="flex flex-wrap">
                  <span
                    className="mt-2 text-base leading-normal text-red-600"
                    style={{ color: "red" }}
                  >
                    ( Warning : the requested documents must correspond to the
                    level of the training, sometimes no diploma is required the
                    candidate must therefore not have access to this space)
                  </span>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          1 - Photocopy of your identity card{" "}
                          <i className="fas fa-check float-right"></i>{" "}
                        </label>
                        <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={identityCard ? identityCard : '#pablo'}>Download identity card</a>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                          <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          2 - Up-to-date CV  <i className="fas fa-check float-right"></i>
                        </label>
                        <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={cv ? cv : '#pablo' }>Download CV</a>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                          <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          3 - Cover letter <i className="fas fa-check float-right"></i>
                        </label>
                        <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={coverLetter ? coverLetter : '#pablo'}>Download Cover Letter</a>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >

                      4 - Photocopy of the last Diploma <i className="fas fa-check float-right"></i>
                    </label>
                    <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={diploma ? diploma : '#pablo'}>Download Diploma</a>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        OUR GENERAL CONDITIONS OF SALE:
                      </label>
                      <span
                        className="mt-2 text-base leading-normal text-red-600"
                        style={{ color: "red" }}
                      >
                        (the trainee must be able to read the text with a lift
                        because the text is long, it will correspond to the
                        conditions of each school)
                      </span>
                      <div className="block">
                        <span className="text-gray-700">SIGNATURE </span>
                        <div className="mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="checkbox"
                                onChange={(e) => setCb1(e.target.checked)}
                              />
                              <span className="ml-2">
                                {" "}
                                I agree to enrollment in the SST school
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="checkbox"
                                onChange={(e) => setCb2(e.target.checked)}
                              />
                              <span className="ml-2">
                                {" "}
                                I have read and accept the general conditions of
                                sale
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Please sign in the box below with the mouse:
                      </label>
                      <div
                        className="border-2 border-indigo-600"
                        style={{ width: 350, height: 150 }}
                      >
                        <SignatureCanvas
                          canvasProps={{
                            width: "350",
                            height: "150",
                            margin: "0 auto",
                            "background-color": "#D3D3D3",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(ViewApplication);

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await getStudentTrainingById(id);
  const application = {};
  application.data = data;
  return {
    props: {
        application,
    }, // will be passed to the page component as props
  };
}
