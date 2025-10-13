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

  console.log("results", results)
  
  console.log("category", category)

  console.log("selected Category", selectedCategory)

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
              <section key={ind} className="w-[85%] mx-auto px-8 py-10 rounded-2xl shadow-lg mt-8">
                <h2 className="text-3xl font-semibold">{res.serviceName}</h2>
                <h3 className="text-2xl">{res.locations.length} {res.serviceType || category} available</h3>
                <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
                  {
                    res.locations.map((loc, index) =>(
                      <div key={index} className="flex items-center">
                        <span>{loc}</span>
                        {index !== res.locations.length - 1 && (
                          <MdArrowForwardIos size={24} color="gray" className="mx-2" />
                        )}
                      </div>
                    ))
                  }
                </div>
              </section>
            ))            
          }







          {/* <section className="w-[85%] mx-auto px-8 py-10 rounded-2xl shadow-lg mt-8">
            <h2 className="text-3xl font-semibold">SRS Travels</h2>
            <h3 className="text-2xl">5 Buses available</h3>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Tiruchendur <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              TutiCorin <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Madurai <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Trichi <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Perungulathur <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Chennai <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Tiruchendur <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              TutiCorin <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Madurai <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Karur <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Salem <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Hosur <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Bengaluru <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Tirunelveli <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Madurai <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Trichi <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Perungulathur <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Chennai <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Chennai <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Nellor <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Ogole <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Hyderabad <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Bengaluru <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Dharmavaram <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Anantapur <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Mahbubnagar <MdArrowForwardIos size={32} color="gray" className="mx-4" />
              Hyderabad <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>
          </section>

          <section className="w-[85%] mx-auto px-8 py-10 rounded-2xl shadow-lg mt-8">
            <h2 className="text-3xl font-semibold">Indigo Airlines</h2>
            <h3 className="text-2xl">5 Flights available</h3>


            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Tuticorin, India <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Chennai, India <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Madurai, India <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Chennai India <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Madurai, India <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Bengaluru, India <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Chennai, India <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Doha, Qatar <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Doha, Qatar <MdArrowForwardIos size={32} color="gray" className="mx-4" /> 
              Mumbai, India <MdArrowForwardIos size={32} color="gray" className="mx-4" />
            </div>
          </section>

          <section className="w-[85%] mx-auto px-8 py-10 rounded-2xl shadow-lg mt-8">
            <h2 className="text-3xl font-semibold">Hotel Mariott</h2>
            <h3 className="text-2xl">3 Hotels Available</h3>


            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Melbourne, Australia
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Auckland, New Zealand
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Dubai, UAE
            </div>

            <div className="flex items-center h-20 px-5 mt-6 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 rounded-xl">
              Chicago USA
            </div>
          </section> */}
        </div>
      </main>
      
    </>
  );
}
