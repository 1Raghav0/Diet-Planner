import "remixicon/fonts/remixicon.css";
import DietAssistant from "../components/DietAssistant";

const Dashboard = () => {


  return (
    <div className="min-h-screen relative flex flex-col items-center">



      {/* Main Content */}
      <div className="w-full">
        <DietAssistant />
      </div>
    </div>
  );
};

export default Dashboard;
