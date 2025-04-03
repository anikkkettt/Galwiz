import React from 'react'

const QuestionPages = ({ topic, paras, img }) => {
    return (<>
        <div className="col-md-12 w-100 px-md-5 px-4 py-3 " style={{ backgroundColor: "#FFE34F" }}>
            <h1>{topic}</h1>
        </div>
        <div className="row m-md-5 m-3 border-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        {paras.map((p) => <p className='p-2'>{p}</p>)}
                    </div>
                    <div class="col-sm">
                        <img src={img} />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default QuestionPages