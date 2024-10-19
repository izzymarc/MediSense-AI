import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../images/banner-1.avif';
import Profile1 from '../images/profile1.avif';
import Profile2 from '../images/profile3.avif';
import Profile3 from '../images/profile2.avif';


const Hero = () => {
    return (
        <div className="bg-transparent">
            
            <main className="flex-1 flex p-8 mx-16 my-5 relative">
                <div className="flex flex-col justify-between pr-4">
                    {/* Section1 */}
                    <div className="text-5xl font-bold text-black leading-normal -pb-4">
                        Empower your <br/>health, expert insight, <br /> <span className="text-gray-500">Anytime</span>
                    </div>
                    
                    {/* Section2 */}
                    <div className="flex justify-between items-center -pb-4">
                        <Link to="/ai-test" className=" bg-transparent border border-cyan-600 text-black py-2 px-4 rounded-md text-xs mr-4">Go to AI Test</Link>
                        <div className="flex items-center">
                            <span className="text-xs text-gray-700">12k+ Users</span>
                            <div className="flex -space-x-2 ml-2">
                               
                                <img className="h-12 w-12 rounded-full border-2 border-white" src={Profile1} alt="User 1" />
                                <img className="h-12 w-12 rounded-full border-2 border-white" src={Profile2} alt="User 2" />
                                <img className="h-12 w-12 rounded-full border-2 border-white" src={Profile3} alt="User 3" />
                            </div>
                        </div>
                    </div>

                    {/* Section3 */}
                    <div className="flex justify-between items-center w-full gap-4 -pb-4">
                        <div className="bg-yellow-400 flex-1 rounded-lg h-44"></div>
                        <div className="bg-purple-300 flex-1 rounded-lg h-44"></div>
                    </div>
                </div>
                
                {/* Right Div */}
                <div className="flex-1">
                    <img src={Banner} alt="Health Illustration" className="w-full h-full rounded-2xl object-cover" />
                </div>
            </main>
        </div>
    );
};

export default Hero;
