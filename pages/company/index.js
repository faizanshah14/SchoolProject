import React from 'react'
import CardTable from '../../components/Cards/whiteTable'
import { withProtected } from "backend/hook/routeProtector";
import { getCompanies } from 'pages/api/compnies';

import Admin from '../../layouts/Admin'

function Index({companies}){
    console.log(companies)
    const headers = "Company Name ,Company Representative ,Email ,Phone No";
    const values = companies;
    return (
        <Admin title="Companies">
        <CardTable header={headers} value={values} >
        </CardTable>
        </Admin>
    )
}
export default withProtected(Index)

export async function getServerSideProps(context) {

    const res = await getCompanies()
    return {
      props: {
        res
      }, // will be passed to the page component as props
    }
}