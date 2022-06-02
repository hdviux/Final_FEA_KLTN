import React, { useState } from "react";
import { Menu, Popconfirm } from "antd";
import { DeleteFilled, EditFilled, ExpandAltOutlined } from "@ant-design/icons";
import UpdateCategory from "./UpdateCategory";
import DetailCategory from "./DetailCategory";
import categoryAPI from "../../../../api/categoryAPI";
import { useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const ItemButton = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const handleDeleteCategory = async () => {
    try {
      if (props.data.quantity === 0) {
        await categoryAPI.deletecategory(
          { categoryID: props.data._id }
        );
        Swal.fire({
          title: "Xóa thành công!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1300);
      }
      if (props.data.quantity !== 0) {
        Swal.fire({
          title: "Vẫn còn sản phẩm loại này!",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <DetailCategory
        show={showModalDetail}
        data={props.data}
        onHide={() => {
          setShowModalDetail(false);
        }}
      />
      <UpdateCategory
        show={showModalUpdate}
        data={props.data}
        onHide={() => {
          setShowModalUpdate(false);
        }}
      />
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
                onClick={() => setShowModalDetail(true)}
              >
                <ExpandAltOutlined
                  style={{
                    fontSize: 17,
                    marginRight: 15,
                    marginLeft: 5,
                  }}
                />
                <h6 className="mt-2">Xem chi tiết</h6>
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
              <Popconfirm
                placement="bottomRight"
                title="Bạn có muốn xóa loại sản phẩm này không?"
                onConfirm={handleDeleteCategory}
                okText="Có"
                cancelText="Không"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "150px",
                  }}
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
              </Popconfirm>
            ),
          },
        ]}
      />
    </div>
  );
};
export default ItemButton;
