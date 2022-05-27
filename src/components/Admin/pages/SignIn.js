import React, { useState } from "react";
import { Input } from "antd";
import "../../../Styles/SignIn.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../../app/userSlice";
import { Spinner } from "react-bootstrap";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const History = useHistory();
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");

  const [formSpanEmailPhone, setFormSpanEmailPhone] = useState(false);
  const [formSpanPassword, setFormSpanPassword] = useState(false);

  const [spanEmailPhone, setSpanEmailPhone] = useState("");
  const [spanPassword, setSpanPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (emailPhone === "") {
        setFormSpanEmailPhone(true);
        setSpanEmailPhone("Chưa nhập email/số điện thoại!");
        setLoading(false);
      }
      if (password === "") {
        setFormSpanPassword(true);
        setSpanPassword("Chưa nhập mật khẩu");
        setLoading(false);
      }
      if (emailPhone !== "") {
        setFormSpanEmailPhone(false);
        setSpanEmailPhone("");
      }
      if (password !== "") {
        setFormSpanPassword(false);
        setSpanPassword("");
      }
      if (emailPhone !== "" && password !== "") {
        setFormSpanEmailPhone(false);
        setFormSpanPassword(false);
        const action = signin({
          emailPhone: emailPhone,
          password: password,
        });
        const resultAction = await dispatch(action);
        if (resultAction.payload === null) {
          setFormSpanEmailPhone(true);
          setSpanEmailPhone("Không tìm thấy tài khoản!");
          setLoading(false);
        }
        console.log(resultAction);
        if (resultAction.payload.status === 400) {
          setFormSpanPassword(true);
          setSpanPassword("Mật khẩu chưa chính xác!");
          setLoading(false);
        }
        if (resultAction.payload.status === 200) {
          if (
            resultAction.payload.user.role === 2 ||
            resultAction.payload.user.role === 3
          ) {
            setFormSpanPassword(true);
            setSpanPassword("Không thể đăng nhập bằng tài khoản người dùng!");
            setLoading(false);
          }
          if (resultAction.payload.user.role === 1) {
            if (resultAction.payload.status === 200) {
              unwrapResult(resultAction);
              History.push({ pathname: "/" });
              window.location.reload(false);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <signin>
      <formlogo>
        <img
          className="logo"
          src={require("../../../images/TOYSKID.png")}
          alt=""
        />
        <p className="text">
          Mang niềm vui đến cho con trẻ Hạnh phúc cho trẻ – tuổi thơ hồn nhiên
          bên TOYSKID
        </p>
      </formlogo>
      <formsignin>
        <h2>Đăng nhập</h2>
        <p className="text">Tài khoản:</p>
        <Input
          type="text"
          placeholder="Nhập email/số điện thoại"
          className="inputsignin"
          value={emailPhone}
          onChange={(e) => setEmailPhone(e.target.value)}
        />
        <formspan>
          {formSpanEmailPhone && (
            <span className="spanstyle">* {spanEmailPhone}</span>
          )}
        </formspan>
        <p className="text">Mật khẩu:</p>
        <Input.Password
          type="password"
          placeholder="Nhập mật khẩu"
          className="inputsignin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <formspan>
          {formSpanPassword && (
            <span className="spanstyle">* {spanPassword}</span>
          )}
        </formspan>
        <button type="submit" onClick={(e) => handleSignIn(e)}>
          {loading === true ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <div>Đăng nhập</div>
          )}
        </button>
        <forgetpass>
          <a href="/forgetpassword">Quên mật khẩu?</a>
        </forgetpass>
      </formsignin>
    </signin>
  );
};

export default SignIn;
