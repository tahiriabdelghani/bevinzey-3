import React, { useEffect, useState } from "react";

import SearchModal from "../components/ModalSearch";
import UserMenu from "../components/DropdownProfile";
import axios from "axios";
import { useSelector } from "react-redux";

function DashboardHeader({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [userData, setUserdata] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + user?.id
      )
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <div className="text-[#fff] p-4 pr-0">
              {userData && (
                <>
                  <div className="lg:text-[26px] font-[700] text-[18px]">
                    {"Hey " + userData?.first_name + " " + userData?.last_name}
                  </div>
                  <div className="text-[12px] lg:text-[16px]">
                    Welcome back. Let's do something epic
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div>
              <SearchModal
                id="search-modal"
                searchId="search"
                modalOpen={searchModalOpen}
                setModalOpen={setSearchModalOpen}
              />
            </div>
            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-slate-200 mx-3" /> */}
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
