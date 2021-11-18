import React from 'react'
import CardTable from '../../components/Cards/whiteTable'
import {withProtected} from "backend/hook/routeProtector";
import {getCourses,deleteCourse} from 'pages/api/courses';

import Admin from '../../layouts/Admin'

function Index({courses,renderBody}) {
    return (
    <Admin title="Cours">
        <CardTable title="Informations sur les cours" values={courses.data} renderBody={renderBody} addUrl={'/courses/addCourse'} editUrl={'/courses/editCourse?id='} deleteFunction={deleteCourse}/>
    </Admin>
    )
}
export default withProtected(Index)

export async function getServerSideProps(context) {

    const data = await getCourses()
    const courses = {}
    courses.data = data
    let renderBody = true;
    if(data.length < 1){
        courses.data = [{
        title: '',
        code: ''
     }]
     renderBody = false;
    }
    return {
        props: {
            courses,
            renderBody
        }, // will be passed to the page component as props
    }
}
