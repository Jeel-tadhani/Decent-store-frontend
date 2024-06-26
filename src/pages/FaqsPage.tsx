import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { fetchFaqs } from "@/services/apiServices/faqsServices";
import { QUERY_KEYS } from "@/lib/constants";
import Loading from "@/components/comman/Loading";
import { useEffect, useState } from "react";
import FaqModel from "@/components/Modal/FaqModel";
import { useSelector } from "react-redux";

const FaqsPage = () => {
	const [openModel, setOpenModel] = useState(false);

	// const { isClient, clientId } = useSelector((state: any) => state.user);

	// const {
	// 	data: faqs_list,
	// 	isPending,
	// 	refetch,
	// } = useQuery({
	// 	queryKey: [QUERY_KEYS.faqsList],
	// 	queryFn: () => fetchFaqs(isClient, clientId),
	// });

	// useEffect(() => {
	// 	refetch();
	// }, [clientId]);
	const faqs_list = {
		data: {
			data: [
				{
					id: 1,
					question: 'What is your return policy?',
					answer: 'You can return any item within 30 days of purchase. The item must be in its original condition and packaging.'
				},
				{
					id: 2,
					question: 'How long does shipping take?',
					answer: 'Shipping typically takes 5-7 business days within the contiguous United States. International shipping times may vary.'
				},
				{
					id: 3,
					question: 'Do you offer customer support?',
					answer: 'Yes, our customer support team is available 24/7 to assist you with any inquiries or issues you may have.'
				},
				{
					id: 4,
					question: 'Can I track my order?',
					answer: 'Yes, once your order has shipped, you will receive a tracking number via email. You can use this number to track your order online.'
				},
				{
					id: 5,
					question: 'What payment methods do you accept?',
					answer: 'We accept all major credit cards, PayPal, and Apple Pay. We also offer financing options through Affirm.'
				}
			]
		}
	};

	return (
		<div className="pb-[62px] bg-primary-foreground rounded-[10px] h-full font-nunitoSans">
			<div className="border-b-2 pb-[20px] flex justify-between pl-[28px] pr-[15px] items-center pt-[12px]">
				<h2 className="text-base font-bold">FAQ’s</h2>
				<Button
					className="px-[20px] py-[10px] rounded-[6px]"
					onClick={() => setOpenModel(true)}>
					ADD NEW
				</Button>
			</div>
			<div className="mt-[20px] px-[18px]">
				<Accordion
					type="single"
					collapsible
					className="w-full flex flex-col gap-[19px]">
					{faqs_list?.data?.data.map((faq: any) => {
						return (
							<AccordionItem value={faq.id} className="border">
								<AccordionTrigger className="border w-full pl-[18px] pr-[6px] text-[16px] font-bold py-[20px]">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="border w-full pl-[18px] pr-[25px] py-[15px] text-[16px] leading-[22px]">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>
			<FaqModel open={openModel} onClose={() => setOpenModel(false)} />
			<Loading isLoading={false} />
		</div>
	);
};
export default FaqsPage;
