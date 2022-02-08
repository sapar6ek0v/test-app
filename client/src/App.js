import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main.js";
import GetUserAnswer from "./pages/GetUserAnswer/GetUserAnswer.js";
import CreateTest from "./pages/CreateTest/CreateTest.js";
import Header from "./components/Header/Header.js";

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/test/:name' element={<GetUserAnswer/>}/>
                <Route path='/create-test' element={<CreateTest/>}/>
            </Routes>
        </>
    )
}

export default App;

