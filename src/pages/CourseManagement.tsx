import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsPeopleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import CourseVideo from "@/components/CourseVideo/CourseVideo";
import Feedback from "./Feedback";
import Module from "./Module";
import CourseInformation from "./CourseInformation";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchOneCourse } from "@/services/apiServices/getOneCourse";
import Loading from "@/components/comman/Loading";



function CourseManagement() {
	let { companyId } = useParams();

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.oneCourse],
		queryFn: () => fetchOneCourse(companyId),
	});

	console.log(data);


	const [buttonClicked, setButtonClicked] = useState(false);

	const handleButtonClick = () => {
		setButtonClicked(true);
	};

	return (
		<div className="w-[1500px] h-[auto] bg-[white] rounded-[10px] m-[21px] font-nunitoSans ">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="font-[700] text-[28px]">Wind energy basic course</h2>
				<button onClick={() => window.history.back()} className="text-[16px] font-[600] flex items-center gap-[15px]">
					<HiOutlineArrowNarrowLeft />
					Back
				</button>
			</div>
			<Tabs defaultValue="account">
				<div className="border-b-2 border-solid gray">
					<TabsList className="bg-[white] h-[50px] text-[16px] font-[500] ">
						<TabsTrigger
							className="bg-[white] data-[state=active]:border-b-2 border-[#00778B] border-solid w-[150px] items-end h-[50px] data-[state=active]:text-[#00778B]"
							value="account">
							Information
						</TabsTrigger>
						<TabsTrigger
							className="bg-[white] data-[state=active]:border-b-2 border-[#00778B] border-solid w-[150px] items-end  h-[50px] data-[state=active]:text-[#00778B]"
							value="password">
							Module
						</TabsTrigger>
						<TabsTrigger
							className="bg-[white] data-[state=active]:border-b-2 border-[#00778B] border-solid w-[150px] items-end  h-[50px] data-[state=active]:text-[#00778B]"
							value="feedback">
							Feedback
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="account">
					<CourseInformation />
				</TabsContent>
				<TabsContent value="password">
					{
						buttonClicked ? (
							<CourseVideo />

						) :
							(
								<Module handleButtonClick={handleButtonClick} />
							)
					}

				</TabsContent>
				<TabsContent value="feedback">
					<Feedback />
				</TabsContent>
			</Tabs>

			<Loading
				isLoading={isPending}
			/>
		</div>
	);
}

export default CourseManagement;
