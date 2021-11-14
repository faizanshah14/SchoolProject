import firebase from "firebase/app";
import "firebase/firestore";



/*
model for Courses 
{
    id: doc.id,
    title: '',
    code: ''
}

*/

export async function addCourse(course) {
    try{
        const db = firebase.firestore();
        const courseRef = db.collection("courses").doc()
        const courseId = courseRef.id;
        const courseData = {
            ...course,
            id: courseId
        }
        await courseRef.set(courseData);
        return courseId;
    } catch(error) {
        console.log(error);
    }
}

export async function getCourses() {
    const courses = []
    try{
        const db =await firebase.firestore().collection("courses").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push({
                    id: doc.id,
                    courseTitle: doc.data().courseTitle,
                    courseCode: doc.data().courseCode

                })
            })
        })
        return courses;
    } catch(error) {
        console.log(error);
    }
}
export async function getCourseById(courseId) {
    try{
        const db = firebase.firestore();
        const snapshot = await db.collection("courses").doc(courseId).get()
        return {
            id: snapshot.id,
            courseTitle: snapshot.data().courseTitle,
            courseCode: snapshot.data().courseCode
        }
    } catch(error) {
        console.log(error);
    }
}
export async function updateCourse(course){
    try{
        const db = await firebase.firestore().collection("courses").doc(course.id).update({
            ...course,
        })
        return true
    } catch(error) {
        console.log(error);
        return false;
    }
}
export async function deleteCourse(courseId){
    try{
        const db = await firebase.firestore().collection("courses").doc(courseId).delete()
        return true
    } catch(error) {
        console.log(error);
        return false;
    }
}