import './App.css';
import usersData from "./data/users.json";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
    return (
        <div className="container" style={{ width: "800px" }}>
            <div className="row text-center">
                <div className="col-md-6">
                    <LoginForm usersData={usersData} />
                </div>
                <div className="col-md-6">
                    <RegisterForm usersData={usersData} />
                </div>
            </div>
        </div>
    );
}

export default App;
