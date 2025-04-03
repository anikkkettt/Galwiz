import React from "react";
import Header from "../components/Navbar/Header";
import Footer from "../components/footer/Footer";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./Home";
import Contribute from "../components/contribute/Contribute";
import AllWorkFlow from "../components/allWorkFlow/AllWorkFlow";
import TeachingHub from "../components/teachingHub/TeachingHub";
import PageNotFound from "../components/PageNotFound";

import Notebook from "../components/contribute/Notebook";
import ToolNotebook from "../components/contribute/ToolNotebook";
import UseCase from "../components/contribute/UseCase";
import SingleToolNotebook from "../components/allToolNoteBook/singleToolNotebook/SingleToolNotebook";

import AllUseCase from "../components/allUseCase/AllUseCase";
import AllNoteBook from "../components/allNoteBook/AllNoteBook";
import AllToolNoteBook from "../components/allToolNoteBook/AllToolNoteBook";
import Outreachy from "../components/outreachy/Outreachy";

import About from "../components/about/About";
import SingleNotebook from "../components/allNoteBook/singleNotebook/SingleNotebook";
import UseCaseTopic from "../components/useCaseTopic/UseCaseTopic";
import SingleUseCase from "../components/allUseCase/singleUseCase/SingleUseCase";

const data = [
  {
    topic: "Biology",
    subtopic: [
      "Agricultural Science",
      "Biochemistry",
      "Biomarkers",
      "Biophysics",
      "Biotechbology",
      "Cell Biology",
      "Chemical Biology",
      "Developmental Biology",
      "Ecology",
      "Environmental Science",
      "Evolutionary Biology",
      "Freshwater Biology",
      "Genetics",
      "Human Biology",
      "Marine Biology",
      "MicroBiology",
      "Model organisms",
      "Moeluclar Biology",
      "Plant Biology",
      "Structural Biology",
      "Synthetic Biology",
      "Systems Biology",
      "Virology",
      "Zoology",
    ],
  },
  {
    topic: "Biomedical Science",
    subtopic: [
      "Anatomy",
      "Immunology",
      "Laboratory animal science",
      "Medicines research and development",
      "Neurobiology",
      "Nutritional science",
      "Parasitology",
      "Pharmacology",
      "Regenerative medicine",
      "Sample collections",
    ],
  },
  {
    topic: "Chemistry",
    subtopic: [
      "Analytica Chemistry",
      "Biochemistry",
      "Computational Chemistry",
      "Drug discovery",
      "Synthetic Chemistry",
    ],
  },
  {
    topic: "Computational biology",
    subtopic: [
      "Biomolecular simulations",
      "Functions analysis",
      "Molecular genetics",
      "Molecular interactions, pathways and networks",
      "Nucleic acids",
      "Phylogeny",
      "Proteins",
      "Sequence analysis",
      "Sequence sites, features and motifs",
      "Structure analysis",
    ],
  },
  {
    topic: "Computer Science",
    subtopic: [
      "Computational chemistry",
      "Data mining",
      "Data visualisations",
      "Machine learning",
      "Natural language processing",
      "Software engineering",
    ],
  },
  {
    topic: "Experimental design and studies",
    subtopic: [
      "Animal Study",
      "GWAS study",
      "Preclinical and clinical studies",
    ],
  },
  {
    topic: "Informatics",
    subtopic: [
      "Bioinformatics",
      "Biological databases",
      "Cheminformatics",
      "Laboratory information management",
      "Medical informatics",
      "Ontology and terminology",
    ],
  },
  {
    topic: "Laboratory Techniques",
    subtopic: [
      "Chromosome and conformation capture",
      "Cytometry",
      "Genotyping experiment",
      "Imaging",
      "Immunoprecipitation experiment",
      "Microarray experiment",
      "PCR experiment",
      "Protein interaction experiment",
      "Proteomics experiment",
      "RNAi experiment",
      "Sequencing",
      "Simulation experiment",
    ],
  },
  {
    topic: "Literature and language",
    subtopic: ["Natural language processing"],
  },
  {
    topic: "Mathematics",
    subtopic: [
      "Applied mathematics",
      "Pure mathematics",
      "Statistics and probability",
    ],
  },
  {
    topic: "Medicine",
    subtopic: [
      "Allergy, clinical immunology and immunotherapeutrics",
      "Anaesthesiology",
      "Cardiology",
      "Complementary medicine",
      "Dentistry",
      "Dermatology",
      "Ear, noise and throat medicine",
      "Endocrinology and metabolism",
      "Gastroenterology",
      "Gender medicine",
      "Gynaecology and obsterics",
      "Haematology",
      "Hepatic and biliary medicine",
      "Medical toxicology",
      "Musculoskeletal medicine",
      "Neurology",
      "Oncology",
      "Opthalmology",
      "Paediactrics",
      "Pain medicine",
      "Pathology",
      "Psychiatry",
      "Public health and epidemiology",
      "Reproductive health",
      "Respiratory medicine",
      "Toxicology",
      "Transational medicine",
      "Trauma medicine",
      "Urology and nephrology",
      "Veterinary medicine",
    ],
  },
  {
    topic: "Omics",
    subtopic: [
      "Fluxomics",
      "Genomics",
      "Immunomics",
      "Metabolomics",
      "Molecular evolution",
      "Phenomics",
      "Proteomics",
    ],
  },
  {
    topic: "Physics",
    subtopic: ["Biophysics"],
  },
];
const AllComponent = () => {
  return (
    <div>
      <Header data={data} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contribute" element={<Contribute />}>
          <Route path="notebook" element={<Notebook />} />
          <Route path="tool_notebook" element={<ToolNotebook />} />
          <Route path="use_case" element={<UseCase />} />
        </Route>
        <Route path="/teaching_hub" element={<TeachingHub />} />
        <Route path="/workflows" element={<AllWorkFlow />} />

        <Route path="/notebook" element={<Outlet />}>
          <Route index element={<AllNoteBook />} />
          <Route path=":nodeBookId" element={<SingleNotebook />} />
        </Route>

        {/* <Route
          path="/topic/:useCaseTopic/:useCaseSubTopic"
          element={<UseCaseTopic />}
        /> */}

        <Route
          path="/topic/:useCaseTopic/:useCaseSubTopic"
          element={<Outlet />}
        >
          <Route index element={<UseCaseTopic />} />
          <Route path=":use_caseId" element={<SingleUseCase />} />
        </Route>

        <Route path="/use_case" element={<Outlet />}>
          <Route index element={<AllUseCase />} />
          <Route path=":use_caseId" element={<SingleUseCase />} />
        </Route>

        <Route path="/tool_noteBook" element={<Outlet />}>
          <Route index element={<AllToolNoteBook />} />
          <Route path=":toolNodeBookId" element={<SingleToolNotebook />} />
        </Route>

        {/* <Route path="/tool_noteBook" element={<AllToolNoteBook />} /> */}

        <Route path="/outreachy" element={<Outreachy />} />
        <Route path="/about" element={<About />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default AllComponent;
