import React, { useState } from "react";
import BiologyNB from "./biology/BiologyNB";
import BiomedicalScienceNB from "./biomedicalScience/BiomedicalScienceNB";
import ChemistryNB from "./chemistry/ChemistryNB";
import ComputationalBiologyNB from "./computationalBiology/ComputationalBiologyNB";
import ComputerScienceNB from "./computerScience/ComputerScienceNB";
import ExperimentalDesignAndStudiesNB from "./experimentalDesignAndStudies/ExperimentalDesignAndStudiesNB";
import InformaticsNB from "./informatics/InformaticsNB";
import LaboratoryTechniquesNB from "./laboratoryTechniques/LaboratoryTechniquesNB";
import LiteratureAndLanguageNB from "./literatureAndLanguage/LiteratureAndLanguageNB";
import MathematicsNB from "./mathematics/MathematicsNB";
import MedicineNB from "./medicine/MedicineNB";
import OmicsNB from "./omics/OmicsNB";
import PhysicsNB from "./physics/PhysicsNB";
import axios from "axios";
import NotebookSearchList from "./NoteBookSearchList";
import CloseIcon from "@mui/icons-material/Close";

const AllNoteBook = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchHandler = async (event) => {
    event.target.value.length === 0
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    try {
      const result = await axios.get(
        `/api/v1/user/search/notebook/${event.target.value}`
      );
      setShowSearchResult(true);
      setSearchResult(result.data.noteBook);
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
            placeholder="Search Notebook by name"
            style={{ width: "100%", color: "rgba(0, 0, 0, 0.49)" }}
          />
          <div style={{ position: "absolute", right: "15px", top: 0 }}>
            <CloseIcon onClick={(e) => setShowSearchResult(false)} />
          </div>
        </div>
      </dir>
      {showSearchResult ? (
        <NotebookSearchList
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      ) : (
        <div className="container">
          <BiologyNB />
          <hr />
          <BiomedicalScienceNB />
          <hr />
          <ChemistryNB />
          <hr />
          <ComputationalBiologyNB />
          <hr />
          <ComputerScienceNB />
          <hr />
          <ExperimentalDesignAndStudiesNB />
          <hr />
          <InformaticsNB />
          <hr />
          <LaboratoryTechniquesNB />
          <hr />
          <LiteratureAndLanguageNB />
          <hr />
          <MathematicsNB />
          <hr />
          <MedicineNB />
          <hr />
          <OmicsNB />
          <hr />
          <PhysicsNB />
        </div>
      )}
    </>
  );
};

export default AllNoteBook;
