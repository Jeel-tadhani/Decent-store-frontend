import ProductLogo from "/assets/images/ProductLogo.png";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { RiShutDownLine } from "react-icons/ri";
import { PiUserSquareFill } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";

const Sidebar = ({
	setSidebarOpen,
}: {
	setSidebarOpen: (pre: boolean) => void;
}) => {
	const [activeTab, setActiveTab] = useState(0);
	// const accessToken = localStorage.getItem("token");

	// const user: { role: string } = jwtDecode(accessToken as string);
	const user: { role: string } = { role: "admin" };

	const dispatch = useDispatch();

	const menus = useMemo(
		() => [
			{
				name: "Dashboard",
				link: "/dashboard",
				icon: <RxDashboard size={22} />,
			},
			{
				name: "User Management",
				link: "/user-management",
				icon: <PiUserSquareFill size={22} />,
				subMenus: [
					{
						subName: "Users",
						link: "/users",
					}
				],
			},
			// {
			// 	name: "Training Management",
			// 	link: "/training-management",
			// 	icon: <TfiBook size={22} />,
			// 	subMenus: [
			// 		{
			// 			subName: "Training Organisations",
			// 			link: "/training-organisations",
			// 		},
			// 		{
			// 			subName: "Trainers",
			// 			link: "/trainers",
			// 		},
			// 		{
			// 			subName: "Course Management",
			// 			link: "/course-management-cardpage",
			// 		},
			// 	],
			// },
			// {
			// 	name: "Client Management",
			// 	link: "/clients",
			// 	icon: <FiUserPlus size={22} />,
			// 	roles: [UserRole.SuperAdmin],
			// },
			// {
			// 	name: "Maturity Assessment",
			// 	link: "/maturity-assessment",
			// 	icon: <IoSpeedometerOutline size={22} />,
			// 	subMenus: [
			// 		{
			// 			subName: "Questions",
			// 			link: "/questions",
			// 		},
			// 		{
			// 			subName: "Maturity Level",
			// 			link: "/maturity-level",
			// 		},
			// 	],
			// },
			{
				name: "Web Portal Setting",
				link: "/web-portal-setting",
				icon: <AiOutlineGlobal size={22} />,
				subMenus: [
					{
						subName: "Banner Slider",
						link: "/banner-slider",
					},
					// {
					// 	subName: "Course Slider",
					// 	link: "/course-slider",
					// },
					{
						subName: "FAQ’s",
						link: "/faqs",
					},
					// {
					// 	subName: "Training Document",
					// 	link: "/training-document",
					// },
				],
			},
			// {
			// 	name: "Support Request",
			// 	link: "/support-request",
			// 	icon: <BsTicketPerforated size={22} />,
			// },
			{
				name: "Logout",
				link: "/",
				icon: <RiShutDownLine size={22} />,
			},
		],
		[]
	);

	const filterMenusByRoles = (menu: any): boolean => {
		if (!menu.roles) return true;
		return menu.roles.includes(parseInt(user.role));
	};

	const filterSubMenusByRoles = (subMenu: any): boolean => {
		if (!subMenu.roles) return true;
		return subMenu.roles.includes(parseInt(user.role));
	};

	const filterMenuItems = (menu: any): boolean => {
		if (!filterMenusByRoles(menu)) return false;
		if (menu.subMenus && menu.subMenus.length) {
			menu.subMenus = menu.subMenus.filter(filterSubMenusByRoles);
		}
		return true;
	};

	const menuList = useMemo(() => {
		return menus.filter(filterMenuItems);
	}, [menus]);

	useEffect(() => {
		const activeMenuIndex = menus.findIndex(
			(menu) =>
				menu.link === window.location.pathname ||
				(menu.subMenus &&
					menu.subMenus.some(
						(subMenu) =>
							"/" + subMenu.link.split("/").pop() === window.location.pathname
					))
		);
		setActiveTab(activeMenuIndex);
		if (!menus[activeMenuIndex]?.subMenus?.length)
			dispatch(
				setPath([
					{
						name: menus[activeMenuIndex]?.name,
						link: menus[activeMenuIndex]?.link,
					},
				])
			);
	}, []);

	const handleSetRoute = (item: any) => {
		if (item.name === "Logout") {
			localStorage.clear();
			window.location.href = "/";
			return;
		}
		setActiveTab(item.index);
		window.innerWidth < 1024 && setSidebarOpen(false);

		dispatch(setPath([{ name: item.name, link: item.link }]));
	};

	return (
		<div
			className={`top-0 left-0 lg:flex flex-col justify-between h-screen w-72 duration-500 text-gray-100 bg-[#fff] overflow-hidden shadow `}>
			<div className="px-1 w-72">
				<div className="p-4 flex justify-center items-center h-[90px]">
					<img src={ProductLogo} alt="logo" width={24} />
					<h4 className="ml-2 font-nunitoSans font-bold text-[#606060]">
						Product Logo
					</h4>
				</div>
				<div className="mt-4 flex flex-col gap-4 relative">
					{menuList?.map((menu, index) =>
						menu?.subMenus?.length ? (
							<ul key={index}>
								<li
									className={`text-[13px] font-normal leading-[normal] tracking-[0.288px] w-full`}>
									<DropdownMenu
										name={menu.name}
										className={`${activeTab === index
											? "bg-primary text-white"
											: "text-[#606060]"
											} group flex items-center text-sm  gap-3.5 font-medium py-2 px-4 hover:bg-primary hover:text-white rounded-md w-full`}
										subMenu={menu?.subMenus}
										icon={menu?.icon}
										index={index}
										setActiveTab={setActiveTab}
										activeTab={activeTab}
										setSidebarOpen={setSidebarOpen}
										menu={menu}
									/>
								</li>
							</ul>
						) : (
							<Link
								to={menu?.link}
								key={index}
								onClick={() => handleSetRoute({ ...menu, index })}
								className={`${activeTab === index
									? "bg-primary text-white"
									: "text-[#606060]"
									} group flex items-center text-sm  gap-3.5 font-medium py-2 px-4 hover:bg-primary hover:text-white rounded-md text-[13px]`}>
								<div>{menu?.icon}</div>
								<h2 className={`whitespace-pre`}>{menu?.name}</h2>
							</Link>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
