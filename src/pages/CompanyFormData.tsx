import { InputWithLable } from "@/components/ui/inputwithlable";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/Reducer/PathReducer";
import { fetchOneUserById } from "@/services/apiServices/userServices";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function CompanyFormData() {

    const { companyId } = useParams();

    const dispatch = useDispatch();

    const { data } = useQuery({
        queryKey: [QUERY_KEYS.userFetchById],
        queryFn: () => fetchOneUserById(companyId as string),
    });

    return (
        <div>
            <form>
                <div className=" h-auto w- bg-[white] rounded-[10px] p-[30px]">
                    <div className=" grid md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="">
                            <InputWithLable
                                label="User Name"
                                type="name"
                                value={data?.data.data.user_name}
                                placeholder="10"
                                className="h-[52px] mt-[10px] w-[full]"

                            />

                        </div>
                        <div className="">

                            <InputWithLable
                                label="First Name"
                                type="string"
                                value={data?.data.data.first_name}
                                placeholder="jeck"
                                className="w-[full] h-[52px] mt-[10px]"

                            />

                        </div>

                        <div className="">
                            <InputWithLable
                                label="Last Name"
                                type="string"
                                value={data?.data.data.last_name}
                                placeholder="smith"
                                className="w-[full] h-[52px] mt-[10px]"

                            />

                        </div>
                        <div className="">
                            <InputWithLable
                                label="Sector"
                                type="string"
                                value={data?.data.data.sector}
                                placeholder="Children"
                                className="w-[full] h-[52px] mt-[10px]"

                            />

                        </div>
                        <div className="">
                            <InputWithLable
                                label="Email Address"
                                type="Children"
                                value={data?.data.data.email}
                                placeholder="jecksmith@gmail.com"
                                className="w-[full] h-[52px] mt-[10px]"

                            />

                        </div>
                        <div className="">
                            <InputWithLable
                                label="County"
                                type="Children"
                                value={data?.data.data.County}
                                placeholder="USA"
                                className="w-[full] h-[52px] mt-[10px]"
                            />

                        </div>
                        <div className="w-[533px] h-[52px]">
                            <RadioGroup
                                value={data?.data.data.status}
                                className="flex items-center gap-[34px]">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Active"
                                        id="r1"
                                        className={`${data?.data.data.status !== "Active" && "border-[#A3A3A3]"
                                            }`}
                                    />
                                    <Label
                                        htmlFor="r1"
                                        className={`text-[16px] font-normal ${data?.data.data.status !== "Active" && "text-[#A3A3A3]"
                                            }`}>
                                        Active
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Inactive"
                                        id="r2"
                                        className={`${data?.data.data.status !== "Inactive" && "border-[#A3A3A3]"
                                            }`}
                                    />
                                    <Label
                                        htmlFor="r2"
                                        className={`text-[16px] font-normal ${data?.data.data.status !== "Inactive" && "text-[#A3A3A3]"
                                            }`}>
                                        Inactive
                                    </Label>
                                </div>
                            </RadioGroup>


                        </div>
                        <div className="flex justify-end">
                            <button className="w-[121px] h-[52px] bg-[#58BA66] text-white rounded-[10px]" type="button" onClick={() => dispatch(setPath([
                                {
                                    name: "Company Management",
                                    link: null,
                                },
                                {
                                    name: "Companies",
                                    link: "/companies",
                                }
                            ]))} >
                                Submit
                            </button>
                        </div>

                    </div>

                </div>
            </form>
        </div>
    );
}

export default CompanyFormData;