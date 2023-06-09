import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.js";
import { auth, db } from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import Itinerary from "./Itinerary.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Itineraries.css';
import Loading from "../components/Loading.js";

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        getItineraries(uid);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [reload]);

  // get itinerary list from db, based on user id
  const getItineraries = (uid) => {
    const list = [];
    const itineraryQuery = query(
      collection(db, "itineraries"),
      where("uid", "==", uid)
    );
    try {
      // const itineraryQuerySnapshot = getDocs(itineraryQuery);
      getDocs(itineraryQuery).then((snapshot) => {
        snapshot.forEach((itinerary) => {
          list.push({
            iid: itinerary.id,
            name: itinerary.data().name,
            destination: itinerary.data().destination,
            startDate: itinerary.data().startDate,
            endDate: itinerary.data().endDate,
            days: itinerary.data().days,
          });
        });
        setItineraries(list);
        setLoaded(true);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="itineraries-container">
      <Navbar />
      {loaded !== true && <Loading />}
      {itineraries.length === 0 && loaded === true && (
        <div style={{ textAlign: "center", margin: "45vh" }}>
          No itineraries finalised yet.
        </div>
      )}
      <div className="itinerary-container">
      {itineraries.length > 0 &&
        loaded === true &&
        itineraries.map((item) => (
          <Itinerary
            key={item.iid}
            iid={item.iid}
            name={item.name}
            destination={item.destination}
            startDate={item.startDate}
            endDate={item.endDate}
            days={item.days}
            navigate={navigate}
            uid={uid}
            change={reload}
            changer={setReload}
          />
        ))}
      </div>
    </div>
  );
}
