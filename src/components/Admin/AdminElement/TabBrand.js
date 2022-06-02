import React, { useState, useEffect } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Empty, Input, Spin } from "antd";
import { Table, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import AddBrand from "../Modal/Brand/AddBrand";
import brandAPI from "../../../api/brandAPI";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ItemButton from "../Modal/Brand/ItemButton";
const TabBrand = () => {
  const { Search } = Input;
  const loggedInUser = useSelector((state) => state.user.current);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  const onSearch = async (value) => {
    try {
      setLoading(true);
      const arr = [];
      const findBrand = await brandAPI.findbrandbynamechar(
        { brandName: value },
        loggedInUser.accessToken
      );
      if (findBrand.result.length === 0) {
        Swal.fire({
          title: "Không tìm thấy sản phẩm!",
          icon: "warning",
          showConfirmButton: false,
        });
      }
      if (findBrand.result.length !== 0) {
        for (let index = 0; index < findBrand.result.length; index++) {
          arr.push({
            key: findBrand.result[index]._id,
            brandName: findBrand.result[index].brandName,
            nation: findBrand.result[index].nation,
            image: findBrand.result[index].image,
          });
        }
        setAllBrand(arr);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [allBrand, setAllBrand] = useState([]);
  useEffect(() => {
    const action = async () => {
      try {
        const getAllBrand = await brandAPI.getallbrand();
        const arr = [];
        for (let index = 0; index < getAllBrand.result.length; index++) {
          arr.push({
            key: getAllBrand.result[index]._id,
            brandName: getAllBrand.result[index].brandName,
            nation: getAllBrand.result[index].nation,
            image: getAllBrand.result[index].image,
          });
        }
        setAllBrand(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <div>
          <img width={150} src={text} alt="" />
        </div>
      ),
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Quốc gia",
      dataIndex: "nation",
      key: "nation",
    },
    {
      title: "Action",
      key: "action",
      render: (text, rowKey) => <ItemButton data={rowKey} />,
      width: "25%",
    },
  ];

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
                  Thêm thương hiệu
                </div>
              </Button>
            </div>
            <Search
              placeholder="Nhập tên thương hiệu cần tìm"
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
            <Table
              pagination={{ pageSize: 5 }}
              columns={columns}
              dataSource={allBrand}
              locale={{
                emptyText: <Empty description={false} />,
              }}
            />
          )}
          <AddBrand
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

export default TabBrand;
