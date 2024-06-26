import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";

function CourseVideo() {
	const Data = [
		{ name: "video1.mp4", type: "video/mp4" },
		{ name: "Dougs Story 3.pdf", type: "pdf" },
	];

	return (
		<div className="max-w-[1500px] ml-[21px]  font-inter">
			{Data.map((file) => {
				if (file.type === "video/mp4") {
					return (
						<div className="w-full flex justify-center">
							<video
								className="rounded-[10px] mt-[29px] "
								controls
								autoPlay
								loop>
								<source src="../assets/images/wind.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</div>
					);
				} else {
					<div className="h-[100px] rounded-[10px] bg-[#D9D9D9] flex items-center gap-[14.5px] font-nunitoSans">
						<img
							className="text-[#A3A3A3] ml-[20px]"
							src="../assets/images/Vector (2).png"
						/>
						<div>
							<h3>Doug's Story 3.pdf</h3>
							<h3 className="text-[#A3A3A3]">PDF File</h3>
						</div>
					</div>;
				}
			})}

			<div className="flex justify-between max-mt-[50px] ">
				<p className="text-[#A3A3A3]">
					Category: <span className="text-[#00778B]">Environment</span>
				</p>
				<p className="text-[#A3A3A3]">100 Likes</p>
			</div>
			<h3 className="font-nunitoSans font-[700] text-[20px] leading-[27px]">
				Doug's Story
			</h3>
			<div className="sm:flex items-center justify-between sm:mt-[13px] font-nunitoSans mt-[20px]">
				<div className="flex gap-[13px]">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<h3>Devon Lane</h3>
						<p className="text-[#A3A3A3]">Rating 4/5 * 100 Views</p>
					</div>
				</div>

				<div className="sm:mt-0 mt-[20px]">
					<Button
						variant={"outline"}
						className={"w-[106px] h-[42px] border 1px solid border-black"}>
						Feedback
					</Button>
					<Button
						variant={"outline"}
						className={
							"w-[150px] h-[42px] border 1px solid border-black ml-[20px]"
						}>
						Download Video
					</Button>
					<Button
						variant={"outline"}
						className={
							"w-[50px] h-[42px] border 1px solid border-black ml-[14px]"
						}>
						<img src="../assets/images/Vector (1).png" />
					</Button>
				</div>
			</div>

			<p className="mt-[33px] max-w-full">
				It is a long established fact that a reader will be distracted by the
				readable content of a page when looking at its layout. The point of
				using Lorem Ipsum is that it has a more-or-less normal distribution of
				letters, as opposed to using 'Content here, content here', making it
				look like readable English. Many desktop publishing packages and web
				page editors now use Lorem Ipsum as their default model text, and a
				search for 'lorem ipsum' will uncover many web sites still in their
				infancy. Various versions have evolved over the years, sometimes by
				accident, sometimes on purpose (injected humour and the like).
			</p>

			<div className="flex w-full justify-end">
				<CiSquareChevLeft className="w-[50px] h-[50px] text-[gray] " />

				<CiSquareChevRight className="w-[50px] h-[50px] text-[gray] " />
			</div>
		</div>
	);
}

export default CourseVideo;
