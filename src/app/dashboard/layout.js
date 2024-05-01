import DashboardSideBar from "@/components/dashboardsideBar/DashboardSideBar";

const DashboardLayout = ({children}) => {
  
    return <DashboardSideBar>
      {children}
    </DashboardSideBar>
};

export default DashboardLayout;