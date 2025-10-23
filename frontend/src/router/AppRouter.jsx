import { Route, Routes} from "react-router-dom";
import { Login } from "../pages/Login/Login";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/inicio" element={<Login />}/>
        </Routes>
    )
}
