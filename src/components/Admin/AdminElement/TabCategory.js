import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Input, Spin } from "antd";
import { Menu, Space, Button, Dropdown } from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExpandAltOutlined,
  LoadingOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DetailCategory from "../Modal/Category/DetailCategory";
import AddCategory from "../Modal/Category/AddCategory";
import UpdateCategory from "../Modal/Category/UpdateCategory";
import { useSelector } from "react-redux";
import categoryAPI from "../../../api/categoryAPI";
import IconButton from "@mui/material/IconButton";
import ItemButton from "../Modal/Category/ItemButton";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const TabCategory = (props) => {
  const { Search } = Input;
  const loggedInUser = useSelector((state) => state.user.current);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const onSearch = async (value) => {
    try {
      setLoading(true);
      const findCategory = await categoryAPI.findcategorybynamechar(
        { categoryName: value },
        loggedInUser.accessToken
      );
      if (findCategory.result.length === 0) {
        Swal.fire({
          title: "Không tìm thấy sản phẩm!",
          icon: "warning",
          showConfirmButton: false,
        });
      }
      if (findCategory.result.length !== 0) {
        setAllCategory(findCategory.result);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const action = async () => {
      try {
        const getAllBrand = await categoryAPI.getallcategory();
        setAllCategory(getAllBrand.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        padding: "20px",
        height: "720px",
      }}
    >
      <LeftNav />
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <TopNav />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            paddingLeft: "50px",
            paddingTop: "50px",
            paddingRight: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              height: "150px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setShowModalAdd(true);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <PlusOutlined style={{ marginBottom: 4, marginRight: 15 }} />
                  Thêm loại sản phẩm
                </div>
              </Button>
            </div>
            <Search
              placeholder="Nhập tên loại sản phẩm cần tìm"
              allowClear
              enterButton="Tìm kiếm"
              size="large"
              style={{ width: "400px" }}
              onSearch={onSearch}
            />
          </div>

          {loading === true ? (
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 55,
                    }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            <div style={{ marginBottom: "100px" }}>
              <Space size={[8, 16]} wrap>
                {allCategory.map((data, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "330px",
                      height: "100px",
                      borderRadius: "15px",
                      alignItems: "center",
                      justifyContent: "center",
                      // background: "#147c04",
                      border: "2px solid #147c04",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "20%",
                        width: "95%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Dropdown
                        overlay={<ItemButton data={data} />}
                        // trigger={["click"]}
                      >
                        <IconButton>
                          <MoreOutlined
                            style={{ fontSize: "30px", color: "#147c04" }}
                          />
                        </IconButton>
                      </Dropdown>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "55%",
                      }}
                    >
                      <h2 style={{ color: "#147c04" }}>{data.categoryName}</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        height: "20%",
                        width: "88%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <h7 style={{ color: "#147c04" }}>
                        Số lượng: {data.quantity}
                      </h7>
                    </div>
                  </div>
                ))}
              </Space>
            </div>
          )}
          <AddCategory
            show={showModalAdd}
            datauser={loggedInUser.user}
            onHide={() => {
              setShowModalAdd(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TabCategory;
