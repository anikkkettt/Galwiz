import { Link } from '@mui/material'
import React, { useState } from 'react'
import content1 from '../../pics/content1.png'
// import content2 from '../../pics/content2.png'


const TeachingMaterial = ({ topic, points, contents }) => {
    const [index, setIndex] = useState(0);

    return (
        <>
            <div className="col-md-12 w-100 px-md-5 px-4 py-5 " style={{ backgroundColor: "white", }}>
                <h1>{topic}</h1>
                <div className='py-3' style={{ fontWeight: "bold" }}>What your students will learn:</div>
                <ol style={{ listStyle: "disc" }} className="" >
                    {points.map((point) => <li >{point}</li>)}
                </ol>
            </div>
            <div className='py-5'>
                <div
                    className="p-2 d-md-flex justify-content-evenly gap-2"
                    style={{ color: "white" }}
                >
                    <div
                        onClick={(e) => setIndex(0)}
                        className="w-100 d-flex justify-content-center rounded cursor-pointer mb-2 mb-md-0"
                        style={
                            index === 0
                                ? { backgroundColor: "#FFE34F", color: "black", width: "32%" }
                                : { backgroundColor: " #2C3143", width: "32%" }
                        }
                    >
                        <div className='text-center w-100'>
                            <h1>Online Notes</h1>
                            <h5>INTERACTIVE</h5>
                        </div>
                    </div>
                    <div
                        onClick={(e) => setIndex(1)}
                        className=" w-100 d-flex justify-content-center rounded cursor-pointer mb-2 mb-md-0"
                        style={
                            index === 1
                                ? { backgroundColor: "#FFE34F", color: "black", width: "32%" }
                                : { backgroundColor: " #2C3143", width: "32%" }
                        }
                    >
                        <div className='text-center'>
                            <h1>Powerpoint</h1>
                            <h5>NON-INTERACTIVE</h5>
                        </div>
                    </div>
                    <div
                        onClick={(e) => setIndex(2)}
                        className=" w-100 d-flex justify-content-center rounded cursor-pointer mb-2 mb-md-0"
                        style={
                            index === 2
                                ? { backgroundColor: "#FFE34F", color: "black", width: "32%" }
                                : { backgroundColor: " #2C3143", width: "32%" }
                        }
                    >
                        <div className='text-center'>
                            <h1>Charts only</h1>
                            <h5>FOLDER OF IMAGE</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-12 w-100" style={{ backgroundColor: "white", }}>
                <h1 className='px-5'>Related Content:</h1>
                <div className='py-4 d-flex flex-column justify-content-center align-items-center'>
                    {contents.map((content) => {
                        return <Link
                            className="col-md-8 p-3 d-flex my-2 align-items-center border"
                            to={"/teaching_hub"}
                            style={{ background: "#2C3143", width: "95vw", textDecoration: 'none' }}
                        >
                            <div className='col-md-1'>
                                <img src={content1} className="fluid" style={{ maxWidth: "100px", maxHeight: "100%" }} />
                            </div>

                            <div className="row ms-md-2">
                                <div className="col">
                                    <div className="p-2 d-flex containers" style={{ color: "white" }}>
                                        <h3>{content}</h3>
                                        <i
                                            className="bi bi-arrow-up-right-square ms-md-5"
                                            style={{ fontSize: "2rem", marginTop: "-10px" }}
                                        ></i>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    })}
                </div>
            </div>


        </>
    )
}

export default TeachingMaterial