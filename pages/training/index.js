import React from 'react'
import CardTable from '../../components/Cards/whiteTable'
import {withProtected} from "backend/hook/routeProtector";
import {getTrainings,deleteTraining} from '../api/trainings';

import Admin from '../../layouts/Admin'

function Index({trainings,renderBody}) {
    return (<Admin title="Trainings">
        <CardTable title="Trainings Info" values={trainings.data} renderBody={renderBody} addUrl={'/training/addTraining'} firstButtonTitle={'View Applications'} secondButtonTitle={'Delete'} editUrl={'/studentRegistration/application?id='} deleteFunction={deleteTraining}></CardTable>
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
