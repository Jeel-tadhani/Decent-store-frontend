import { BsPeopleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";

function CourseInformation() {
    return (
        <>
            <div className="p-[25px]">
                <h2 className="text-[20px] font-[700] leading-[27px] ">
                    The standard Lorem Ipsum passage, used since the 1500s
                </h2>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
            </div>
            <div className="pl-[25px] pr-[25px]">
                <h2 className="text-[20px] font-[700] leading-[27px] ">
                    The standard Lorem Ipsum passage, used since the 1500s
                </h2>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
            </div>
            <div className="pl-[25px] pt-[41px] pr-[25px] flex">
                <div className=" p-3  text-center text-[#00778B] bg-[#F5F7FF] rounded-[50%]">
                    <BsPeopleFill className="text-[35px]" />
                </div>
                <div className="pl-[20px] pr-[54px]">
                    <h3>1000+</h3>
                    <p>Delegates Enrolled</p>
                </div>
                <div className=" p-3  text-center text-[#00778B] bg-[#F5F7FF] rounded-[50%]">
                    <FaStar className="text-[35px]" />
                </div>
                <div className="pl-[20px] pr-[54px]">
                    <h3>4/5 (950 People Like)</h3>
                    <p>Overall Rating</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                </label>
                <div className="pl-[20px]">
                    <h3>Course slider</h3>
                    <p>Add to course slider</p>
                </div>
            </div>
            
        </>
    );
}

export default CourseInformation;