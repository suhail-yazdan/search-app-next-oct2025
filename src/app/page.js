"use client"
import { useState, useRef, useEffect } from "react";
import { FaBusSimple, FaPlaneUp, FaHotel, FaChessBoard } from "react-icons/fa6";
import { MdArrowForwardIos } from 'react-icons/md';
import axios from "axios";

export default function Home() {

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState('');

  const [results, setResults] = useState([]);
  const [category, setCategory] = useState([]);
 
  const makeAjaxCall = (category) => {
    let updatedResults = [];

    axios.get("/bookmytrip-service.json")
    .then((response) => {
      if(category === "All") {
        const allData = [
          ...response.data.Buses.map(item => ({ ...item, serviceType: "Buses" })),
          ...response.data.Flights.map(item => ({ ...item, serviceType: "Flights" })),
          ...response.data.Hotels.map(item => ({ ...item, serviceType: "Hotels" }))
        ]
        
        updatedResults = allData

      } else {
        let bmtServices = response.data[category]
        bmtServices.forEach((elem) => {
          updatedResults.push(elem)
        })
      }

      setResults(updatedResults)
      setCategory(category)

      console.log("updated response data ", updatedResults)
    })
    .catch((error) => {
      console.log("error fetching data", error)
    })
  }

  // console.log("results", results)
  
  // console.log("category", category)

  // console.log("selected Category", selectedCategory)

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event){
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownVisibility(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <>
      <header className="h-[320px] bg-[url(../../public/images/clouds.jpg)] bg-center bg-cover border-t">
        <div className='flex justify-center items-center mt-40' ref={dropdownRef}>
          <form className="flex flex-col w-[75%]">
            <div className="flex items-center justify-center w-full">
              <input 
                  id="search"
                  type="text" 
                  placeholder='Search for the name of a bus service, flight service or a hotel'
                  autoComplete='off'
                  className='w-full h-[40px] rounded-l-3xl shadow-lg ps-5 bg-white'
                  onClick={() => setDropdownVisibility(!dropdownVisibility)}
              />

              <input 
                  type="button"
                  className='h-[40px] px-20 rounded-r-3xl cursor-pointer bg-gray-200 hover:bg-gray-300 border-l border-gray-400'
                  value="Submit"
                  onClick={() => makeAjaxCall(selectedCategory)}
              />
            </div>

            {dropdownVisibility && <section className="bg-white w-[81%] ml-[1.7%] flex items-center py-5 px-10 ">
              <div className='flex items-center mr-4'>
                <input type="radio" name="category" value="Buses" onChange={(e) => setSelectedCategory(e.target.value)} />
                <label className="grid items-center grid-cols-2 gap-3 ml-2">Buses <FaBusSimple /> </label>
              </div>

              <div className='flex items-center mr-4'>
                <input type="radio" name="category" value="Flights" onChange={(e) => setSelectedCategory(e.target.value)} />
                <label className="grid items-center grid-cols-2 gap-3 ml-2">Flights <FaPlaneUp /> </label>
              </div>

              <div className='flex items-center mr-4'>
                <input type="radio" name="category" value="Hotels" onChange={(e) => setSelectedCategory(e.target.value)} />
                <label className="grid items-center grid-cols-2 gap-3 ml-2">Hotels <FaHotel /> </label>
              </div>

              <div className='flex items-center mr-4'>
                <input type="radio" name="category" value="All" onChange={(e) => setSelectedCategory(e.target.value)} />
                <label className="grid items-center grid-cols-2 gap-3 ml-2">All <FaChessBoard /> </label>
              </div>
            </section>}
          </form>
        </div>
      </header>

      <main>
        <div className="pt-10">
          
          {results.map((res, ind) => (
              <Card
                key={res.serviceID}
                sname={res.serviceName}
                sloc={res.locations}
                stype={res.serviceType || category}
              />
            ))            
          }

        </div>
      </main>
      
    </>
  );
}

function Card({ sname, sloc, stype }) {
  const [locations, setLocations] = useState([]);

  // {console.log("category - - - ", stype)}

  console.log("location ids for each card", sloc)

  const getRoute = () => {
    const resultLocations = [];

    const routes = {
      RT101: ["Tiruchendur", "Tuticorin", "Madurai", "Trichy", "Perungulathur", "Chennai"],
      RT102: ["Tiruchendur", "Tuticorin", "Madurai", "Karur", "Salem", "Hosur", "Bengaluru"],
      RT103: ["Tirunelveli", "Madurai", "Trichy", "Perungulathur", "Chennai"],
      RT104: ["Tuticorin", "Madurai", "Salem", "Coimbatore"],
      RT105: ["Coimbatore", "Erode", "Salem", "Dharmapuri", "Hosur", "Bengaluru"],
      RT106: ["Coimbatore", "Erode", "Salem", "Viluppuram", "Tindivanam", "Chennai"],
      RT107: ["Goa", "Belgaum", "Kolhapur", "Satara", "Pune", "Mumbai"],
      RT108: ["Mumbai", "Vadodara", "Udaipur", "Jaipur", "New Delhi"],
      RT109: ["Chennai", "Nellore", "Ongole", "Hyderabad"],
      RT110: ["Bengaluru", "Dharmavaram", "Anantapur", "Mahbubnagar", "Hyderabad"],
      RT201: ["Tuticorin, India", "Chennai, India"],
      RT202: ["Madurai, India", "Chennai, India"],
      RT203: ["Madurai, India", "Bengaluru, India"],
      RT210: ["Chennai, India", "Doha, Qatar"],
      RT211: ["Mumbai, India", "Doha, Qatar"],
      RT212: ["Bengaluru, India", "Doha, Qatar"],
      RT220: ["New Delhi, India", "Dubai, UAE", "New York, USA"],
      RT221: ["Mumbai, India", "Dubai, UAE", "New York, USA"],
      RT222: ["Chennai, India", "Dubai, UAE", "New York, USA"],
      RT230: ["Dubai, UAE", "Port Louis, Singapore"],
      RT231: ["Trichy, India", "Port Louis, Singapore"],
      RT232: ["Chennai, India", "Bali, Indonesia"],
    };
  
    sloc.forEach((route) => {
      let opt = [];
  
      // For Bus or Flight routes — match route code
      if (stype === "Buses" || stype === "Flights") {
        const matchedCities = routes[route];

        // console.log("matchedc cities ----", matchedCities)

        if (matchedCities){
          opt = matchedCities.map((city, index) => (
            <div key={index} className="flex items-center">
              <span>{city}</span>
              {index !== matchedCities.length - 1 && (
                <MdArrowForwardIos size={24} color="gray" className="mx-2" />
              )}
            </div>
          ))

          // console.log("opt- - - - - -", opt)
        }
      }
  
      // For Hotels — directly show the route name
      if (stype === "Hotels") {
        opt = <span>{route}</span>;
      }
  
      // Add the route block
      const routeList = (
        <div
          key={route}
          className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl"
        >
          {opt}
        </div>
      );
  
      resultLocations.push(routeList);
    });
  
    setLocations(resultLocations);
  };
  
  useEffect(() => {
    getRoute();
  }, [stype, sloc]);

  return (
    <section className="w-[85%] mx-auto px-8 py-10 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-semibold">{sname}</h2>
      <h3 className="text-2xl">
        {sloc.length} {stype} available
      </h3>

      <div>{locations}</div>

    </section>
  );
}