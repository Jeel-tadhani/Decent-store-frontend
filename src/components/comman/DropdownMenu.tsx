import { setPath } from "@/redux/Reducer/PathReducer";
import { FC, useState, ReactNode, useEffect } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface DropdownFilterProps {
	showSeeAll?: boolean;
	className?: string;
	subMenu: {
		subName: string;
		link: string;
	}[];
	name: string;
	icon?: ReactNode;
	setActiveTab?: any;
	activeTab?: any;
	index?: number;
	setSidebarOpen: (pre: boolean) => void;
	menu: any;
}

const DropdownMenu: FC<DropdownFilterProps> = ({
	className,
	subMenu,
	name,
	icon,
	setActiveTab,
	activeTab,
	index,
	setSidebarOpen,
	menu,
}) => {
	const navigate = useNavigate();
	const [checkedsubMenu, setCheckedsubMenu] = useState("");

	const dispatch = useDispatch();

	const handelSetRoute = (item: any) => {
		setCheckedsubMenu(item.link);
		navigate(item.link);

		dispatch(
			setPath([
				{
					name: menu.name,
					link: null,
				},
				{
					name: item.subName,
					link: item.link,
				},
			])
		);
		window.innerWidth < 1024 && setSidebarOpen(false);
	};
	useEffect(() => {
		const activeMenuIndex = subMenu.findIndex(
			(menu) => window.location.pathname === menu?.link
		);
		if (activeMenuIndex !== -1) {
			setCheckedsubMenu(subMenu[activeMenuIndex].link);
			dispatch(
				setPath([
					{
						name: menu.name,
						link: null,
					},
					{
						name: subMenu[activeMenuIndex]?.subName,
						link: subMenu[activeMenuIndex]?.link,
					},
				])
			);
		}
	}, []);
	return (
		<div className="relative mx-auto w-full text-left">
			<button
				onClick={() => {
					setActiveTab(activeTab === index ? -1 : index);
				}}
				type="button"
				className={`group flex items-center justify-between text-[13px] gap-3.5 font-medium py-2 px-4 hover:bg-primary hover:text-white rounded-md ${className}`}>
				<div className="flex items-center gap-3.5">
					{icon}
					<label>{name}</label>
				</div>

				{index === activeTab ? (
					<FaAngleDown className="" />
				) : (
					<FaAngleRight className="" />
				)}
			</button>

			{index === activeTab && (
				<div
					className={`transition-max-height overflow-hidden duration-200 ${
						index === activeTab ? "max-h-screen" : "max-h-0"
					}`}>
					<div className="mx-auto w-full pl-[66px] pb-[5px]">
						{subMenu.map((item, index) => (
							<div
								key={index}
								className={`block text-[#505050] cursor-pointer items-center pt-[25px] text-left font-Inter text-[13px] font-normal tracking-[0.228px] ${
									item.link === checkedsubMenu && "font-semibold "
								}`}>
								<li
									onClick={() => handelSetRoute(item)}
									className={`list-disc`}>
									{item.subName}
								</li>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
