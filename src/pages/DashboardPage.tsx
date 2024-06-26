import CompaniesChartPage from "./CompaniesChartPage";
import CourseEnrollmentPage from "./CourseEnrollmentPage";
import TopCoursesPage from "./TopCoursesPage";
import TotalCountPage from "./TotalCountPage";

const DashboardPage = () => {
  return (
    <div className="mt-[21px] mx-[20px] mb-[147px] font-nunitoSans">
      <TotalCountPage />
      <CompaniesChartPage />
      <div className="flex gap-[22px] mt-[20px]">
        <CourseEnrollmentPage />
        <TopCoursesPage />
      </div>
    </div>
  );
};
export default DashboardPage;
