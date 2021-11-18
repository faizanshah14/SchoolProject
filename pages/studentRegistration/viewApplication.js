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

import {getStudentTrainingById , updateStudentTraining} from "../api/studentRegistration"

import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
//important for getting nice style.
import "image-upload-react/dist/index.css";

function ViewApplication(props) {
  const router = useRouter();
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
  async function approvalHandler(e){
    e.preventDefault();
    data.applicationStatus = 'Approved'
    const response = await updateStudentTraining(data)
    if(response){
      router.push('/training')
    }
  }
  async function rejectionsHandler(e){
    e.preventDefault();
    data.applicationStatus = 'Rejected'
    const response = await updateStudentTraining(data)
    if(response){
      router.push('/training')
    }
  }
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap" id="capture">
        <div className="w-full flex-grow flex-1">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                Formulaire d'inscription  
                </h6>
                <button
                  className="bg-green-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  style={{ 'margin-left' : '70em'}}
                  onClick={approvalHandler}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={rejectionsHandler}
                >
                  Reject
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                STAGIAIRE
                </h6>
                <div className="flex flex-wrap">
                  <InputField
                    label="NOM DE FAMILLE"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={setLastName}
                    placeholder="NOM DE FAMILLE"
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
                    label="DATE DE NAISSANCE"
                    name="dob"
                    type="date"
                    value={dob}
                    onChange={setDobName}
                  />

                  <InputField
                    label="NATIONALITÉ"
                    name="nationality"
                    type="text"
                    value={nationality}
                    onChange={setNationality}
                    placeholder="NATIONALITÉ"
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
                    label="NUMÉRO DE TÉLÉPHONE"
                    name="phone"
                    type="text"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder="NUMÉRO DE TÉLÉPHONE"
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                VOS INFORMATIONS PERSONNELLES
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        SITUATION ACTUELLE
                      </label>
                      <Creatable
                        options={[
                          {
                            value: "Salaried",
                            label: "Salarié",
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
                       EMPLOYÉ HANDICAPÉ
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Oui",
                          },
                          {
                            value: "No",
                             label: "Non",
                          },
                        ]}
                        onChange={setDisabledEmployees}
                        value={
                          disabledEmployees
                            ? disabledEmployees
                            : {
                                value: "No",
                                 label: "Non",
                              }
                        }
                      />
                    </div>
                  </div>
                  <InputField
                    label="INVALIDITÉ DES EMPLOYÉS"
                    name="employeeDisablity"
                    type="text"
                    value={employeeDisablity}
                    onChange={setEmployeeDisablity}
                    placeholder="INVALIDITÉ DES EMPLOYÉS"
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                ÉDUCATION
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      NIVEAU D'ÉTUDES
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
                    label="DERNIER DIPLÔME"
                    name="lastDiploma"
                    type="text"
                    value={lastDiploma}
                    onChange={setLastDiploma}
                    placeholder="DERNIER DIPLÔME"
                  />

                  <InputField
                    label="DERNIER EMPLOI OCCUPÉ"
                    name="lastJobHeld"
                    type="text"
                    value={lastJobHeld}
                    onChange={setLastJobHeld}
                    placeholder="DERNIER EMPLOI OCCUPÉ"
                  />

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      ENTRAÎNEMENT
                      </label>
                      <Select
                        options={allTrainings}
                        onChange={setTrainings}
                        value={trainings}
                      />
                    </div>
                  </div>
                  <InputField
                    label="CHOISISSEZ LA DATE"
                    name="chooseDate"
                    type="date"
                    value={trainingDate}
                    onChange={setTrainingDate}
                  />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                VOTRE MOTIVATION
                </h6>
                <div className="flex flex-wrap">
                  <InputField
                    label="QUEL EST VOTRE PLAN DE CARRIÈRE"
                    name="careerPlan"
                    type="text"
                    value={careerPlan}
                    onChange={setCareerPlan}
                    placeholder="QUEL EST VOTRE PLAN DE CARRIÈRE"
                  />

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                    FORMATION FOURNIE PAR L'ENTREPRISE ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Oui",
                          },
                          {
                            value: "No",
                             label: "Non",
                          },
                        ]}
                        onChange={setTrainingProvidedByCompany}
                        value={
                          trainingProvidedByCompany
                            ? trainingProvidedByCompany
                            : {
                                value: "No",
                                 label: "Non",
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
                        UTILE POUR RENFORCER VOS COMPÉTENCES DANS VOTRE POSTE ACTUEL ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Oui",
                          },
                          {
                            value: "No",
                             label: "Non",
                          },
                        ]}
                        onChange={setTrainingHelpCurrentSkills}
                        value={
                          trainingHelpCurrentSkills
                            ? trainingHelpCurrentSkills
                            : {
                                value: "No",
                                 label: "Non",
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
                      UTILE POUR ACQUÉRIR DE NOUVELLES COMPÉTENCES ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Oui",
                          },
                          {
                            value: "No",
                             label: "Non",
                          },
                        ]}
                        onChange={setUseFullForNewSkills}
                        value={
                          useFullForNewSkills
                            ? useFullForNewSkills
                            : {
                                value: "No",
                                 label: "Non",
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
                      UTILE POUR VOTRE ÉVOLUTION PROFESSIONNELLE ?
                      </label>
                      <Select
                        options={[
                          {
                            value: "Yes",
                            label: "Oui",
                          },
                          {
                            value: "No",
                             label: "Non",
                          },
                        ]}
                        onChange={setUseFullForPersonalDevelopment}
                        value={
                          useFullForPersonalDevelopment
                            ? useFullForPersonalDevelopment
                            : {
                                value: "No",
                                 label: "Non",
                              }
                        }
                      />
                    </div>
                  </div>
                  <InputField
                    label="AUTRE À PRÉCISER"
                    name="otherToSpecify"
                    type="text"
                    value={otherToSpecify}
                    onChange={setOtherToSpecify}
                    placeholder="AUTRE À PRÉCISER"
                  />
                  <InputField
                    label="QU'ATTENDEZ-VOUS DE CETTE FORMATION ?"
                    name="whatToExpect"
                    type="text"
                    value={expectedFromTraining}
                    onChange={setExpectedFromTraining}
                    placeholder="QU'ATTENDEZ-VOUS DE CETTE FORMATION ?"
                  />
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                VOTRE NIVEAU PAR RAPPORT À LA FORMATION DE SAUVETEUR AU TRAVAIL
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                       ACCIDENTS DU TRAVAIL
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
                       DES GESTES QUI SAUVENT
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
                       PRÉVENTION DES RISQUES AU TRAVAIL
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
                UNE INSCRIPTION
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        COMMENT AVEZ-VOUS ENTENDU PARLER DE NOTRE ÉCOLE

                      </label>
                      <Select
                        options={[
                          {
                            value: "Word of mouth",
                            label: "Bouche à oreille",
                          },
                          {
                            value: "Social Network",
                            label: "Réseau social",
                          },
                          {
                            value: "Forum / Blog",
                            label: "Forum / Blog",
                          },
                          {
                            value: "Search Engine",
                            label: "Moteur de recherche",
                          },
                        ]}
                        onChange={setHowDidYouHeard}
                        value={howDidYouHeard}
                      />
                    </div>
                  </div>
                  <InputField
                    label="LIEU DE FORMATION"
                    name="trainingLocation"
                    type="text"
                    value={trainingLocation}
                    onChange={setTrainingLocation}
                    placeholder="LIEU DE FORMATION"
                  />
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                 DOCUMENT A FOURNIR
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                       1 - PHOTOCOPIE DE VOTRE CARTE D'IDENTITÉ{" "}
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
                         2 - CV À JOUR  <i className="fas fa-check float-right"></i>
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
                         3 - LETTRE DE MOTIVATION <i className="fas fa-check float-right"></i>
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
                          ref={(ref) => {
                            if(ref){
                              ref.off();
                              ref.fromDataURL(gesturesThatSave,{
                                width: "350",
                                height: "150",
                                margin: "0 auto",
                                "background-color": "#D3D3D3",
                              })
                            }
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
