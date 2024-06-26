import ManagmentCard, { ListManagmentCard } from "@/components/comman/ManagmentCard";
import { Input } from "@/components/ui/input";
import search from "/assets/icons/search.svg";
import vector from "/assets/icons/vector.svg";
import hamburger from "/assets/icons/hamburger.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoListOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchCourse } from "@/services/apiServices/courseServices";
import Loading from "@/components/comman/Loading";

const CourseManagementCardPage = () => {

	const [showManagementCard, setShowManagementCard] = useState(true);

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.courseList],
		queryFn: () => fetchCourse(),
	});

	console.log(data);


	const handleVectorClick = () => {
		setShowManagementCard(true);
	};

	const handleHamburgerClick = () => {
		setShowManagementCard(false);
	};

	const ManagementCards = [
		{
			badgegray: "Environment",
			badge: "Introductory",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Social",
			badge: "Intermediate",
			badgemain: "PUPLISHED",
			slider: true,
		},
		{
			badgegray: "Governance",
			badge: "Advanced",
			badgemain: "HOLD",
			slider: true,
		},
		{
			badgegray: "Strategic Inte...",
			badge: "Advanced",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Strategic Inte...",
			badge: "Advanced",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Strategic Inte...",
			badge: "Advanced",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Environment",
			badge: "Introductory",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Social",
			badge: "Intermediate",
			badgemain: "PUPLISHED",
			slider: true,
		},
		{
			badgegray: "Governance",
			badge: "Advanced",
			badgemain: "HOLD",
			slider: true,
		},
		{
			badgegray: "Strategic Inte...",
			badge: "Advanced",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Strategic Inte...",
			badge: "Advanced",
			badgemain: "PUPLISHED",
			slider: false,
		},
		{
			badgegray: "Strategic Inte...",
			badge: "Advanced",
			badgemain: "PUPLISHED",
			slider: false,
		},
	];
	return (
		<div className="bg-primary-foreground rounded-[10px] font-nunitoSans">
			<div className="border-b-2 flex item justify-between pl-[23px] pr-[15px] ">
				<h2 className="text-base font-bold mt-[22px]">Course Management</h2>
				<div className="flex items-center gap-[24px]">
					<div className="flex items-center py-[9px] relative">
						<Input
							placeholder="Search by company name, country, sector, etc."
							className="py-[17px] pl-[39px] border w-[550px] rounded-[6px] ml-[23px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal mr-[4px]"
						/>
						<img src={search} alt="" className="absolute left-10" />
					</div>

					<button onClick={handleVectorClick} className={`focus:outline-none ${showManagementCard ? 'text-[#00778B] text-[30px]' : 'text-gray-600 text-[24px]'}`}>
						<RxDashboard />
					</button>
					<button onClick={handleHamburgerClick} className={`focus:outline-none ${!showManagementCard ? 'text-[#00778B] text-[30px]' : 'text-gray-600 text-[24px]'}`}>
						<IoListOutline />
					</button>


				</div>
			</div>


			<div className="m-[40px]">
				{showManagementCard ? (
					<div className="flex flex-wrap items-center gap-[22px]">
						{data?.data.data.map((card, index) => {
							console.log(card.image);

							return (
								<Link to={`/course-management/${card.id}`} key={index}>
									<div>
										<ManagmentCard card={card} />
									</div>
								</Link>
							);
						})}
					</div>

				) : (
						data?.data.data.map((card, index) => (
						<Link to="/course-management" key={index}>
							<div>
								<ListManagmentCard card={card} />
							</div>
						</Link>
					))
				)}
			</div>
			<Loading
				isLoading={isPending}
			/>

		</div>
	);
};
export default CourseManagementCardPage;
