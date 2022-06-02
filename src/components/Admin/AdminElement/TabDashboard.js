import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { useSelector } from "react-redux";
import categoryAPI from "../../../api/categoryAPI";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Button, DatePicker, Radio, Space } from "antd";
import orderAPI from "../../../api/orderAPI";
const TabDashboard = (props) => {
  const [labels, setLabels] = useState([]);
  const [value, setValue] = useState(1);
  const [data, setData] = useState([]);
  const [back, setBack] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  const [loading, setLoading] = useState(true);
  const [valueMonth, setValueMonth] = useState(1);
  const [valueYear, setValueYear] = useState(1);
  useEffect(() => {
    const action = async () => {
      try {
        const result = await orderAPI.getchart();
        const ar1 = [];
        const ar2 = [];
        for (let index = 0; index < result.result.length; index++) {
          ar1.push(result.result[index].time);
          ar2.push(result.result[index].value);
        }
        setLabels(ar1);
        setData(ar2);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeMonth = async (date) => {
    const result = await orderAPI.getchart({
      month: new Date(date._d).getMonth() + 1,
      year: new Date(date._d).getFullYear(),
    });
    const ar1 = [];
    const ar2 = [];
    for (let index = 0; index < result.result.length; index++) {
      ar1.push(result.result[index].time);
      ar2.push(result.result[index].value);
    }
    setLabels(ar1);
    setData(ar2);

    setLoading(false);
  };
  const onChangeYear = async (date) => {
    const result = await orderAPI.getchart({
      year: new Date(date._d).getFullYear(),
    });
    const ar1 = [];
    const ar2 = [];
    for (let index = 0; index < result.result.length; index++) {
      ar1.push(result.result[index].time);
      ar2.push(result.result[index].value);
    }
    setLabels(ar1);
    setData(ar2);

    setLoading(false);
  };
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
            <h2>Thống kê doanh thu</h2>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "auto",
              flexDirection: "row",
              marginBottom: "100px",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                paddingTop: "50px",
                paddingLeft: "",
              }}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <div className="mb-5">
                    <Space size={15}>
                      <Radio value={2}>Tùy chọn</Radio>
                      <DatePicker
                        disabled={value === 1 ? true : false}
                        onChange={onChangeMonth}
                        picker="month"
                        placeholder="Chọn tháng"
                      />
                      <DatePicker
                        disabled={value === 1 ? true : false}
                        onChange={onChangeYear}
                        picker="year"
                        placeholder="Chọn năm"
                      />
                    </Space>
                  </div>
                  <Radio value={1}>Tháng hiện tại</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div style={{ width: "50%", height: "100%" }}>
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
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <Line
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Doanh thu từng loại sản phẩm",
                      data: data,
                      // backgroundColor: back,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <div className="mb-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDashboard;
