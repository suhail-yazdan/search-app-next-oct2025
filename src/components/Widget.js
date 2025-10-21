import { FaBusSimple, FaPlaneUp, FaHotel, FaChessBoard } from "react-icons/fa6";
import { useState } from "react";

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

export default Widget