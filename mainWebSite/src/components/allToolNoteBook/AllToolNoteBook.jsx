import React, { useState } from "react";
import BiologyTNB from "./biology/BiologyTNB";
import BiomedicalScienceTNB from "./biomedicalScience/BiomedicalScienceTNB";
import ChemistryTNB from "./chemistry/ChemistryTNB";
import ComputationalBiologyTNB from "./computationalBiology/ComputationalBiologyTNB";
import ComputerScienceTNB from "./computerScience/ComputerScienceTNB";
import ExperimentalDesignAndStudiesTNB from "./experimentalDesignAndStudies/ExperimentalDesignAndStudiesTNB";
import InformaticsTNB from "./informatics/InformaticsTNB";
import LaboratoryTechniquesTNB from "./laboratoryTechniques/LaboratoryTechniquesTNB";
import LiteratureAndLanguageTNB from "./literatureAndLanguage/LiteratureAndLanguageTNB";
import MathematicsTNB from "./mathematics/MathematicsTNB";
import MedicineTNB from "./medicine/MedicineTNB";
import OmicsTNB from "./omics/OmicsTNB";
import PhysicsTNB from "./physics/PhysicsTNB";
import axios from "axios";
import ToolNotebookSearchList from "./ToolNoteBookSearchList";
import CloseIcon from "@mui/icons-material/Close";

const AllToolNoteBook = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchHandler = async (event) => {
    event.target.value.length === 0
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    try {
      const result = await axios.get(
        `/api/v1/user/search/toolNotebook/${event.target.value}`
      );
      setShowSearchResult(true);
      setSearchResult(result.data.toolNoteBook);
    } catch (error) {
      setSearchResult([]);
    }
  };
  return (
    <>
      <dir className="row d-flex justify-content-center mt-5">
        <div className="col-md-6 " style={{ position: "relative" }}>
          <input
            type="text"
            onChange={searchHandler}
            placeholder="Search Tool Notebook by name"
            style={{ width: "100%", color: "rgba(0, 0, 0, 0.49)" }}
          />
          <div style={{ position: "absolute", right: "15px", top: 0 }}>
            <CloseIcon onClick={(e) => setShowSearchResult(false)} />
          </div>
        </div>
      </dir>
      {showSearchResult ? (
        <ToolNotebookSearchList
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      ) : (
        <div className="container">
          <BiologyTNB />
          <hr />
          <BiomedicalScienceTNB />
          <hr />
          <ChemistryTNB />
          <hr />
          <ComputationalBiologyTNB />
          <hr />
          <ComputerScienceTNB />
          <hr />
          <ExperimentalDesignAndStudiesTNB />
          <hr />
          <InformaticsTNB />
          <hr />
          <LaboratoryTechniquesTNB />
          <hr />
          <LiteratureAndLanguageTNB />
          <hr />
          <MathematicsTNB />
          <hr />
          <MedicineTNB />
          <hr />
          <OmicsTNB />
          <hr />
          <PhysicsTNB />
        </div>
      )}
    </>
  );
};

export default AllToolNoteBook;
