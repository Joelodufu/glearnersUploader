import React from 'react'
import { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import { v4 as uuidv4 } from 'uuid';
import './Upload.css'

export default function Upload() {

    const [fileUrls, setFileUrls]=useState([])
    const [pname, setPame] =useState("");
    const [projects, setProjects]=useState([])



    
    //image handling

    const handleFiles = async (e)=>{
        for (let i = 0; i < e.target.files.length; i++) {
           
            const file = e.target.files[i];
            file["id"]=uuidv4()
            const storageRef=storage.ref(`projects`)
            const fileRef = storageRef.child(file.name)
            await fileRef.put(file).then(console.log('uploaded file', file.name))
            const fileUrl= await fileRef.getDownloadURL()
            setFileUrls((prevState)=>[...prevState, fileUrl]) 
        }
        alert('All Images Uploaded')
        
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const pname =e.target.pname.value 
        const adress =e.target.adress.value 
        const awardees =e.target.awardees.value 
        const worth =e.target.worth.value 
        const date =e.target.date.value 

        if (!pname||!adress||!awardees||!worth) {
            return
        }

        db.collection('projects').add({
            id:uuidv4(),
            pname:pname,
            adress:adress,
            awardees:awardees,
            worth:worth, 
            date:date,
            fileUrls:fileUrls
        })
    }


    useEffect(()=>{
        const fetchProjects = async ()=>{
            const projectColection = await db.collection('projects').get()
            setProjects(projectColection.docs.map(
                doc=>{
                    return doc.data()
                }
            ))
        }
        fetchProjects()
    }, [])

    return (
        <div>
             <div>
            <form onSubmit={handleSubmit}>
                <h1>Create Project History</h1>

                <label htmlFor="pname">Project Name</label>
                <input type="text" name="pname" value={pname} onChange={(e)=>{setPame(e.target.value)}} placeholder="put the project title" />

                <label htmlFor="adress">Adress</label>
                <input type="text"  name="adress"/>

                <label htmlFor="awardees">number of Awardees</label>
                <input type="text" name="awardees"  />

                <label htmlFor="worth">Prices disbursed</label>
                <input type="text"   name="worth" />

                <label htmlFor="worth">Date </label>
                <input type="text"   name="date" />

                <label htmlFor="file">Import Images</label>
                <input type="file" multiple onChange={handleFiles}  name="files" />

                <button type="submit">Submit</button>


            </form>

            <ul>
                {projects.map(
                    project=>{
                        return (
                            <li key={project.id}>
                                <img width="100" src={project.fileUrls[0]} alt="" />
                                <p>{project.pname}</p>
                            </li>
                            )
                    }
                )}
            </ul>
        </div>
        </div>
    )
}
