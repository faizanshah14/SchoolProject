import React, { useState } from "react";
import { withPublic } from "backend/hook/routeProtector";

import Select from "react-select";
import Creatable from "react-select/creatable";
import SignatureCanvas from "react-signature-canvas";


import { InputField } from "../../components/Fields/InputField";
import { getTrainings , updateTraining } from "../api/trainings";
import fileUpload from "../../backend/api/fileUpload";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

import htmlToPdfmake from 'html-to-pdfmake';
import pdfmake from 'pdfmake/build/pdfmake'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import {addStudentTraining} from "../api/studentRegistration"

import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
//important for getting nice style.
import "image-upload-react/dist/index.css";

function Index(props) {
  const alert = useAlert();
  const allTrainings = props.trainings.data.map((traning) => {
    return { value: traning.id, label: traning.title };
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDobName] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentSituation, setCurrentSituation] = useState("");
  const [disabledEmployees, setDisabledEmployees] = useState("");
  const [employeeDisablity, setEmployeeDisablity] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [lastDiploma, setLastDiploma] = useState("");
  const [lastJobHeld, setLastJobHeld] = useState("");
  const [trainings, setTrainings] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [careerPlan, setCareerPlan] = useState("");
  const [trainingProvidedByCompany, setTrainingProvidedByCompany] =
    useState("");
  const [trainingHelpCurrentSkills, setTrainingHelpCurrentSkills] =
    useState("");
  const [useFullForNewSkills, setUseFullForNewSkills] = useState("");
  const [useFullForPersonalDevelopment, setUseFullForPersonalDevelopment] =
    useState("");
  const [otherToSpecify, setOtherToSpecify] = useState("");
  const [expectedFromTraining, setExpectedFromTraining] = useState("");
  const [accidentsAtWork, setAccidentsAtWork] = useState("");
  const [gesturesThatSave, setGesturesThatSave] = useState('')
  const [riskPreventionAtWork, setRiskPreventionAtWork] = useState("");
  const [howDidYouHeard, setHowDidYouHeard] = useState("");
  const [trainingLocation, setTrainingLocation] = useState("");
  const [cb1, setCb1] = useState(false);
  const [cb2, setCb2] = useState(false);
  const [identityCard, setIdentityCard] = useState('');
  const [cv, setCv] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [diploma, setDiploma] = useState('');
  const [pdfUrl, setPDFUrl] = useState('');
  let sigpad = {}

  const fiveOptions = [
    {
      value: "1 - Unsatisfactory",
      label: "1 - Insatisfaisant",
    },
    {
      value: "2 - Very Unsatisfactory",
      label: "2 - Très insatisfaisant",
    },
    {
      value: "3 - No Opinion",
      label: "3 - Pas d'avis",
    },
    {
      value: "4 - Satisfactory",
      label: "4 - Satisfaisant",
    },
    {
      value: "5 - Very Satisfactory",
      label: "5 - Très satisfaisant",
    },
  ];
  function identityCardHandler(e) {
    e.preventDefault();
    const file_size = e.target.files[0].size;
    if (file_size > 500000) {
      alert.error("Id Card File size is too big max size 500Kb");
      e.target.value = "";
      return false;
    }
    fileUpload(e.target.files[0], setIdentityCard)
  }
  function cvHandler(e) {
    e.preventDefault();
    const file_size = e.target.files[0].size;
    if (file_size > 500000) {
      alert.error("CV File size is too big max size 500Kb");
      e.target.value = "";
      return false;
    }
    //or if you like to have name and type
    fileUpload(e.target.files[0], setCv)
  }
  const router = useRouter();
  async function submitHandler(e) {


    e.preventDefault();
    if (!cb1 || !cb2) {
      alert.error("Please check the checkbox");
      return;
    }
    if(!trainings){
      alert.error("Please select training");
      return;
    }
    htmlToImage
      .toPng(document.getElementById("capture"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = ((imgProps.height - 600) * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
        const blob = pdf.output('bloburl')
        window.open(pdf.output(blob))
      });
      const studentRegistrationData = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        nationality: nationality,
        email: email,
        phoneNumber: phoneNumber, 
        currentSituation: currentSituation,
        disabledEmployees: disabledEmployees,
        employeeDisablity: employeeDisablity,
        studyLevel: studyLevel,
        lastDiploma: lastDiploma,
        lastJobHeld: lastJobHeld,
        trainings: trainings,
        trainingDate: trainingDate,
        careerPlan: careerPlan,
        trainingProvidedByCompany: trainingProvidedByCompany,  
        trainingHelpCurrentSkills: trainingHelpCurrentSkills,
        useFullForNewSkills: useFullForNewSkills,
        useFullForPersonalDevelopment: useFullForPersonalDevelopment,
        otherToSpecify: otherToSpecify,
        expectedFromTraining: expectedFromTraining,
        accidentsAtWork: accidentsAtWork,
        gesturesThatSave:  sigpad.toDataURL(),
        riskPreventionAtWork: riskPreventionAtWork,
        howDidYouHeard: howDidYouHeard,
        trainingLocation: trainingLocation,
        identityCard: identityCard,
        cv: cv,
        coverLetter: coverLetter,  
        diploma: diploma,
        applicationStatus: "Pending",
      }
      const training = props.trainings.data.filter(training => training.id === trainings.value)[0]
      if(training.applicants){
        if(typeof training.applicants === 'number'){
          training.applicants =  training.applicants + 1;
        }else {
          training.applicants = parseInt(training.applicants,10 )+1
        }
      } else {
        training.applicants = 1
      } 
      const url = sigpad.toDataURL();
      debugger;
      await updateTraining(training)
      const res= await addStudentTraining(studentRegistrationData);
      if(res){
        router.push('/')
      }
  
  }
  function coverLetterHandler(e) {
    e.preventDefault();
    const file_size = e.target.files[0].size;
    if (file_size > 500000) {
      alert.error("Cover Letter File size is too big max size 500Kb");
      e.target.value = "";
      return false;
    }
    //or if you like to have name and type
    fileUpload(e.target.files[0], setCoverLetter )
  }
  function diplomaHandler(e) {
    e.preventDefault();
    const file_size = e.target.files[0].size;
    if (file_size > 500000) {
      alert.error("Diploma File size is too big max size 500Kb");
      e.target.value = "";
      return false;
    }
    //or if you like to have name and type
    fileUpload(e.target.files[0], setDiploma)
  }
  return (
    <>
    <IndexNavbar fixed/>
    <div className="container mx-auto pt-20">
      <div className="flex flex-wrap" id="capture">
        <div className="w-full flex-grow flex-1">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                Formulaire d'inscription
                </h6>
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
                    label="PRÉNOM"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="PRÉNOM"
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
                    label="ADRESSE E-MAIL"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="ADRESSE E-MAIL"
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
                      {!identityCard && (
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                        1 - PHOTOCOPIE DE VOTRE CARTE D'IDENTITÉ <i className="fas fa-times float-right"></i>
                        </label>
                      )}
                      {identityCard && (
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                         1 - PHOTOCOPIE DE VOTRE CARTE D'IDENTITÉ{" "}
                          <i className="fas fa-check float-right"></i>{" "}
                        </label>
                      )}
                      <input
                        type="file"
                        name="identityCard"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={identityCardHandler}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {!cv && 
                          <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                         2 - CV À JOUR  <i className="fas fa-times float-right"></i>
                        </label>
                      }
                      {cv &&
                          <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                         2 - CV À JOUR <i className="fas fa-check float-right"></i>
                        </label>
                      }
                      <input
                        type="file"
                        name="cv"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={cvHandler}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {!coverLetter &&
                          <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                         3 - LETTRE DE MOTIVATION <i className="fas fa-times float-right"></i>
                        </label>
                      }
                      {coverLetter &&
                          <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                         3 - LETTRE DE MOTIVATION <i className="fas fa-check float-right"></i>
                        </label>
                      }
                      <input
                        type="file"
                        name="coverLetter"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={coverLetterHandler}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    {!diploma &&
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >

                      4 - PHOTOCOPIE DU DERNIER DIPLÔME <i className="fas fa-times float-right"></i>
                    </label>
                    }
                    { diploma &&
                      <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >

                      4 - PHOTOCOPIE DU DERNIER DIPLÔME <i className="fas fa-check float-right"></i>
                    </label>
                    }
                      <input
                        type="file"
                        name="diploma"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={diplomaHandler}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      NOS CONDITIONS GENERALES DE VENTE :
                      </label>
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
                                J'accepte de m'inscrire à l'école SST
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
                                J'ai lu et j'accepte les conditions générales de vente
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                       VEUILLEZ VOUS CONNECTER AVEC LA SOURIS DANS LA CASE CI-DESSOUS :
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
                            sigpad = ref
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
    </>
  );
}

export default withPublic(Index);

export async function getServerSideProps(context) {
  const data = await getTrainings();
  const trainings = {};
  trainings.data = data;
  return {
    props: {
      trainings,
    }, // will be passed to the page component as props
  };
}
