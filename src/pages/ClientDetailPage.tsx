import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchClientById } from "@/services/apiServices/clientServices";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router";
import ClientImg from "/assets/images/ClientImg.png";
import Loading from "@/components/comman/Loading";

const ClientDetailPage = () => {
	const { clientId } = useParams();

	const { data, isPending } = useQuery({
		queryKey: [QUERY_KEYS.clientList, clientId],
		queryFn: () => fetchClientById(clientId as string),
	});
	const clientDetails = data?.data.data;

	return (
		<div className="bg-white h-full rounded-[6px]">
			<div className="font-nunitoSans text-[16px] leading-[22px] text-black">
				<div className="flex justify-between items-center px-5 text-base h-[69px] border-b-[1px] border-b-[#F1F1F1]">
					<h2 className="font-bold">{clientDetails?.name}</h2>
					<Button
						className="bg-transparent text-black font-semibold text-[16px]"
						onClick={() => window.history.back()}>
						<IoIosArrowRoundBack size={26} className="mr-4" />
						Back
					</Button>
				</div>
				<div className="px-2 sm:px-4 md:px-6  py-[17px] flex flex-col gap-5">
					<div className="border border-[#D9D9D9] rounded-[10px] min-h-[160px] md:flex flex-row grid grid-cols-2  md:items-center md:justify-between px-6 py-4 flex-wrap gap-3">
						<div className="md:w-28 w-full col-span-2 flex justify-center mb-2 md:mb-0">
							<img src={ClientImg} alt="client img" className="w-28 h-28" />
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3]">Client Contact</h3>
							<p>{clientDetails?.name || "--"}</p>
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3]">Type</h3>
							<p>{clientDetails?.type || "--"}</p>
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3]">Sector</h3>
							<p>{clientDetails?.sector || "--"}</p>
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3]">Region</h3>
							<p>{clientDetails?.region || "--"}</p>
						</div>
					</div>
					<div className="border  border-[#D9D9D9] rounded-[10px] min-h-[130px] md:flex flex-row md:items-center md:justify-between px-6 py-4 flex-wrap gap-y-2 grid grid-cols-1 sm:grid-cols-2">
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3] ">Promoter</h3>
							<p>{clientDetails?.promoter || "--"}</p>
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3] ">Email ID</h3>
							<p>{clientDetails?.email || "--"}</p>
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3] ">Phone Number</h3>
							<p>{clientDetails?.number || "--"}</p>
						</div>
						<div className="max-w-48 min-w-28">
							<h3 className="text-[#A3A3A3] ">Address</h3>
							<p>{clientDetails?.address || "--"}</p>
						</div>
					</div>
					<div className="border  border-[#D9D9D9] rounded-[10px] h-[95px] p-6 items-center flex flex-row">
						<RadioGroup
							value={clientDetails?.status}
							className="flex items-center gap-[34px]">
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="Active"
									id="r1"
									disabled={clientDetails?.status === "InActive"}
									className={`${
										clientDetails?.status !== "Active" && "border-[#A3A3A3]"
									}`}
								/>
								<Label
									htmlFor="r1"
									className={`text-[16px] font-normal ${
										clientDetails?.status !== "Active" && "text-[#A3A3A3]"
									}`}>
									Active
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="Inactive"
									id="r2"
									disabled={clientDetails?.status === "Active"}
									className={`${
										clientDetails?.status !== "Inactive" && "border-[#A3A3A3]"
									}`}
								/>
								<Label
									htmlFor="r2"
									className={`text-[16px] font-normal ${
										clientDetails?.status !== "Inactive" && "text-[#A3A3A3]"
									}`}>
									Inactive
								</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
				<Loading isLoading={isPending} />
			</div>
		</div>
	);
};

export default ClientDetailPage;
