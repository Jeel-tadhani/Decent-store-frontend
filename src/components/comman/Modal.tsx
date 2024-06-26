"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	className?: string;
	title?: string;
	children: React.ReactNode;
	borderBottom?: boolean;
}

const Modal = ({
	open,
	onClose,
	className,
	title,
	children,
	borderBottom,
}: ModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className={`${className}`} style={{ zIndex: 9999 }}>
				{title && (
					<DialogHeader>
						<DialogTitle className="p-[5px_0px_0px] text-[18px] font-medium text-foreground">
							{title}
						</DialogTitle>
						{borderBottom && <Separator className="!m-0" />}
					</DialogHeader>
				)}
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
