import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";
import { Link } from "react-router-dom";

const Dealers = () => {

  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  // 🔥 DUMMY DATA
  const dummyDealers = [
    {id:1, full_name:"Best Cars NY", city:"New York", address:"123 Main St", zip:"10001", state:"NY"},
    {id:2, full_name:"Auto Hub Chicago", city:"Chicago", address:"456 Lake Shore", zip:"60601", state:"IL"},
    {id:3, full_name:"DriveTime LA", city:"Los Angeles", address:"789 Sunset Blvd", zip:"90001", state:"CA"},
    {id:4, full_name:"Car Nation Dallas", city:"Dallas", address:"321 Elm St", zip:"75201", state:"TX"},
    {id:5, full_name:"Auto Plaza Miami", city:"Miami", address:"654 Ocean Dr", zip:"33101", state:"FL"},
    {id:6, full_name:"Speed Motors Seattle", city:"Seattle", address:"987 Pine St", zip:"98101", state:"WA"},
    {id:7, full_name:"Urban Cars Denver", city:"Denver", address:"159 Market St", zip:"80201", state:"CO"},
    {id:8, full_name:"Prime Autos Boston", city:"Boston", address:"753 Beacon St", zip:"02101", state:"MA"},
    {id:9, full_name:"Metro Cars Atlanta", city:"Atlanta", address:"852 Peachtree St", zip:"30301", state:"GA"},
    {id:10, full_name:"Luxury Wheels Vegas", city:"Las Vegas", address:"951 Strip Blvd", zip:"89101", state:"NV"}
  ];

  // 🔥 USE DUMMY DATA ALWAYS
  useEffect(() => {
    setDealersList(dummyDealers);
    setStates([...new Set(dummyDealers.map(d => d.state))]);
  }, []);

  const filterDealers = (state) => {
    if (state === "All") {
      setDealersList(dummyDealers);
    } else {
      setDealersList(dummyDealers.filter(d => d.state === state));
    }
  };

  const isLoggedIn = sessionStorage.getItem("username");

  return (
    <div>
      <Header />

      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select onChange={(e) => filterDealers(e.target.value)} defaultValue="">
                <option value="" disabled>State</option>
                <option value="All">All</option>
                {states.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </th>
            {isLoggedIn && <th>Review</th>}
          </tr>
        </thead>

        <tbody>
          {dealersList.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>

              <td>
                <Link to={`/dealer/${d.id}`}>
                  {d.full_name}
                </Link>
              </td>

              <td>{d.city}</td>
              <td>{d.address}</td>
              <td>{d.zip}</td>
              <td>{d.state}</td>

              {isLoggedIn && (
                <td>
                  <Link to={`/postreview/${d.id}`}>
                    <img src={review_icon} className="review_icon" alt="review"/>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;