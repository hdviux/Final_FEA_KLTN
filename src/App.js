import "./App.css";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/Admin/pages/SignIn";
import ForgetPassword from "./components/Admin/pages/ForgetPassword";
import ForgetPasswordVerify from "./components/Admin/pages/ForgetPasswordVerify";
import ForgetNewPassword from "./components/Admin/pages/ForgetNewPassword";
import Account from "./components/Admin/pages/Account";
import "antd/dist/antd.min.css";
import TabCategory from "./components/Admin/AdminElement/TabCategory";
import TabDashboard from "./components/Admin/AdminElement/TabDashboard";
import TabBrand from "./components/Admin/AdminElement/TabBrand";
import TabUser from "./components/Admin/AdminElement/TabUser";
import TabProduct from "./components/Admin/AdminElement/TabProduct";
import TabOrder from "./components/Admin/AdminElement/TabOrder";
import PageError from "./components/Admin/pages/PageError";
function App() {
  const isSignIn = JSON.parse(localStorage.getItem("user"));
  return (
    <Switch>
      <Route path="/" exact>
        {isSignIn ? <TabDashboard /> : <SignIn />}
      </Route>
      <Route path="/home/category" exact>
        <TabCategory />
      </Route>
      <Route path="/home/brand" exact>
        <TabBrand />
      </Route>
      <Route path="/home/user" exact>
        <TabUser />
      </Route>
      <Route path="/home/product" exact>
        <TabProduct />
      </Route>
      <Route path="/home/order" exact>
        <TabOrder />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/forgetpassword" exact>
        <ForgetPassword />
      </Route>
      <Route path="/forgetpassword/checkotp" exact>
        <ForgetPasswordVerify />
      </Route>
      <Route path="/forgetpassword/newpassword" exact>
        <ForgetNewPassword />
      </Route>
      <Route path="*" exact>
        <PageError />
      </Route>
    </Switch>
  );
}

export default App;
