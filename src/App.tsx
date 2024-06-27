import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RootLayout from "./components/Layout/RootLayout";
import ProtectedRoute from "./components/comman/ProtectedRoute";
import CompaniesPage from "./pages/CompaniesPage";
import TrainingOrganisationsPage from "./pages/TrainingOrganisationsPage";
import CompanyDetails from "./pages/CompanyDetails";
import CourseVideo from "./components/CourseVideo/CourseVideo";
import AddQuestion from "./pages/AddQuestion";
import Questions from "./pages/Questions";
import EmailTemplate from "./pages/EmailTemplate";
import TrainersDetailsPage from "./pages/TrainersDetailsPage";
import CourseManagementCardPage from "./pages/CourseManagementCardPage";
import BannerSliderPage from "./pages/BannerSliderPage";
import FaqsPage from "./pages/FaqsPage";
import MaturityLevelPage from "./pages/MaturityLevelPage";
import ClientsPage from "./pages/ClientsPage";
import TrainingDocumentPage from "./pages/TrainingDocumentPage";
import { Toaster } from "./components/ui/toaster";
import CourseSliderPage from "./pages/CourseSliderPage";
import CourseManagement from "./pages/CourseManagement";
import NewClientPage from "./pages/NewClientPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import AddSlider from "./pages/AddSlider";
import AddCourseSlider from "./pages/AddCourseSlider";
import TrainingOrgdetailsPage from "./pages/TrainingOrgdetailsPage";
import ProfileSetting from "./pages/ProfileSetting";
import AccountSetting from "./pages/AccountSetting";
import CompanyFormData from "./pages/CompanyFormData";
import Trainers from "./pages/Trainers";
import RegisterPage from "./pages/RegisterPage";

function App() {

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<RootLayout />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/dashboard",
					element: <DashboardPage />,
				},
				{
					path: "/profile",
					element: <ProfileSetting />,
				},
				{
					path: "/account",
					element: <AccountSetting />,
				},
				{
					path: "/users",
					element: <CompaniesPage />,
				},
				{
					path: "/userform/:companyId",
					element: <CompanyFormData />,
				},
				{
					path: "/user-details/:companyId",
					element: <CompanyDetails />,
				},
				{
					path: "/training-organisations",
					element: <TrainingOrganisationsPage />,
				},
				{
					path: "/training-organisations-details/:trainingOrganisationId",
					element: <TrainingOrgdetailsPage />,
				},
				{
					path: "/Trainers",
					element: <Trainers />,
				},
				{
					path: "/Trainers-DetailsPage",
					element: <TrainersDetailsPage />,
				},
				{
					path: "/course-management/:id",
					element: <CourseManagement />,
				},
				{
					path: "/Course-Management-cardpage",
					element: <CourseManagementCardPage />,
				},
				{
					path: "/company-form",
					element: <CompanyDetails />,
				},
				{
					path: "/course/course-video",
					element: <CourseVideo />,
				},
				{
					path: "/questions",
					element: <Questions />,
				},
				{
					path: "/add-question",
					element: <AddQuestion />,
				},
				{
					path: "/course-slider",
					element: <CourseSliderPage />,
				},
				{
					path: "/add-course-slider",
					element: <AddCourseSlider />,
				},
				{
					path: "/email-template",
					element: <EmailTemplate />,
				},
				{
					path: "/maturity-level",
					element: <MaturityLevelPage />,
				},
				{
					path: "/banner-slider",
					element: <BannerSliderPage />,
				},
				{
					path: "/add-banner-slider",
					element: <AddSlider />,
				},
				{
					path: "/faqs",
					element: <FaqsPage />,
				},
				{
					path: "/clients",
					element: <ClientsPage />,
				},
				{
					path: "/add-client",
					element: <NewClientPage />,
				},
				{
					path: "/client-details/:clientId",
					element: <ClientDetailPage />,
				},
				{
					path: "/training-document",
					element: <TrainingDocumentPage />,
				}
			],
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/register",
			element: <RegisterPage />,
		},
	]);

	// const { mutate: socker_connect } = useMutation({
	// 	mutationFn: () => SocketConnect(id),
	// 	// onSuccess: () => {
	// 	// queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clientList] });
	// 	// },
	// });

	return (
		<>
			<Toaster />
			<RouterProvider router={router} />
		</>
		// <div className="	max-w-[1440px] mx-auto bg-[#FFFFFF]">
		// 	<Routes>
		// 		<Route path="/login" element={<LoginPage />} />
		// 	</Routes>
		// </div>
	);
}

export default App;
