import React, { useState } from "react";
import "../../../Styles/ForgetPassword.scss";
import authAPI from "../../../api/authAPI";
import { useHistory } from "react-router-dom";
const VerifyOTP = (props) => {
  const History = useHistory();
  const [emailPhone, setEmailPhone] = useState("");
  const [formSpanCheck, setFormSpanCheck] = useState(false);
  const [spanCheck, setSpanCheck] = useState("a");

  const handleCheckUser = async (e) => {
    e.preventDefault();
    try {
      const checkemail = await authAPI.checkemail({
        email: emailPhone,
      });
      const checkphone = await authAPI.checkphone({
        phone: emailPhone,
      });
      if (checkphone === 403 && checkemail === 403) {
        setFormSpanCheck(true);
        setSpanCheck("Không tìm thấy tài khoản!");
      }
      if (checkphone === 200) {
        const result = await authAPI.sendotpphone({
          phone: emailPhone,
        });
        History.push({
          pathname: "/forgetpassword/checkotp",
          state: {
            emailPhone: emailPhone,
            result: result,
          },
        });
      }
      if (checkemail === 200) {
        const result = await authAPI.sendverifyemail({
          email: emailPhone,
        });
        History.push({
          pathname: "/forgetpassword/checkotp",
          state: {
            emailPhone: emailPhone,
            result: result,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <forgetpassword>
      <formlogo>
        <img
          className="logo"
          src={require("../../../images/TOYSKID.png")}
          alt=""
        />
      </formlogo>
      <formforgetpassword>
        <input
          type="text"
          placeholder="Nhập email/số điện thoại"
          className="inputsignup"
          value={emailPhone}
          onChange={(e) => setEmailPhone(e.target.value)}
        />
        <formspancheck>
          {formSpanCheck && (
            <span className="spanstylecode">* {spanCheck}</span>
          )}
        </formspancheck>
        <formbutton>
          <buttonleft>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                History.push("/signin");
              }}
            >
              Hủy
            </button>
          </buttonleft>
          <buttonright>
            <button type="submit" onClick={(e) => handleCheckUser(e)}>
              Xác nhận
            </button>
          </buttonright>
        </formbutton>
      </formforgetpassword>
    </forgetpassword>
  );
};

export default VerifyOTP;
