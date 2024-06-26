import { FaChevronDown } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Path from "./Path";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
// import { fetchClient } from "@/services/apiServices/clientServices";
import { setClient } from "@/redux/Reducer/UserReducer";
import { UserRole } from "@/types/UserRole";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { jwtDecode } from "jwt-decode";


const Header = ({ setSidebarOpen }: { setSidebarOpen: any }) => {

	const token = localStorage.getItem("token");
	let tokenresult: any;

	if (token) {
		console.log(token);
		try {
			tokenresult = jwtDecode(token);
		} catch (e) {
			console.log(e, "error in header");
		}
	}

	console.log(tokenresult)
	const isSmallScreen = window.innerWidth <= 640;

	const { clientId, role } = useSelector((state: any) => state.user);

	const dispatch = useDispatch();

	// const { data: client_list } = useQuery({
	// 	queryKey: [QUERY_KEYS.clientList],
	// 	queryFn: () => fetchClient("1", "100"),
	// });
	const handleSetRoute = (item: any) => {
		if (item.name === "Logout") {
			localStorage.clear();
			window.location.href = "/";
			return;
		}
		window.innerWidth < 1024 && setSidebarOpen(false);

		dispatch(setPath([{ name: item.name, link: item.link }]));
	};

	return (
		<div className="sticky top-0 z-30">
			<div className="flex justify-between items-center h-[90px] font-[Nunito Sans] bg-[white]">
				<div className="flex items-center">
					<div className="sm:mx-[32px] mx-4 cursor-pointer w-[25px] h-[25px]">
						<FiMenu
							size={25}
							className=""
							onClick={() => setSidebarOpen((pre: boolean) => !pre)}
						/>
					</div>
					{role == UserRole.SuperAdmin && (
						<Select
							onValueChange={(e) => {
								if (e == "Admin") {
									dispatch(setClient({ clientId: "", isClient: false }));
									return;
								}
								dispatch(setClient({ clientId: e, isClient: true }));
							}}
							value={clientId || "Admin"}>
							<SelectTrigger className="w-full h-[52px]">
								<SelectValue placeholder="client" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">Admin</SelectItem>
								{/* {client_list?.data?.data?.map((client: Client) => {
									return (
										<SelectItem value={String(client.id)}>
											{client.name}
										</SelectItem>
									);
								})} */}
							</SelectContent>
						</Select>
					)}
					<div
						className={`min-w-[400px] ${role == UserRole.SuperAdmin && "ml-8"
							}`}>
						<h2 className="sm:text-[18px] text-base font-[500] leading-[30px] text-nowrap">
							Welcome {tokenresult?.user_name}
						</h2>
						<Path />
					</div>
				</div>
				<div className="flex sm:mr-[31px] mr-4">
					<button
						type="button"
						className="relative inline-flex items-center p-2 text-sm  text-center bg-[#F5F5F5] rounded-[50%] focus:ring-4 mr-4 sm:mr-[31px]">
						<IoIosNotificationsOutline
							className="text-[30px]"
						/>
						<span className="sr-only">Notifications</span>
						{1 > 0 && (
							<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
								{5}
							</div>
						)}
					</button>

					{!isSmallScreen && (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="flex cursor-pointer">
										<Avatar className="mr-[14px]">
											<AvatarImage
												// src={(tokenresult?.avatar !== null) ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/file/view/${tokenresult?.avatar}`
												// 	: "https://github.com/shadcn.png"}
												src={`${import.meta.env.VITE_API_BASE_URL}/api/v1/file/view/${tokenresult?.avatar}`}
											/>
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>

										<div className="mr-[13px]">
											<h2 className="text-[16px] font-[500]">
												{`${tokenresult?.firstName || ''} ${tokenresult?.lastName || ''}`}
											</h2>
											<h3 className="text-[16px]">Super Admin</h3>
										</div>

										<button>
											<FaChevronDown className="mb-[25px]" />
										</button>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup>
										<DropdownMenuRadioItem
											value="top"
											onClick={() =>
												dispatch(
													setPath([
														{
															name: "Profile Setting",
															link: `/profile`,
														},
													])
												)
											}>
											Profile Settings
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem
											value="bottom"
											onClick={() =>
												dispatch(
													setPath([
														{
															name: "Account Setting",
															link: `/account`,
														},
													])
												)
											}>
											Account Settings
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem
											value="logout"
											onClick={() =>
												handleSetRoute({ name: "Logout", link: "/" })
											}>
											Logout
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
