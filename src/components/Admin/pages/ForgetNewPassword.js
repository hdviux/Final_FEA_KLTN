import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../Styles/ForgetNewPassword.scss";
import authAPI from "../../../api/authAPI";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Input } from "antd";
const ForgetNewPassword = (props) => {
  const location = useLocation();
  const History = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formSpanNewPassword, setFormSpanNewPassword] = useState(false);
  const [formSpanOldPassword, setFormSpanOldPassword] = useState(false);
  const [spanNewPassword, setSpanNewPassword] = useState("");
  const [spanOldPassword, setSpanOldPassword] = useState("");
  console.log(location.emailPhone);
  console.log(oldPassword);
  console.log(newPassword);
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      console.log(location.emailPhone);
      console.log(oldPassword);
      console.log(newPassword);
      if (oldPassword.length < 6) {
        setSpanOldPassword("Mật khẩu phải lớn hơn 6 ký tự!");
        setFormSpanNewPassword(false);
        setFormSpanOldPassword(true);
      }
      if (oldPassword.length > 12) {
        setSpanOldPassword("Mật khẩu phải bé hơn 12 ký tự!");
        setFormSpanNewPassword(false);
        setFormSpanOldPassword(true);
      }
      if (oldPassword !== newPassword) {
        setFormSpanNewPassword(true);
        setFormSpanOldPassword(false);
        setSpanNewPassword("Mật khẩu xác nhận không khớp!");
      }
      if (
        oldPassword === newPassword &&
        oldPassword.length <= 12 &&
        oldPassword.length >= 6
      ) {
        setFormSpanNewPassword(false);
        setFormSpanOldPassword(false);
        await authAPI.forgetpassword({
          emailPhone: location.emailPhone,
          newPassword: newPassword,
        });
        Swal.fire({
          title: "Đổi mật khẩu thành công!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        History.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <forgetnewpassword>
      <formlogo>
        <img
          className="logo"
          src={require("../../../images/TOYSKID.png")}
          alt=""
        />
      </formlogo>
      <formforgetnewpassword>
        <Input.Password
          type="password"
          placeholder="Nhập mật khẩu mới"
          className="inputsignup"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <formspan>
          {formSpanOldPassword && (
            <span className="spanstylecode">* {spanOldPassword}</span>
          )}
        </formspan>
        <Input.Password
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          className="inputsignup"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <formspan>
          {formSpanNewPassword && (
            <span className="spanstylecode">* {spanNewPassword}</span>
          )}
        </formspan>
        <formbutton>
          <buttonleft>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                History.push("/forgetpassword");
              }}
            >
              Hủy
            </button>
          </buttonleft>
          <buttonright>
            <button type="submit" onClick={(e) => handleForgetPassword(e)}>
              Xác nhận
            </button>
          </buttonright>
        </formbutton>
      </formforgetnewpassword>
    </forgetnewpassword>
  );
};

export default ForgetNewPassword;
