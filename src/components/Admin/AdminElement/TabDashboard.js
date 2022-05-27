import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Input, Spin } from "antd";
import { Table, Space, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import AddCategory from "../Modal/Category/AddCategory";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import orderAPI from "../../../api/orderAPI";
import productAPI from "../../../api/productAPI";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DashLeft from "../Modal/Dashboard/DashLeft";
import DashRight from "../Modal/Dashboard/DashRight";
import categoryAPI from "../../../api/categoryAPI";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
const TabDashboard = (props) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [back, setBack] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const action = async () => {
      try {
        const result = await categoryAPI.chartcategory(
          loggedInUser.accessToken
        );
        const ar1 = [];
        const ar2 = [];
        const ar3 = [];
        for (let index = 0; index < result.result.length; index++) {
          let hash = 0;
          let i;
          for (i = 0; i < result.result[index].name.length; i += 1) {
            hash =
              result.result[index].name.charCodeAt(i) + ((hash << 5) - hash);
          }
          let colors = "#";
          for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            colors += `00${value.toString(16)}`.slice(-2);
          }
          ar1.push(result.result[index].name);
          ar2.push(result.result[index].cost);
          ar3.push(colors);
        }
        setLabels(ar1);
        setData(ar2);
        setBack(ar3);
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
          ></div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "auto",
              flexDirection: "row",
              marginBottom: "100px",
            }}
          >
            <div style={{ width: "50%", height: "100%" }}>
              <DashLeft labels={labels} data={data} back={back} />
            </div>
            <div style={{ width: "50%", height: "100%" }}>
              <DashRight labels={labels} data={data} back={back} />
            </div>
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
            <div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "50%" }}>
                  <h5 style={{ textAlign: "center" }}>
                    Thống kê doanh thu của từng loại sản phẩm
                  </h5>
                  <Doughnut
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                    }}
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: "Doanh thu từng loại sản phẩm",
                          data: data,
                          backgroundColor: back,
                        },
                      ],
                    }}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <Line
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: "Doanh thu từng loại sản phẩm",
                          data: data,
                          backgroundColor: back,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
              <div>
                <Bar
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: "Doanh thu từng loại sản phẩm",
                        data: data,
                        backgroundColor: back,
                      },
                    ],
                  }}
                />
              </div>
              <div className="mb-5"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabDashboard;
