import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {

  const { id } = useParams();

  const [dealer, setDealer] = useState(null);
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  const root_url = window.location.origin + "/";
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const review_url = `${root_url}djangoapp/add_review`;
  const carmodels_url = `${root_url}djangoapp/get_cars`;

  // =========================
  // FALLBACK (prevents empty dropdown)
  // =========================
  const fallbackCars = [
    { CarMake: "Toyota", CarModel: "Corolla" },
    { CarMake: "Honda", CarModel: "Civic" },
    { CarMake: "Ford", CarModel: "Mustang" },
    { CarMake: "BMW", CarModel: "X5" },
    { CarMake: "Audi", CarModel: "A4" },
    { CarMake: "Tesla", CarModel: "Model 3" },
    { CarMake: "Hyundai", CarModel: "Creta" },
    { CarMake: "Kia", CarModel: "Seltos" }
  ];

  // =========================
  // FETCH DEALER
  // =========================
  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      console.log("Dealer API status:", res.status);

      const data = await res.json();
      console.log("Dealer API data:", data);

      if (data.status === 200) {
        if (Array.isArray(data.dealer)) {
          setDealer(data.dealer[0]);
        } else {
          setDealer(data.dealer);
        }
      }
    } catch (err) {
      console.error("Dealer fetch error:", err);
    }
  };

  // =========================
  // FETCH CAR MODELS
  // =========================
  const get_cars = async () => {
    try {
      const res = await fetch(carmodels_url);
      console.log("Cars API status:", res.status);

      const data = await res.json();
      console.log("Cars API data:", data);

      if (data.CarModels && data.CarModels.length > 0) {
        setCarmodels(data.CarModels);
      } else {
        console.warn("Using fallback cars");
        setCarmodels(fallbackCars);
      }
    } catch (err) {
      console.error("Cars API failed → fallback used");
      setCarmodels(fallbackCars);
    }
  };

  // =========================
  // POST REVIEW
  // =========================
  const postreview = async () => {

    let name =
      sessionStorage.getItem("firstname") + " " +
      sessionStorage.getItem("lastname");

    if (!name || name.includes("null")) {
      name = sessionStorage.getItem("username");
    }

    if (!model || !review || !date || !year) {
      alert("All fields are mandatory");
      return;
    }

    const [make, modelName] = model.split("|");

    const payload = {
      name: name,
      dealership: id,
      review: review,
      purchase: true,
      purchase_date: date,
      car_make: make,
      car_model: modelName,
      car_year: year,
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(review_url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Post API status:", res.status);

      const data = await res.json();
      console.log("Post API response:", data);

      if (data.status === 200) {
        window.location.href = `/dealer/${id}`;
      } else {
        alert("Post failed");
      }

    } catch (err) {
      console.error("Post review error:", err);
    }
  };

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  // prevent crash before data loads
  if (!dealer) return <div>Loading...</div>;

  return (
    <div>
      <Header />

      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>

        <textarea
          cols="50"
          rows="7"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="input_field">
          Purchase Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input_field">
          Car Make
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">Select Car</option>

            {carmodels.map((c, i) => (
              <option key={i} value={`${c.CarMake}|${c.CarModel}`}>
                {c.CarMake} {c.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className="input_field">
          Car Year
          <input
            type="number"
            min="2015"
            max="2026"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button className="postreview" onClick={postreview}>
          Post Review
        </button>
      </div>
    </div>
  );
};

export default PostReview;