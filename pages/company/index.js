import React from 'react'
import CardTable from '../../components/Cards/whiteTable'
import {withProtected} from "backend/hook/routeProtector";
import {getCompanies,deleteCompany} from 'pages/api/compnies';

import Admin from '../../layouts/Admin'

function Index({companies,renderBody}) {
    return (<Admin title="Companies">
        <CardTable title="Companies Info" values={companies.data} renderBody={renderBody} addUrl={'/company/addCompany'} editUrl={'/company/editCompany?id='} deleteFunction={deleteCompany}></CardTable>
    </Admin>)
}
export default withProtected(Index)

export async function getServerSideProps(context) {

    const data = await getCompanies()
    const companies = {}
    companies.data = data
    let renderBody = true;
    if(data.length < 1){
        companies.data = [{
        companyEmail:'',
        companyName:'',
        companyPhone:'',
        representativeName:''
     }]
     renderBody = false;
     }
    return {
        props: {
            companies,
            renderBody
        }, // will be passed to the page component as props
    }
}
