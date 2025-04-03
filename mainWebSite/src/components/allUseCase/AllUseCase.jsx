import React, { useState } from "react";
import BiologyUC from "./biology/BiologyUC";
import BiomedicalScienceUC from "./biomedicalScience/BiomedicalScienceUC";
import ChemistryUC from "./chemistry/ChemistryUC";
import ComputationalBiologyUC from "./computationalBiology/ComputationalBiologyUC";
import ComputerScienceUC from "./computerScience/ComputerScienceUC";
import ExperimentalDesignAndStudiesUC from "./experimentalDesignAndStudies/ExperimentalDesignAndStudiesUC";
import InformaticsUC from "./informatics/InformaticsUC";
import LaboratoryTechniquesUC from "./laboratoryTechniques/LaboratoryTechniquesUC";
import LiteratureAndLanguageUC from "./literatureAndLanguage/LiteratureAndLanguageUC";
import MathematicsUC from "./mathematics/MathematicsUC";
import MedicineUC from "./medicine/MedicineUC";
import OmicsUC from "./omics/OmicsUC";
import PhysicsUC from "./physics/PhysicsUC";
import axios from "axios";
import UseCaseSearchList from "./UseCaseSearchList";
import CloseIcon from "@mui/icons-material/Close";

const AllUseCase = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchHandler = async (event) => {
    event.target.value.length === 0
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    try {
      const result = await axios.get(
        `/api/v1/user/search/useCase/${event.target.value}`
      );
      setShowSearchResult(true);
      setSearchResult(result.data.useCase);
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
            placeholder="Search Use Case by name"
            style={{ width: "100%", color: "rgba(0, 0, 0, 0.49)" }}
          />
          <div style={{ position: "absolute", right: "15px", top: 0 }}>
            <CloseIcon onClick={(e) => setShowSearchResult(false)} />
          </div>
        </div>
      </dir>
      {showSearchResult ? (
        <UseCaseSearchList
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      ) : (
        <div className="container">
          <BiologyUC />
          <hr />
          <BiomedicalScienceUC />
          <hr />
          <ChemistryUC />
          <hr />
          <ComputationalBiologyUC />
          <hr />
          <ComputerScienceUC />
          <hr />
          <ExperimentalDesignAndStudiesUC />
          <hr />
          <InformaticsUC />
          <hr />
          <LaboratoryTechniquesUC />
          <hr />
          <LiteratureAndLanguageUC />
          <hr />
          <MathematicsUC />
          <hr />
          <MedicineUC />
          <hr />
          <OmicsUC />
          <hr />
          <PhysicsUC />
        </div>
      )}
    </>
  );
};

export default AllUseCase;
