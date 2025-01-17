import React, { useState, useEffect } from "react";
import logoText from "../../assets/logo_Text.jpg";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Menu(name) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const [customer, setCustomer] = useState(null);
  const token = localStorage.getItem("token");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false); // Close dropdown when selecting a region
  };

  const navigate = useNavigate();

  const handleNavigateMienBac = (region) => {
    navigate(`/listTour?region=${region}`); // Điều hướng đến trang khác
    closeDropdown(); // Close dropdown
    setIsOpen(false); // Close the main menu if it's open
  };
  const handleNavigateSavedTour = () => {
    navigate('/savedTour'); // Điều hướng đến trang khác
    closeDropdown(); // Close dropdown
    setIsOpen(false); // Close the main menu if it's open
  };

  const handleNavigateGioiThieu = () => {
    navigate('/Introduce'); // Điều hướng đến trang khác
    console.log(name.name)
    setIsOpen(false);
  };

  const handleNavigateTrangChu = () => {
    navigate('/'); // Điều hướng đến trang khác
    setIsOpen(false);
  };

  const handleNavigateBookings = () => {
    navigate('/bookings'); // Điều hướng đến trang khác
  };
  const handleNavigateRefund = () => {
    navigate('/refund'); // Điều hướng đến trang khác
  };
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!token) {
        setCustomer(null);
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/customers/by-email",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomer(response.data);
        console.log("customer: ", response.data);
      } catch (error) {
        setCustomer(null);
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomer();
  }, [token]);
  return (
    <div className="w-screen max-w-full h-auto flex flex-col md:flex-row text-black bg-orange text-sm justify-between items-center">
      <div className="w-full md:w-[15%] pl-14 flex justify-between items-center">
        <img src={logoText} alt="Logo" className="w-[80px] h-auto" />
        <button className="block md:hidden p-2" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div
        className={`w-full md:w-[70%] flex flex-col md:flex-row items-center md:justify-center ${isOpen ? "block" : "hidden"} md:block`}
      >
        <ul className="w-full flex flex-col md:flex-row space-y-4 md:space-x-20 md:space-y-0 text-lg font-bold justify-center items-center">
          <li className={name.name === "Home" ? "text-textColorCustom" : "underline-hover hover:text-textColorCustom "}>
            <button onClick={handleNavigateTrangChu}>TRANG CHỦ</button>
          </li>
          <li className="relative dropdown dropdown-hover">
            <a
              tabIndex="0"
              className={name.name === "Tour" ? "flex items-center text-textColorCustom" : "flex items-center hover:text-textColorCustom underline-hover"}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            >
              TOUR <TiArrowSortedDown className="ml-2" size={20} />
            </a>
            {isDropdownOpen && (
              <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow">
                <li>
                  <button onClick={() => handleNavigateMienBac('NORTH')}>MIỀN BẮC</button>
                </li>
                <li>
                  <button onClick={() => handleNavigateMienBac('CENTRAL')}>MIỀN TRUNG</button>
                </li>
                <li>
                  <button onClick={() => handleNavigateMienBac('SOUTH')}>MIỀN NAM</button>
                </li>
                <li>
                  <button onClick={() => handleNavigateSavedTour()}>TOUR ĐÃ LƯU</button>
                </li>
              </ul>
            )}
          </li>
          {customer && (
            <li className="relative dropdown dropdown-hover">
              <a
                tabIndex="0"
                className={name.name == "Booking" ? "flex items-center text-textColorCustom" : "flex items-center hover:text-textColorCustom underline-hover"}
              >
                BOOKINGS <TiArrowSortedDown className="ml-2" size={20} />
              </a>
              <ul
                tabIndex="0"
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow"
              >
                <li>
                  <button onClick={handleNavigateBookings}>ĐẶT CHỔ CỦA TÔI</button>
                </li>
                <li>
                  <button onClick={handleNavigateRefund}>HOÀN TIỀN</button>
                </li>

              </ul>
            </li>
          )}
          <li className={name.name === "Introduce" ? "text-textColorCustom" : "underline-hover hover:text-textColorCustom "}>
            <button onClick={handleNavigateGioiThieu}> GIỚI THIỆU</button>
          </li>
          <li className="underline-hover hover:text-textColorCustom">
            TIN TỨC
          </li>
          <li className="underline-hover hover:text-textColorCustom">
            LIÊN HỆ
          </li>
        </ul>
      </div>

      <div className="flex items-center shadow-md bg-gray-100 p-2 h-12 rounded-full ml-auto mr-2">
        <div className="flex-grow overflow-hidden ">
          <input
            type="text"
            placeholder="Tìm kiếm tour..."
            className="focus:outline-none bg-gray-100 border-none placeholder-gray-300 font-semibold"
          />
        </div>
        <HiOutlineSearchCircle size={30} className="hover:text-textColorCustom" />
      </div>
    </div>
  );
}

export default Menu;
