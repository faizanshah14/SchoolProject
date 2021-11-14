import firebase from "firebase/app";
import "firebase/firestore";



/*
model for companies
{
    id: doc.id,
    companyEmail:'',
    companyName:'',
    companyPhone:'',
    representativeName:''
}


*/
export async function addCompany(company) {
    try{
        const db = firebase.firestore();
        const companyRef = db.collection('companies').doc();
        const companyId = companyRef.id;
        const companyData = {
            ...company,
            id: companyId
        };
        await companyRef.set(companyData);
        return companyId;
    } catch (error) {
        console.log(error);
        return false;
    }
};
export async function getCompanies() {
    const companies = [];
    try {
        const snapshot = await firebase.firestore().collection("companies").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                companies.push({
                    id: doc.id,
                    companyEmail:doc.data().companyEmail,
                    companyName:doc.data().companyName,
                    companyPhone:doc.data().companyPhone,
                    representativeName:doc.data().representativeName
                });
            });
        });
        return companies;
    } catch (error) {
        console.log(error);
        return false
    }


}
export async function getCompanyById(companyId) {
    try {
        const snapshot = await firebase.firestore().collection("companies").doc(companyId).get();
        return {
            id: snapshot.id,
            companyEmail:snapshot.data().companyEmail,
            companyName:snapshot.data().companyName,
            companyPhone:snapshot.data().companyPhone,
            representativeName:snapshot.data().representativeName
        };
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function updateCompany(company) {
    try {
        await firebase.firestore().collection("companies").doc(company.id).update({
            ...company,
            updatedAt: new Date()
        });
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}
export async function deleteCompany(id) {
    try{
        await firebase.firestore().collection("companies").doc(id).delete();
        return true;
    }catch (error) {
        console.log(error);
        return false;
    }
};
