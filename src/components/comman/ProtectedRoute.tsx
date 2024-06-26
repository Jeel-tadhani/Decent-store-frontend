import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const { toast } = useToast();
	const token = localStorage.getItem("token");

	if (!token) {
		toast({
			variant: "destructive",
			title: "Login Required!",
		});
		return <Navigate to={"/login"} />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
