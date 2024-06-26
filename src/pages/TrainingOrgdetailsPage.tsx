import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setPath } from "@/redux/Reducer/PathReducer";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import star from "/assets/icons/star.svg";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import Loading from "@/components/comman/Loading";
import { fetchOneTrainerOrganisation } from "@/services/apiServices/trainerOrganisationServices";

const TrainingOrgdetailsPage = () => {
	const { trainingOrganisationId } = useParams();
	const dispatch = useDispatch();

	const { data: trainer_organisation, isPending } = useQuery({
		queryKey: [QUERY_KEYS.trainerOrganisation],
		queryFn: () =>
			fetchOneTrainerOrganisation(trainingOrganisationId as string),
	});

	const courseImage =
		"https://s3-alpha-sig.figma.com/img/c4df/1175/11ecca0189cc57c904e4a56ccf1f11c9?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cQE8cn6yknPavk~Yh~-MhgkXwjsOowEDQWEYcLJOvSngukIM~8uk4OcX-VPjLn4zRt91p30p5hXgw9p0CjlWp5gz1X4eCZCkh2Q6t6Cf7BKr5jFvL-A7TgHBtjjnM6jqzbs7RtMPdKopwg-NpUlGbp7cmxPbiS5q0lhXZroay-9tgBjV8aW2CdVCc1P8sVTYW8agaGkb2Ot5JSOiyW1U8nyQ78icScqawmMbVbPwA6Uz27ofwA6gkfY3iVLKyjvuFQx48yZR6IP92fGCCR8TRsfJp9MEdyedOQDUEl3ob-q5FbmkWv7t1QuHi2YK8b9xQ2tqpHIhGBclOzUcE-vsxw__";
	const courseData = [
		{
			image: courseImage,
			title: "Greening the emerald isle: Ireland's journey to carbon...",
			Auther: "Devon Lane",
			module: 3,
			duration: "3 Days",
			pillar: "Environment",
			category: "Introductory",
		},
		{
			image: courseImage,
			title: "Greening the emerald isle: Ireland's journey to carbon...",
			Auther: "Devon Lane",
			module: 3,
			duration: "3 Days",
			pillar: "Environment",
			category: "Introductory",
		},
		{
			image: courseImage,
			title: "Greening the emerald isle: Ireland's journey to carbon...",
			Auther: "Devon Lane",
			module: 3,
			duration: "3 Days",
			pillar: "Social",
			category: "Advanced",
		},
		{
			image: courseImage,
			title: "Greening the emerald isle: Ireland's journey to carbon...",
			Auther: "Devon Lane",
			module: 3,
			duration: "3 Days",
			pillar: "Environment",
			category: "Introductory",
		},
		{
			image: courseImage,
			title: "Greening the emerald isle: Ireland's journey to carbon...",
			Auther: "Devon Lane",
			module: 3,
			duration: "3 Days",
			pillar: "Environment",
			category: "Intermediate",
		},
	];
	return (
		<div className="font-nunitoSans text-[16px] leading-[21.82px] text-black font-normal rounded-[10px] flex flex-col gap-5">
			<div className="bg-white rounded-[10px]">
				<div className="flex justify-between items-center px-5 font-nunitoSans text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
					<h2 className="font-bold">Training Organisations</h2>
					<Button
						className="bg-transparent text-black font-semibold text-[16px]"
						onClick={() =>
							dispatch(
								setPath([
									{
										name: "Training Management",
										link: null,
									},
									{
										name: "Training Organisations",
										link: "/training-organisations",
									},
								])
							)
						}>
						<IoIosArrowRoundBack size={26} className="mr-4" />
						Back
					</Button>
				</div>
				<div className="flex p-5 justify-between">
					<div className="flex flex-col gap-[15px]">
						<h5 className="text-[#A3A3A3]">Company Name</h5>
						<p>{trainer_organisation?.data.data.providerName}</p>
					</div>
					<div className="flex flex-col gap-[15px]">
						<h5 className="text-[#A3A3A3]">Provider Type</h5>
						<p>{trainer_organisation?.data.data.providerType}</p>
					</div>
					<div className="flex flex-col gap-[15px]">
						<h5 className="text-[#A3A3A3]">Employees</h5>
						<p>{trainer_organisation?.data.data.employee}</p>
					</div>
					<div className="flex flex-col gap-[15px]">
						<h5 className="text-[#A3A3A3]">Address</h5>
						<p>{trainer_organisation?.data.data.providerAddress}</p>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-[10px]">
				<div className="flex justify-between items-center px-5 font-nunitoSans text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
					<h2 className="font-bold">Trainers</h2>
				</div>
				<div className="p-[18px] flex gap-5 pb-[43px] flex-wrap">
					{trainer_organisation?.data?.data?.trainer.map((trainer: any) => {
						return (
							<div
								className={`w-[210px] h-[220px] rounded-[10px] flex flex-col justify-center items-center ${
									trainer.active
										? "shadow-[0px_0px_2px_0px_#00778B]"
										: "shadow-[0px_0px_2px_0px_#00000026]"
								}`}
								key={trainer.id}>
								<img
									src={trainer.imageUrl}
									alt="img"
									className="w-[100px] h-[100px] mb-[14px] rounded-[100%]"
								/>
								<h4 className="mb-[6px]">{trainer.name}</h4>
								<p className="text-[12px] leading-[16.37px] mb-1">
									Designation: {trainer.designation}
								</p>
								<p className="text-[12px] leading-[16.37px]">
									Total Courses: {trainer.totalCourses}
								</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="bg-white rounded-[10px]">
				<div className="flex justify-between items-center px-5 font-nunitoSans text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
					<h2 className="font-bold">Courses</h2>
				</div>
				<div className="p-[15px] flex gap-5 flex-wrap">
					{courseData.map((course, index) => {
						return (
							<div
								className="rounded-[6px] border border-solid border-[#D9D9D9] h-[341px] w-[267.48px]"
								key={index}>
								<img
									src={course.image}
									alt="img"
									className="h-1/2 object-fill w-full"
								/>
								<CardHeader className="p-[8px]">
									<CardTitle className="text-[16px] font-bold">
										{course.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="px-[8px] pb-[12px]">
									<div className="flex justify-between items-center">
										<p className="text-[14px]">Offered By : {course.Auther}</p>
										<div className="flex items-center gap-[6px]">
											<img src={star} alt="" />
											<p className="text-[14px]">4/5</p>
										</div>
									</div>
									<div className="flex justify-between items-center my-[11px]">
										<p className="text-[14px]">Module : 3</p>
										<p className="text-[14px]">Duration : {course.duration}</p>
									</div>
									<div className="flex justify-between items-center mt-[11px] ">
										<Badge
											variant={"outline"}
											className="rounded-full text-[12px] px-[10px] py-[5px]">
											{course.pillar}
										</Badge>
										<Badge
											className={`rounded-full text-[12px] px-[10px] py-[5px] ${
												course.category === "Introductory"
													? "bg-[#FF5252] text-white"
													: course.category === "Intermediate"
													? "bg-[#FFD56A] text-black"
													: "bg-[#D6F5AC] text-black"
											}`}>
											{course.category}
										</Badge>
									</div>
								</CardContent>
							</div>
						);
					})}
				</div>
			</div>

			<Loading isLoading={isPending} />
		</div>
	);
};

export default TrainingOrgdetailsPage;
