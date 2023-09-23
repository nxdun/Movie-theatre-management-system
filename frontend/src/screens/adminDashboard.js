import "./adminDashboard.css";

const AdminDashbord = () => {
  return (
    <div className="adminDashbord">
      <div className="adminDashbord__header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="adminDashbord__grid">
        <button className="adminDashbord__button movie">
          <h1>Movie Management</h1>
        </button>
        <button className="adminDashbord__button loyalty">
          <h1>Loyalty Management</h1>
        </button>
        <button className="adminDashbord__button food">
          <h1>Food and Beverage Management</h1>
        </button>
        <button className="adminDashbord__button seat">
          <h1>Seat Booking Management</h1>
        </button>
        <button className="adminDashbord__button private-screen">
          <h1>Private Screen Management</h1>
        </button>
        <button className="adminDashbord__button scheduling">
          <h1>Movie Scheduling</h1>
        </button>
        <button className="adminDashbord__button advertise">
          <h1>Advertise Management</h1>
        </button>
        <button className="adminDashbord__button financial">
          <h1>Financial Management</h1>
        </button>
      </div>
    </div>
  );
};

export default AdminDashbord;
