import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../Styles/VerifyOTP.scss";
import authAPI from "../../../api/authAPI";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import validator from "validator";
const ForgetPasswordVerify = (props) => {
  const location = useLocation();
  const History = useHistory();
  const [code, setCode] = useState("");
  const [formSpanCode, setFormSpanCode] = useState(false);
  const [spanCode, setSpanCode] = useState("");
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (code === "") {
        setFormSpanCode(true);
        setSpanCode("Chưa nhập mã xác nhận!");
      }
      if (code !== "") {
        setSpanCode("");
        setFormSpanCode(false);
        if (validator.isMobilePhone(location.state.emailPhone) === true) {
          const result = await authAPI.verifyotpphone({
            phone: location.state.emailPhone,
            code: code,
          });
          if (result.status === 200) {
            History.push({
              pathname: "/forgetpassword/newpassword",
              emailPhone: location.state.emailPhone,
            });
          }
          if (result.status === 400) {
            setFormSpanCode(true);
            setSpanCode("Mã xác nhận chưa chính xác!");
          }
        }
        if (validator.isEmail(location.state.emailPhone) === true) {
          const result = await authAPI.checkverifyemail({
            email: location.state.emailPhone,
            code: code,
          });
          if (result.status === 200) {
            History.push({
              pathname: "/forgetpassword/newpassword",
              emailPhone: location.state.emailPhone,
            });
          }
          if (result.status === 400) {
            setFormSpanCode(true);
            setSpanCode("Mã xác nhận chưa chính xác!");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setFormSpanCode(false);
      if (validator.isMobilePhone(location.state.emailPhone) === true) {
        const result = await authAPI.sendotpphone({
          phone: location.state.emailPhone,
        });
        if (result.status === 200) {
          Swal.fire({
            title: "Gửi lại mã thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
      if (validator.isEmail(location.state.emailPhone) === true) {
        const result = await authAPI.sendverifyemail({
          email: location.state.emailPhone,
        });
        if (result.status === 200) {
          Swal.fire({
            title: "Gửi lại mã thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <verifyotp>
      <formlogo>
        <img
          className="logo"
          src={require("../../../images/TOYSKID.png")}
          alt=""
        />
      </formlogo>
      <formverifyotp>
        <input
          type="text"
          placeholder={
            location.state.result.code === "OTP"
              ? "Nhập mã OTP"
              : "Nhập mã xác nhận"
          }
          className="inputsignup"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <formspan>
          <Link onClick={(e) => handleSendOTP(e)}>
            <span className="spanstyle">Gửi lại mã</span>
          </Link>
        </formspan>
        <formspancode>
          {formSpanCode && <span className="spanstylecode">* {spanCode}</span>}
        </formspancode>
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
            <button type="submit" onClick={(e) => handleVerify(e)}>
              Xác nhận
            </button>
          </buttonright>
        </formbutton>
      </formverifyotp>
    </verifyotp>
  );
};

export default ForgetPasswordVerify;
