import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
// import Header from "../common/Header"
// import Sidebar from "../common/Sidebar"

const RootLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/dashboard");
		}
	}, [location]);
	useEffect(() => {
		if (sidebarOpen) {
			window.scrollTo(0, 0);
		}
	}, [sidebarOpen]);

	return (
		<div className={`flex h-full ${sidebarOpen && "h-screen lg:h-full"}`}>
			{sidebarOpen && (
				<div className="relative">
					<aside
						className={`h-screen lg:w-72 top-0 bottom-0 z-40 fixed flex flex-row lg:sticky ${sidebarOpen ? "w-screen" : "w-0"
							} min-h-screen`}>
						<Sidebar setSidebarOpen={setSidebarOpen} />
						<div
							className="flex-grow lg:w-0 bg-gray-100 opacity-50"
							onClick={() => setSidebarOpen(false)}></div>
					</aside>
				</div>
			)}
			<div className={`w-full flex flex-col bg-[#f2f6f9]`}>
				<Header setSidebarOpen={setSidebarOpen} />
				<div
					className={`m-2 sm:m-3 md:m-4 lg:m-5  font-[Nunito Sans] rounded-[10px] flex-grow`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default RootLayout;
