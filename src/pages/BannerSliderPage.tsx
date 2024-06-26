import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import pencilprimary from "/assets/icons/pencilprimary.svg";
import deletered from "/assets/icons/deletered.svg";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import {
	deleteBanner,
	fetchBanner,
	updateBanner,
} from "@/services/apiServices/bannerServices";
import Loading from "@/components/comman/Loading";
import { Banner } from "@/types";
import AreYouSureModal from "@/components/Modal/DeleteModal";
import { ErrorType } from "@/types/Errors";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/Reducer/PathReducer";

const BannerSliderPage = () => {
	const [openDelete, setOpenDelete] = useState<boolean | Banner>(false);

	const dispatch = useDispatch();

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate: delete_banner, isPending: deletePanding } = useMutation({
		mutationFn: (bannerId: string) => deleteBanner(bannerId),
		onSuccess: () => {
			toast({ title: "Banner delete Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bannerList] });
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
	const { mutate: update_banner, isPending: updatePanding } = useMutation({
		mutationFn: (data: { banner: Banner; id: string }) =>
			updateBanner(data.banner, data.id),
		onSuccess: () => {
			toast({ title: "Banner status update Successfully" });
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bannerList] });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const handleDelete = () => {
		delete_banner((openDelete as Banner).id as string);
	};

	const handleStatusUpdate = (checked: boolean, banner: Banner) => {
		update_banner({
			banner: {
				...banner,
				status: checked ? "Active" : "Inactive",
			},
			id: banner.id as string,
		});
	};

	return (
		<div className="pb-[36px] bg-primary-foreground rounded-[10px] h-full font-nunitoSans">
			<div className="border-b-2 pb-[15px] flex justify-between pl-[22px] pr-[20px] items-center pt-[22px]">
				<h2 className="text-base font-bold">All Slider</h2>
				<Button
					className="px-[20px] py-[10px] rounded-[6px]"
					onClick={() =>
						dispatch(
							setPath([
								{ name: "Web Portal Setting", link: null },
								{ name: "Banner Slider", link: "/banner-slider" },
								{ name: "Add Slider", link: "/add-banner-slider" },
							])
						)
					}>
					ADD NEW
				</Button>
			</div>
			{[]?.map((banner: Banner) => {
				return (
					<div className="mt-[17px] mx-[20px] mb-[27px]" key={banner.id}>
						<div className="flex justify-between">
							<p className="text-[16px]">{banner.title}</p>
							<div className="flex items-center gap-[8px]">
								<Switch
									id="airplane-mode"
									onCheckedChange={(checked) => {
										handleStatusUpdate(checked, banner);
									}}
									checked={banner.status === "Active"}
								// disabled={isClient && !bannerList?.data.clientData}
								/>
								<div className="flex items-center gap-[15px]">
									<button
										onClick={() =>
											dispatch(
												setPath([
													{ name: "Web Portal Setting", link: null },
													{ name: "Banner Slider", link: "/banner-slider" },
													{
														name: "Update Slider",
														link: `/add-banner-slider?bannerId=${banner.id}`,
													},
												])
											)
										}
									>
										<img src={pencilprimary} alt="edit icon" />
									</button>
									<button
										onClick={() => setOpenDelete(banner)}
									>
										<img src={deletered} alt="delete icon" />
									</button>
								</div>
							</div>
						</div>
						<div className="mt-[11px]">
							<img
								src={banner.banner}
								alt="banner"
								className="w-full h-[400px] object-contain"
							/>
						</div>
					</div>
				);
			})}

			<Loading isLoading={false} />
			<AreYouSureModal
				open={openDelete as boolean}
				onClose={() => setOpenDelete(false)}
				onDelete={handleDelete}
				value={typeof openDelete === "boolean" ? "" : openDelete.title}
			/>
		</div>
	);
};
export default BannerSliderPage;
