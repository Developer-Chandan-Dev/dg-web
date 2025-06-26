import React from 'react'
import {getAllCourses} from "@/lib/actions/dg.actions";

const PdfsTable = async () => {

    const pdfs = await getAllCourses({title: ""});
    console.log(pdfs);

    return (
        <div>PdfsTable</div>
    )
}
export default PdfsTable
