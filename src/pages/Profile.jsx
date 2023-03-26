import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/DashboardHeader';
import ProfileBody from './profile/ProfileBody';

function Profile() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */} 
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="relative flex bg-gray-400 px-4">

            <ProfileBody />

          </div>
        </main>

      </div>
      
    </div>
  );
}

export default Profile;