"use client"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Card from "@/components/Card";
import Widget from "@/components/Widget";

export default function Home() {

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  
  // const [selectedCategory, setSelectedCategory] = useState('');

  // const [searchQuery, setSearchQuery] = useState('');

  const [results, setResults] = useState([]);
  const [category, setCategory] = useState([]);
 
  const makeAjaxCall = (cat, sQuery) => {
    let updatedResults = [];

    axios.get("/bookmytrip-service.json")
    .then((response) => {
      if(cat === "All") {
        const allData = [
          ...response.data.Buses.map(item => ({ ...item, serviceType: "Buses" })),
          ...response.data.Flights.map(item => ({ ...item, serviceType: "Flights" })),
          ...response.data.Hotels.map(item => ({ ...item, serviceType: "Hotels" }))
        ];

        allData.forEach((elem) => {
          if(elem.serviceName.toLowerCase().includes(sQuery.toLowerCase())){
            updatedResults.push(elem)
          }
        })
      } else {
        const bmtServices = response.data[cat];
        bmtServices.forEach((elem) => {
          if (elem.serviceName.toLowerCase().includes(sQuery.toLowerCase())) {
            updatedResults.push(elem)
          }
        })
      }

      setResults(updatedResults)
      setCategory(cat)

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

  const handleSubmit = (cat, sQuery) => {  
    setResults([]);
    makeAjaxCall(cat, sQuery);
  };

  return (
    <>
      <header className="h-[320px] bg-[url(../../public/images/clouds.jpg)] bg-center bg-cover border-t">
        <div className='flex justify-center items-center mt-40' ref={dropdownRef}>
          <Widget onSubmit={handleSubmit} />
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