import React, { useState } from "react";
import { Menu, Popconfirm, Form, Button, Input } from "antd";
import {
  EditFilled,
  LikeFilled,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import userAPI from "../../../../api/userAPI";
import { Modal } from "react-bootstrap";
const ItemButtonUser = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const handleLockUser = async () => {
    try {
      await userAPI.updateuserrole(
        {
          userID: props.data.key,
          role: 3,
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnLockUser = async () => {
    try {
      await userAPI.updateuserrole(
        {
          userID: props.data.key,
          role: 2,
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeToAdmin = async () => {
    try {
      await userAPI.updateuserrole(
        {
          userID: props.data.key,
          role: 1,
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateNewPass = async () => {
    try {
      await userAPI.adminupdateuserpassword(
        {
          userID: props.data.key,
          newPassword: newPassword,
        },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const reload = () => {
    setNewPassword("");
  };
  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExit={reload}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Cập nhật mật khẩu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingLeft: "25%", paddingRight: "25%" }}>
            <Form.Item>
              <h5>Nhập mật khẩu mới:</h5>
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  style={{ width: "100%", marginRight: "15px" }}
                  type="default"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  style={{ width: "100%", marginLeft: "15px" }}
                  type="primary"
                  onClick={handleUpdateNewPass}
                >
                  Cập nhật
                </Button>
              </div>
            </Form.Item>
          </div>
        </Modal.Body>
      </Modal>
      <Menu
        style={{ border: "1px solid rgba(218, 218, 218, 0.5)" }}
        items={[
          {
            label: (
              <Popconfirm
                placement="leftTop"
                title="Bạn có muốn cấp quyền quản trị cho tài khoản này không?"
                onConfirm={handleChangeToAdmin}
                okText="Có"
                cancelText="Không"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <LikeFilled
                    style={{
                      fontSize: 17,
                      marginRight: 15,
                      marginLeft: 5,
                    }}
                  />
                  <h6 className="mt-2">Cấp quyền quản trị</h6>
                </div>
              </Popconfirm>
            ),
          },
          {
            type: "divider",
          },
          {
            label:
              props.data.role === 2 ? (
                <Popconfirm
                  placement="leftTop"
                  title="Bạn có muốn khóa tài khoản này không?"
                  onConfirm={handleLockUser}
                  okText="Có"
                  cancelText="Không"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LockFilled
                      style={{
                        fontSize: 17,
                        marginRight: 15,
                        marginLeft: 5,
                      }}
                    />
                    <h6 className="mt-2">Khóa tài khoản</h6>
                  </div>
                </Popconfirm>
              ) : props.data.role === 3 ? (
                <Popconfirm
                  placement="leftTop"
                  title="Bạn có muốn mở khóa tài khoản này không?"
                  onConfirm={handleUnLockUser}
                  okText="Có"
                  cancelText="Không"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <UnlockFilled
                      style={{
                        fontSize: 17,
                        marginRight: 15,
                        marginLeft: 5,
                      }}
                    />
                    <h6 className="mt-2">Mở khóa tài khoản</h6>
                  </div>
                </Popconfirm>
              ) : null,
          },
          {
            type: "divider",
          },
          {
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "150px",
                }}
                onClick={() => {
                  setShow(true);
                }}
              >
                <EditFilled
                  style={{
                    fontSize: 17,
                    marginRight: 15,
                    marginLeft: 5,
                  }}
                />
                <h6 className="mt-2">Cập nhật mật khẩu</h6>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};
export default ItemButtonUser;
