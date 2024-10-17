import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import TopNav from './TopNav';

const Portal = () => {
    return (
        <div className="flex h-screen">
            {/* Fixed Sidebar */}
            <SideNav />

            {/* Main Content */}
            <div className="flex-grow flex flex-col overflow-y-auto">
                {/* Top Navigation */}
                <TopNav />

                {/* Page Content */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <Outlet /> {/* Specific page content based on the route */}
                </div>
            </div>
        </div>
    );
};

export default Portal;