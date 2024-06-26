import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import {
	deleteCourseSlider,
	fetchCourseSlider,
	updateCourseSlider,
} from "@/services/apiServices/courseSliderServices";
import { CourseSlider } from "@/types";
import Loading from "@/components/comman/Loading";
import { ErrorType } from "@/types/Errors";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";

function CourseSliderPage() {
	const [openDelete, setOpenDelete] = useState<boolean | CourseSlider>(false);
	const { isClient, clientId } = useSelector((state: any) => state.user);

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const {
		data: course_slider_list,
		isPending,
		refetch,
	} = useQuery({
		queryKey: [QUERY_KEYS.courseSliderList],
		queryFn: () => fetchCourseSlider(isClient, clientId),
	});
	const { mutate: delete_course_slider, isPending: deletePanding } =
		useMutation({
			mutationFn: (bannerId: string) => deleteCourseSlider(bannerId),
			onSuccess: () => {
				toast({ title: "Course Slider delete Successfully" });
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.courseSliderList],
				});
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
			onSettled: () => {
				setOpenDelete(false);
			},
		});
	const { mutate: update_course_slider, isPending: updatePanding } =
		useMutation({
			mutationFn: (data: { courseSlider: CourseSlider; id: string }) =>
				updateCourseSlider(data.courseSlider, data.id),
			onSuccess: () => {
				toast({ title: "Course Slider update Successfully" });
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.courseSliderList],
				});
			},
			onError: (error: ErrorType) => {
				toast({
					variant: "destructive",
					title: error.data.message,
				});
			},
		});
	const handleDelete = () => {
		delete_course_slider((openDelete as CourseSlider).id as string);
	};
	const handleStatusUpdate = (checked: boolean, courseSlider: CourseSlider) => {
		update_course_slider({
			courseSlider: {
				...courseSlider,
				status: checked ? "Active" : "Inactive",
			},
			id: courseSlider.id as string,
		});
	};

	useEffect(() => {
		refetch();
	}, [clientId]);
	return (
		<div className="max-w-[1500px] h-[auto] rounded-[10px] bg-[white] mb-[20px] font-nunitoSans">
			<div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
				<h2 className="font-[700] text-[16px]">All Slider</h2>
				<Button
					className="px-[20px] py-[10px] h-[42px] text-[16px]"
					onClick={() =>
						dispatch(
							setPath([
								{ name: "Web Portal Setting", link: null },
								{ name: "Course Slider", link: "course-slider" },
								{ name: "Add Slider", link: "add-course-slider" },
							])
						)
					}>
					ADD NEW
				</Button>
			</div>
			{course_slider_list?.data?.data?.map((slider: CourseSlider) => {
				return (
					<div className="m-[20px] ">
						<div className=" max-w-full  h-[auto] rounded-[10px] border border-gray-300">
							<div className="border-b border-gray-300 h-[60px] flex justify-between items-center p-[18px]">
								<h3>{slider.courseType}</h3>
								<div className="flex gap-[15px]">
									<Switch
										id="airplane-mode"
										onCheckedChange={(checked) => {
											handleStatusUpdate(checked, slider);
										}}
										className=""
										checked={slider.status === "Active"}
										disabled={isClient && !course_slider_list?.data.clientData}
									/>
									<button
										onClick={() => {
											dispatch(
												setPath([
													{ name: "Web Portal Setting", link: null },
													{ name: "Course Slider", link: "/course-slider" },
													{
														name: "Update Slider",
														link: `/add-course-slider?courseSliderId=${slider.id}`,
													},
												])
											);
										}}
										disabled={isClient && !course_slider_list?.data.clientData}>
										<img src="../assets/images/Vector (6).png" />
									</button>
									<button
										onClick={() => setOpenDelete(slider)}
										disabled={isClient && !course_slider_list?.data.clientData}>
										<img src="../assets/images/trash.png" />
									</button>
								</div>
							</div>

							<div className="sm:flex justify-between p-[30px]">
								<div className="max-w-[654px]">
									<h3 className="text-[16px] text-[#A3A3A3] leading-[21px]">
										Course Title
									</h3>
									<h2 className="sm:text-[32px] font-[700] sm:leading-[42px] mt-[10px]">
										{slider.courseTitle}
									</h2>
									<h3 className="text-[16px] text-[#A3A3A3] leading-[21px] mt-[20px]">
										Course Content
									</h3>
									<p className="sm:text-[16px] text-[14px] leading-[21px] mt-[12px] sm:h-[75px]">
										{slider.content}
									</p>
									<Button className="w-[195px] h-[62px] hidden sm:block bg-[#64A70B] text-[18px]">
										{slider.buttonTitle}
									</Button>
								</div>
								<div className="sm:block flex justify-center sm:mt-0 mt-[20px]">
									<img
										className="w-[274px]"
										src={slider.courseImage}
										alt="img"
									/>
								</div>
								<div className="sm:hidden flex justify-center">
									<Button className="w-[195px] h-[62px] block sm:hidden bg-[#64A70B] text-[18px] sm:mt-0 mt-[20px] ">
										{slider.buttonTitle}
									</Button>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<Loading isLoading={isPending || deletePanding || updatePanding} />
			<AreYouSureModal
				open={openDelete as boolean}
				onClose={() => setOpenDelete(false)}
				onDelete={handleDelete}
				value={typeof openDelete === "boolean" ? "" : openDelete.courseType}
			/>
		</div>
	);
}

export default CourseSliderPage;
