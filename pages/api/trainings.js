import firebase from "firebase/app";
import "firebase/firestore";


/*
model for Trainings
{
    id: doc.id,
    title: '',
    startDate: '',
    endDate: '',
    status: ''
}
*/

export async function addTraining(training) {
    try{
        const db = firebase.firestore();
        const docRef = db.collection('trainings').doc();
        const trainingId = docRef.id;
        const trainingData = {
            id: trainingId,
            ...training
        };
        await docRef.set(trainingData);
        return trainingId;
    } catch(error) {
        console.log(error);
        return null;
    }
}
export async function getTrainings(){

    try{
        const trainings = [];
        const db = await firebase.firestore().collection('trainings').get().then(snapshot => {
            snapshot.forEach(doc => {
                trainings.push({
                    id: doc.id,
                    title: doc.data().title,
                    startDate: doc.data().startDate,
                    endDate: doc.data().endDate,
                    status: doc.data().status
                });
            });
        });
        return trainings;
    } catch(error) {
        console.log(error);
        return null;
    }
}
export async function getTrainingById(trainingId){
    try{
        const snapshot = await firebase.firestore().collection('trainings').doc(trainingId).get();
        return {
            id: snapshot.id,
            title: snapshot.data().title,
            startDate: snapshot.data().startDate,
            endDate: snapshot.data().endDate,
            status: snapshot.data().status,
            courses: snapshot.data().courses
        };
    } catch(error) {
        console.log(error);
        return null;
    }
}
export async function updateTraining(training){
    try{
        const db = await firebase.firestore().collection('trainings').doc(training.id).update({
            ...training
        });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function deleteTraining(trainingId){
    try{
        const db = await firebase.firestore().collection('trainings').doc(trainingId).delete();
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}