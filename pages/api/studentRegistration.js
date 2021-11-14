import firebase from "firebase/app";
import "firebase/firestore";

/* 
Model for student registration

{
  firstName,
  lastName, 
  dob,
  nationality,
  email, 
  phoneNumber, 
  currentSituation,
  disabledEmployees,
  employeeDisablity,
  studyLevel, 
  lastDiploma,
  lastJobHeld,
  trainings, 
  trainingDate,
  careerPlan, 
  trainingProvidedByCompany,  
  trainingHelpCurrentSkills,
  useFullForNewSkills,
  useFullForPersonalDevelopment,
  otherToSpecify,
  expectedFromTraining, 
  accidentsAtWork, 
  gesturesThatSave, 
  riskPreventionAtWork,
  howDidYouHeard, 
  trainingLocation, 
  identityCard,
  cv, 
  coverLetter,
  diploma, 
}
*/

export async function addStudentTraining(studentTraining){
    try{
        const db = firebase.firestore();
        const studentTrainingRef = db.collection('studentTraining').doc();
        const studentTrainingId = studentTrainingRef.id;
        const studentTrainingData = {
            id: studentTrainingId,
            ...studentTraining
        };
        await studentTrainingRef.set(studentTrainingData);
        return studentTrainingId;
    }
    catch(error){
        console.log(error);
        return null;
    }
}
export async function getStudentTrainingsByTrainingId(studentTrainingId){
    try{
        const studentTrainings = [];
        const db = firebase.firestore();
        const studentTrainingRef = await db.collection('studentTraining').get().then(snapshot => {
        snapshot.forEach(doc => {
            if(doc.data().trainings.value === studentTrainingId){
            studentTrainings.push({
                id: doc.id,
                firstName : doc.data().firstName,
                lastName: doc.data().lastName,
                dob: doc.data().dob,
                nationality: doc.data().nationality,
                email: doc.data().email,
                phoneNumber: doc.data().phoneNumber,
                currentSituation: doc.data().currentSituation,
                disabledEmployees: doc.data().disabledEmployees,
                employeeDisablity: doc.data().employeeDisablity,
                studyLevel: doc.data().studyLevel,
                lastDiploma: doc.data().lastDiploma,
                lastJobHeld: doc.data().lastJobHeld,
                trainings: doc.data().trainings,
                trainingDate: doc.data().trainingDate,
                careerPlan: doc.data().careerPlan,
                trainingProvidedByCompany: doc.data().trainingProvidedByCompany,  
                trainingHelpCurrentSkills: doc.data().trainingHelpCurrentSkills,
                useFullForNewSkills: doc.data().useFullForNewSkills,
                useFullForPersonalDevelopment: doc.data().useFullForPersonalDevelopment,
                otherToSpecify: doc.data().otherToSpecify,
                expectedFromTraining: doc.data().expectedFromTraining,
                accidentsAtWork: doc.data().accidentsAtWork,
                gesturesThatSave: doc.data().gesturesThatSave,
                riskPreventionAtWork: doc.data().riskPreventionAtWork,
                howDidYouHeard: doc.data().howDidYouHeard,
                trainingLocation: doc.data().trainingLocation,
                identityCard: doc.data().identityCard,
                cv: doc.data().cv,
                coverLetter: doc.data().coverLetter,
                diploma: doc.data().diploma,
            });
        }
        });
    });
    return studentTrainings;
    }
    catch(error){
        console.log(error);
        return null;
    }
}
export async function getStudentTrainingById(studentTrainingId){
    try{
        const doc = await firebase.firestore()
        .collection('studentTraining').doc(studentTrainingId).get();
        return {
            id: doc.id,
            firstName : doc.data().firstName,
            lastName: doc.data().lastName,
            dob: doc.data().dob,
            nationality: doc.data().nationality,
            email: doc.data().email,
            phoneNumber: doc.data().phoneNumber,
            currentSituation: doc.data().currentSituation,
            disabledEmployees: doc.data().disabledEmployees,
            employeeDisablity: doc.data().employeeDisablity,
            studyLevel: doc.data().studyLevel,
            lastDiploma: doc.data().lastDiploma,
            lastJobHeld: doc.data().lastJobHeld,
            trainings: doc.data().trainings,
            trainingDate: doc.data().trainingDate,
            careerPlan: doc.data().careerPlan,
            trainingProvidedByCompany: doc.data().trainingProvidedByCompany,  
            trainingHelpCurrentSkills: doc.data().trainingHelpCurrentSkills,
            useFullForNewSkills: doc.data().useFullForNewSkills,
            useFullForPersonalDevelopment: doc.data().useFullForPersonalDevelopment,
            otherToSpecify: doc.data().otherToSpecify,
            expectedFromTraining: doc.data().expectedFromTraining,
            accidentsAtWork: doc.data().accidentsAtWork,
            gesturesThatSave: doc.data().gesturesThatSave,
            riskPreventionAtWork: doc.data().riskPreventionAtWork,
            howDidYouHeard: doc.data().howDidYouHeard,
            trainingLocation: doc.data().trainingLocation,
            identityCard: doc.data().identityCard,
            cv: doc.data().cv,
            coverLetter: doc.data().coverLetter,
            diploma: doc.data().diploma,
        };
    }
    catch(error){
        console.log(error);
        return null;
    }
}
export async function updateStudentTraining(studentTraining){
    try{
        const db = await firebase.firestore().collection('studentTraining').doc(studentTraining.id).update({
            ...studentTraining
        })
        return true;

    } catch(error){
        console.log(error);
        return null;
    }
}
export async function deleteStudentTraining(studentTrainingId){
    try{
        const db = await firebase.firestore().collection('studentTraining').doc(studentTrainingId).delete();
        return true;
    }
    catch(error){
        console.log(error);
        return null;
    }
}