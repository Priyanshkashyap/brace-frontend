import Sidebar
from "../components/Sidebar";

function Dashboard() {

    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div
                style={{
                    padding: "20px"
                }}
            >

                <h1>
                    Dashboard
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px"
                    }}
                >

                    <div
                        style={{
                            border: "1px solid black",
                            padding: "20px"
                        }}
                    >
                        Users
                    </div>

                    <div
                        style={{
                            border: "1px solid black",
                            padding: "20px"
                        }}
                    >
                        Roles
                    </div>

                    <div
                        style={{
                            border: "1px solid black",
                            padding: "20px"
                        }}
                    >
                        Permissions
                    </div>

                    <div
                        style={{
                            border: "1px solid black",
                            padding: "20px"
                        }}
                    >
                        Role Groups
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;