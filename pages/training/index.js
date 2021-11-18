import React from 'react'
import CardTable from '../../components/Cards/whiteTableTrainings'
import {withProtected} from "backend/hook/routeProtector";
import {getTrainings,deleteTraining} from '../api/trainings';

import Admin from '../../layouts/Admin'

function Index({trainings,renderBody}) {
    return (<Admin title="FORMATIONS">
        <CardTable title="Informations sur les formations" values={trainings.data} 
        renderBody={renderBody} addUrl={'/training/addTraining'} 
        firstButtonTitle={'Voir les candidatures'} secondButtonTitle={'Effacer'} 
        editUrl={'/studentRegistration/application?id='} deleteFunction={deleteTraining}
        editTrainingUrl={'/training/editTraining?id='}
        approvedStudentUrl={'/studentRegistration/approvedStudents?id='}
        />
    </Admin>)
}
export default withProtected(Index)

export async function getServerSideProps(context) {
    const data = await getTrainings()
    const trainings = {}
    let renderBody = true;
    trainings.data = data
    if(data.length < 1){
       trainings.data = [{
        endDate:'',
        startDate:'',
        status:'',
        title: "",
    }]
    renderBody = false;
    }
    return {
        props: {
            trainings,
            renderBody
        }, // will be passed to the page component as props
    }
}
