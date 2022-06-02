import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Link } from "@mui/material";
import { Button, Dropdown, Form, Menu, Popconfirm, Tag } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import discountAPI from "../../../../api/discountAPI";
import AddDiscount from "./AddDiscount";
import UpdateDiscount from "./UpdateDiscount";
const ButtonDiscount = (props) => {
  const [check, setCheck] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  useLayoutEffect(() => {
    const action = async () => {
      const checkDiscount = await discountAPI.checkdiscount({
        productID: props.data.key,
      });
      setCheck(checkDiscount.status);
      if (checkDiscount.status === true) {
        const findDiscount = await discountAPI.finddiscount({
          productID: props.data.key,
        });
        setDiscount(findDiscount.result);
      }
    };
    action();
  }, []);

  const handleDeleteDiscount = async () => {
    try {
      await discountAPI.deletediscount({
        productID: props.data.key,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AddDiscount
        show={showModalAdd}
        data={props.data}
        onHide={() => {
          setShowModalAdd(false);
        }}
      />
      <UpdateDiscount
        show={showModalUpdate}
        data={props.data}
        discount={discount}
        onHide={() => {
          setShowModalUpdate(false);
        }}
      />
      {check === false ? (
        <Link onClick={() => setShowModalAdd(true)}>
          <Tag
            color={"error"}
            style={{
              textAlign: "center",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            Thêm khuyến mãi
          </Tag>
        </Link>
      ) : (
        <Dropdown
          overlay={
            <Menu
              style={{ border: "1px solid rgba(218, 218, 218, 0.5)" }}
              items={[
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "150px",
                      }}
                      onClick={() => {
                        setShowModalUpdate(true);
                      }}
                    >
                      <EditFilled
                        style={{
                          fontSize: 17,
                          marginRight: 15,
                          marginLeft: 5,
                        }}
                      />
                      <h6 className="mt-2">Chỉnh sửa</h6>
                    </div>
                  ),
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
                      onClick={handleDeleteDiscount}
                    >
                      <DeleteFilled
                        style={{
                          fontSize: 17,
                          marginRight: 15,
                          marginLeft: 5,
                        }}
                      />
                      <h6 className="mt-2">Xóa</h6>
                    </div>
                  ),
                },
              ]}
            />
          }
          placement="bottom"
          arrow
        >
          <Tag
            color={"green"}
            style={{
              textAlign: "center",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            Giảm giá {discount.percent}%
          </Tag>
        </Dropdown>
      )}
    </div>
  );
};
export default ButtonDiscount;
