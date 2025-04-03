import React from "react";

const data = [
  {
    topic: "",
    paras: [
      "Poverty, disease, hunger, climate change, war, existential risks, and inequality: The world faces many great and terrifying problems. It is these large problems that our work at Our World in Data focuses on.",
      `Thanks to the work of thousands of researchers around the world who dedicate their lives to it, we often have a good understanding of how it is possible to make progress against the large problems we are facing. The world has the resources to do much better and reduce the suffering in the world.`,
      `We believe that a key reason why we fail to achieve the progress we are capable of is that we do not make enough use of this existing research and data: the important knowledge is often stored in inaccessible databases, locked away behind paywalls and buried under jargon in academic papers. `,
      `The goal of our work is to make the knowledge on the big problems accessible and understandable. As we say on our homepage, Our World in Data’s mission is to publish the “research and data to make progress against the world’s largest problems”.`,
      `Why have we made this our mission?`,
      `This is the question our founder Max Roser answers in this text:`
    ]
  },
  {
    topic: "A publication to see the large global problems and the powerful changes that reshape our world",
    paras: [
      `If you want to contribute to a better future you need to know the problems the world faces. To understand these problems the daily news is not enough. The news media focuses on events and therefore largely fails to report the two aspects that Our World in Data focuses on: the large problems that continue to confront us for centuries or much longer and the long-lasting, forceful changes that gradually reshape our world.`,
      `The criterion by which the news select what they focus our attention on is whether it is new. The criterion by which we at Our World in Data decide what to focus our attention on is whether it is important.`,
      `The front page of Our World in Data lists the same big global problems every day, because they matter every day. One of the biggest mistakes that the news media makes is to suggest that different things matter on different days.`,
      `To understand issues that are affecting billions, we need data. We need to carefully measure what we care about and make the results accessible in an understandable and public platform. This allows everyone to see the state of the world today and track where we are making progress, and where we are falling behind. The publication we are building has this goal. Through interactive data visualizations we can see how the world has changed; by summarizing the scientific literature we can understand why.`,

    ]
  },
  {
    topic: "It is possible to change the world",
    paras: [
      `To work towards a better future, we also need to understand how and why the world is changing.`,
      `The historical data and research shows that it is possible to change the world. Historical research shows that until a few generations ago around half of all newborns died as children. Since then the health of children has rapidly improved around the world and life expectancy has doubled in all regions. Progress is possible. `,
      `In other important ways global living conditions have improved as well. While we believe this is one of the most important facts to know about the world we live in, it is known by surprisingly few. `,
      `Instead, many believe that global living conditions are stagnating or getting worse and much of the news media’s reporting is doing little to challenge this perception. It is wrong to believe that one can understand the world by following the news alone and the media’s focus on single events and things that go wrong can mean that well-intentioned people who want to contribute to positive change become overwhelmed, hopeless, cynical and in the worst cases give up on their ideals. Much of our effort throughout these years has been dedicated to countering this threat.`,
      `Researching how it was possible to make progress against large problems in the past allows us to learn. Progress is possible, but it is not a given. If we want to know how to reduce suffering and tackle the world’s problems we should learn from what was successful in the past.`,

    ]
  },
  {
    topic: `Comprehensive perspective on global living conditions and the earth’s environment`,
    paras: [
      `We take a broad perspective, covering an extensive range of aspects that matter for our lives. Measuring economic growth is not enough. The research publications on Our World in Data are dedicated to a large range of global problems in health, education, violence, political power, human rights, war, poverty, inequality, energy, hunger, and humanity’s impact on the environment. On the homepage we list all the global problems and important long-term changes that we have researched. The complete list of aspects that we eventually want to cover is longer still and can be found here.`,
      `As becomes obvious from our publication we always aim to provide a global perspective, but our focus are the living conditions of the worst-off.`,
      `As becomes obvious from our publication we always aim to provide a global perspective, but our focus are the living conditions of the worst-off.`
    ]
  }
]

const About = () => {
  return <section className="d-block row d-lg-flex justify-content-center">
    <div className="col-lg-8 p-5 p-lg-0">
      <div>
        <h1 className="display-1 p-0 m-0">About</h1>
      </div>
      <div className="">
        <div>
          {data.map((val) => (
            <>
              <div className="my-lg-5 my-4" style={{ backgroundColor: "" }}>
                <h1 className="">{val.topic}</h1>
              </div>
              {val.paras.map((para) => (
                <div className="my-lg-4 my-3">
                  {para}
                </div>
              ))}
            </>
          ))}

        </div>
      </div>
    </div>
  </section>;
};

export default About;
