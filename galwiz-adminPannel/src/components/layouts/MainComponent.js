import React from "react";
import LeftSideBar from "./LeftSideBar";
import Search from "./Search";

import Dashboard from "../dashBoard/DashBoard.js";

import User from "../user/Users";
import NoteBook from "../notebook/NoteBook";
import UnveryfiedNotebook from "../notebook/UnveryfiedNotebook";
import SingleNotebook from "../notebook/SingleNotebook";
import ToolNoteBook from "../tool_noteBook/ToolNoteBook";
import SingleToolNotebook from "../tool_noteBook/SingleToolNotebook";
import UnveryfiedToolNotebook from "../tool_noteBook/UnveryfiedToolNotebook";
import UploadImageForMile from "../outreachy/UploadImageForMile";

import UseCase from "../useCase/UseCase";
import UseCaseUnveryfied from "../useCase/UseCaseUnveryfied";
import SingleUseCase from "../useCase/SIngleUseCase";

import LogOut from "../logOut/LogOut";
import { Route, Routes, Outlet } from "react-router-dom";
import Workflow from "../workflow/Workflow";
import CreateWorkflow from "../workflow/CreateWorkflow";
import Feedback from "../feedback/Feedback";
import Subscribe from "../subscribe/Subscribe";
import Outreachy from "../outreachy/Outreachy";
const MainComponent = () => {
  return (
    <div>
      <LeftSideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/notebook" element={<NoteBook />} />
          <Route path="/tool_noteBook" element={<ToolNoteBook />} />
          <Route path="/use_case" element={<UseCase />} />

          {/* <Route path="/unapproved_notebook" element={<UnveryfiedNotebook />} /> */}
          <Route path="/unapproved_notebook" element={<Outlet />}>
            <Route index element={<UnveryfiedNotebook />} />
            <Route path=":nodeBookId" element={<SingleNotebook />} />
          </Route>
          {/* <Route
            path="/unapproved_tool_noteBook"
            element={<UnveryfiedToolNotebook />}
          /> */}
          <Route path="/unapproved_tool_notebook" element={<Outlet />}>
            <Route index element={<UnveryfiedToolNotebook />} />
            <Route path=":nodeBookId" element={<SingleToolNotebook />} />
          </Route>
          {/* <Route path="/unapproved_use_case" element={<UseCaseUnveryfied />} /> */}
          <Route path="/unapproved_use_case" element={<Outlet />}>
            <Route index element={<UseCaseUnveryfied />} />
            <Route path=":useCaseId" element={<SingleUseCase />} />
          </Route>

          <Route path="/workflow" element={<Workflow />} />
          <Route path="/create_workflow" element={<CreateWorkflow />} />

          <Route path="/outreachy" element={<Outreachy />} />

          <Route path="/mile_upload" element={<UploadImageForMile />} />
          <Route path="/subscribe_email" element={<Subscribe />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </LeftSideBar>
    </div>
  );
};
export default MainComponent;
