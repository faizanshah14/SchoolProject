import firebase from "firebase/app";
import "firebase/firestore";


export function addCompany(company){
    firebase.firestore().collection("companies").add({
        ...company,
        createdAt: new Date()
    })
    .then((data) => {
        console.log("Company saved",data);
    }).catch((error) => {
        console.log(error);
    });
};
export async function getCompanies (){
    const companies = {};
    return await firebase.firestore().collection("companies").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            companies.push({
                id: doc.id,
                ...doc.data()
            });
            console.log(doc.id, " => ", doc.data());
        });
        return companies;
    })
    .catch((error) => {
        console.log(error);
    });

}
export function updateCompany(company) {
    firebase.firestore().collection("companies").doc(company.id).update({
        ...company,
        updatedAt: new Date()
    }).then(() => {
        console.log("Company updated");
    }).catch((error) => {
        console.log(error);
    });
}
export function deleteCompany(company){
    firebase.firestore().collection("companies").doc(company.id).delete().then(() => {
        console.log("Company deleted");
    }).catch((error) => {
        console.log(error)
    });
};
