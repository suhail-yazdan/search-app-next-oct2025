"use client"
import { useState, useRef, useEffect } from "react";
import { FaBusSimple, FaPlaneUp, FaHotel, FaChessBoard } from "react-icons/fa6";
import axios from "axios";
import Card from "@/components/Card";


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


const Widget = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dropdownVisibility, setDropdownVisibility] = useState(false)

  return(
    <form className="flex flex-col w-[75%]">
      <div className="flex items-center justify-center w-full">
        <input 
            id="search"
            type="text" 
            value = {searchQuery}
            placeholder='Search for the name of a bus service, flight service or a hotel'
            autoComplete='off'
            className='w-full h-[40px] rounded-l-3xl shadow-lg ps-5 bg-white'
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setDropdownVisibility(!dropdownVisibility)}
        />

        <input 
            type="button"
            className='h-[40px] px-20 rounded-r-3xl cursor-pointer bg-gray-200 hover:bg-gray-300 border-l border-gray-400'
            value="Submit"
            onClick={() => {props.onSubmit(selectedCategory, searchQuery); setDropdownVisibility(false)}}
        />
      </div>

      {dropdownVisibility && <section className="bg-white w-[81%] ml-[1.7%] flex items-center py-5 px-10 ">
        <div className='flex items-center mr-4'>
          <input type="radio" name="category" value="Buses" onChange={(e) => {setSelectedCategory(e.target.value); setSearchQuery('')}} />
          <label className="grid items-center grid-cols-2 gap-3 ml-2">Buses <FaBusSimple /> </label>
        </div>

        <div className='flex items-center mr-4'>
          <input type="radio" name="category" value="Flights" onChange={(e) => {setSelectedCategory(e.target.value); setSearchQuery('')}} />
          <label className="grid items-center grid-cols-2 gap-3 ml-2">Flights <FaPlaneUp /> </label>
        </div>

        <div className='flex items-center mr-4'>
          <input type="radio" name="category" value="Hotels" onChange={(e) => {setSelectedCategory(e.target.value); setSearchQuery('')}} />
          <label className="grid items-center grid-cols-2 gap-3 ml-2">Hotels <FaHotel /> </label>
        </div>

        <div className='flex items-center mr-4'>
          <input type="radio" name="category" value="All" onChange={(e) => {setSelectedCategory(e.target.value); setSearchQuery('')}} />
          <label className="grid items-center grid-cols-2 gap-3 ml-2">All <FaChessBoard /> </label>
        </div>
      </section>}
    </form>
  )
}