import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { dischargePatient, GetBeds } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";

const Beds_Rooms = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const { beds } = useSelector((state) => state.data);

  const DischargePatient = (_id) => {
    let data = {
      occupied: "available",
      _id,
    };
    dispatch(dischargePatient(data));
  };

  useEffect(() => {
    dispatch(GetBeds());
  }, [dispatch]);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>All Beds</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Bed</th>
                    <th>Floor</th>
                    <th>Status</th>
                    <th>Patient Name</th>
                    <th>Patient ID</th>
                    <th>Disease</th>
                    <th>Discharge</th>
                  </tr>
                </thead>
                <tbody>
                  {beds?.map((ele) => {
                    return (
                      <tr key={ele.id}>
                        <td>{ele.roomNumber}</td>
                        <td style={{ marginLeft: "1rem" }}>{ele.bedNumber}</td>
                        <td>{ele.floor}</td>
                        <td
                          style={{
                            color:
                              ele.occupied === "available" ? "green" : "orange",
                            fontWeight: "bold",
                          }}
                        >
                          {ele.occupied}
                        </td>
                        <td>
                          {ele.patient ? ele.patient.patientName : "No Patient"}
                        </td>
                        <td>
                          {ele.patient ? ele.patient.patientID : "N/A"}
                        </td>
                        <td>
                          {ele.patient ? ele.patient.disease : "N/A"}
                        </td>
                        <td>
                          <button
                            disabled={ele.occupied === "available"}
                            style={{
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              color:
                                ele.occupied === "available" ? "gray" : "red",
                              cursor:
                                ele.occupied === "available" ? "" : "pointer",
                            }}
                            onClick={() => DischargePatient(ele.id)}
                          >
                            Discharge
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beds_Rooms;
