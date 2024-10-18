import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import TopNav from './TopNav';

const Portal = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideNav />
            <div className="flex flex-col flex-grow h-full">
                <TopNav />
                <div className="flex-grow overflow-auto p-4">
                    <Outlet /> {/* Specific page content based on the route */}
                </div>
            </div>
        </div>
    );
};

export default Portal;