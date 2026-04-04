import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header/Header';
import review_icon from "../assets/reviewbutton.png";

const Dealer = () => {

  const { id } = useParams();

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

  const dummyReviews = [
    {name:"Aman", review:"Great service", car_make:"Toyota", car_model:"Corolla", car_year:2022},
    {name:"Rahul", review:"Good experience", car_make:"Honda", car_model:"Civic", car_year:2021}
  ];

  const [dealer, setDealer] = useState(null);

  useEffect(() => {
    const d = dummyDealers.find(x => x.id === parseInt(id));
    setDealer(d);
  }, [id]);

  if (!dealer) return <div>Loading...</div>;

  return (
    <div>
      <Header />

      <h2>
        {dealer.full_name}
        <Link to={`/postreview/${id}`}>
          <img src={review_icon} className="review_icon" alt="review"/>
        </Link>
      </h2>

      <p>{dealer.city}, {dealer.state}</p>

      <div>
        {dummyReviews.map((r, i) => (
          <div key={i}>{r.review}</div>
        ))}
      </div>
    </div>
  );
};

export default Dealer;