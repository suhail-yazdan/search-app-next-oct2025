import { useState, useEffect } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

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

  export default Card