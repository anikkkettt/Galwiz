import React from "react";
import graph1 from '../../pics/graph1.png';
import graph2 from '../../pics/graph2.png';
import QuestionPages from "./QuestionPages";
import TeachingMaterial from "./TeachingMaterial";
import './teachingHub.css'

const data = [
  {
    question: "Can I use Our World in Data for teaching?",
    answer: [`Yes, you can use all our own work — charts, text, and data — for many teaching activities without any permission. This is because all our own work is licensed under a permissive ‘Creative Commons — by attribution’ license. You just need to credit Our World in Data and our underlying sources. That’s it.`,
      `This is different for material which is produced by others and which we only make available here. Charts and data that is produced by third parties remain subject to their original license terms.`],
    graph: graph1
  },
  {
    question: "How can I use Our World in Data to teach?",
    answer: [`We know from emails and surveys that many teachers and professors use our work. This includes teachers from primary schools, secondary schools, and higher education institutions across the world, including leading universities such as Oxford, Cambridge, MIT, Berkeley, Harvard, and Stanford. Our work is also featured in many textbooks and learning tools, such as the CORE project`,
      `Educators use our work to teach courses in many fields, ranging from physics, medicine, psychology and biology, to sustainable development, environmental sciences, economics, politics and public policy.`,
      `Drawing on their experiences, here are some ways you can use our work in teaching for both yourself and for your students:`,],
    graph: graph2
  },
]

const topics = [
  {
    topic: "Extreme Poverty",
    points: ["What is extreme poverty?", "Why should we care about it?", "How should we tackle it? "],
    relatedContent: ["Our page on Global Extreme Poverty", "Our page on Happines and Life Satisfaction"]
  },
  {
    topic: "Hunger and Malnutrition",
    points: ["What is the number of undernourished people in the world and how is this changing?", " What are the main causes and determinants of hunger and malnutrition?", " What does this all mean in terms of policy?"],
    relatedContent: ["Our page on Hunger and undernurishment", "Our page on Famines", "Our page on Micronutrient Deficiency", "Our page on Food Supply", "Our page on Food Supply"]
  },
  {
    topic: "Global Health",
    points: ["How does the general health situation of people in poor countries compare to the health of people in rich countries?", "How does the general health situation of people in poor countries compare to the health of people in rich countries?", "How are population health outcomes changing over time?", "How difficult is it to improve health outcomes in poor countries?", "What does this all mean in terms of policy?"],
    relatedContent: ["Our page on Hunger and undernurishment", "Our page on Famines", "Our page on Micronutrient Deficiency", "Our page on Food Supply",]
  },
  {
    topic: "Population Growth",
    points: ["How many people live around the world today?", "Will humanity keep growing indefinitely ?", "How will population dynamics change in the next decades ?", "What is the link between population growth and development ?", "How does development lead to smaller families ? "],
    relatedContent: ["Our page on Hunger and undernurishment", "Our page on Famines", "Our page on Micronutrient Deficiency", "Our page on Food Supply",]
  },
  {
    topic: "Global Education",
    points: ["What are the private and social returns to education?", "How has the quantity and quality of education changed over time?", "What are the main challenges going forward?"],
    relatedContent: ["Our page on Global Extreme Poverty", "Our page on Happines and Life Satisfaction"]
  }
]


const TeachingHub = () => {
  return <>
    <div className="row m-md-5 m-3 border-bottom">
      <div className="col-md-12" >
        <h1 style={{ fontWeight: "", fontSize: "60px" }} >Teaching Hub</h1>
        <div className="my-4 width" >Welcome to the Our World in Data Teaching Hub. Here you find information on how to use our work in teaching — and some materials we designed for teaching purposes.
          <div className="my-4">
            If you have any questions or if you have suggestions to improve this page please write to us  at info@ourworldindata.org or through our Feedback page.
          </div>
        </div>
      </div>
    </div>

    {data.map((val) => <QuestionPages topic={val.question} paras={val.answer} img={val.graph} />)}


    <div className="col-md-12 w-100 px-md-5 px-4 py-md-5 py-4 " style={{ backgroundColor: "#FFE34F", }}>
      <h1>Do you have specific teaching materials?</h1>
      <div className="d-flex align-items-center gap-2 py-4">
        <div>IN THIS SECTION</div>
        <div style={{ height: "5px", backgroundColor: "#17242A", opacity: "0.47", flexGrow: 1 }} />
      </div>
      <ol style={{ listStyle: "disc" }} className="" >
        {topics.map((topic) => <li >{topic.topic}</li>)}
      </ol>
      {/* </div> */}
    </div>

    <div className="row m-md-5 m-3 ">
      <div style={{ maxWidth: "600px", fontWeight: 'light' }}>
        For selected topics we have created interactive teaching notes, presentation slides, and chart sets, which we designed specifically for students and teachers. You are welcome to use, edit and share these materials for free.
      </div>
    </div>

    {topics.map((val) => <TeachingMaterial topic={val.topic} points={val.points} contents={val.relatedContent} />)}
  </>
};

export default TeachingHub;
