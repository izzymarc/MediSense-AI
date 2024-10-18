import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import TopNav from './TopNav';

const Portal = () => {
    return (
        <div className="flex h-full">
            <div className="w-64 fixed h-full">
                <SideNav />
            </div>
            <div className="flex-grow ml-64">
                <TopNav />
                <div className="p-4">
                    <Outlet /> {/* Specific page content based on the route */}
                </div>
            </div>
        </div>
    );
};

export default Portal;