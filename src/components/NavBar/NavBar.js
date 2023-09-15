const NavBar = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "5px 20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
        TODO Application
      </div>
      <div style={{ color: "white", fontSize: "20px" ,marginRight:'40px'}}>
        Manage your tasks efficiently
      </div>
    </div>
  );
};
export default NavBar;
