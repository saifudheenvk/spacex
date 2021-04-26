import { Row, Col, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import ApiCalls from "../../actions/Launches/LaunchAcions";
import LaunchSelector from "./LaunchSelector";
import Tabledata from "./TableData";
import { FilterOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import DateFilter from "./DateFilter";

const Container = styled(Row)`
  padding: 100px 0px 0px 0px;
`;

const Content = styled(Col)`
  text-align: center;
`;

const HeaderContainer = styled(PageHeader)`
  padding: 25px 0px 40px 0px;
`;

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [label, setlabel] = useState("Past 6 Months");
  const [loading, setLoading] = useState(false);
  const startDate = moment().subtract(6, "months").startOf("month");
  const endDate = moment().subtract(1, "months");

  const params: URLSearchParams = useQuery();

  const fetchData = (lType: string | null, start: any, end: any) => {
    var queryObject = {};
    console.log(label);
    if (!lType) {
      lType = params.get("launchType");
    }
    if (!start)
      start = params.get("startDate")
        ? moment(params.get("startDate"))
        : startDate;
    if (!end)
      end = params.get("endDate") ? moment(params.get("endDate")) : endDate;
    if (lType) {
      if (lType === "upcoming") {
        queryObject = { ...queryObject, upcoming: true };
      } else if (lType === "failed")
        queryObject = { ...queryObject, launch_success: false };
      else if (lType === "success")
        queryObject = { ...queryObject, launch_success: true };
    }
    setLoading(true);
    ApiCalls.getLaunches({
      ...queryObject,
      end: end && end.format("YYYY-MM-DD"),
      start: start && start.format("YYYY-MM-DD"),
    }).then((res) => {
      console.log(res.data);
      setData(
        res.data.map((d: any, index: number) => ({
          ...d,
          key: d.flight_number + index,
        }))
      );
      setLoading(false);
    });
  };
  useEffect(() => {
    var lab: any = params.get("label") ? params.get("label") : label;
    setlabel(lab);
    fetchData(null, null, null);
  }, []);

  return (
    <Container>
      <Col span={3} />
      <Content span={18}>
        <div>
          <HeaderContainer
            title={
              <DateFilter
                fetchData={fetchData}
                endDate={endDate}
                startDate={startDate}
                label={label}
                setlabel={setlabel}
              />
            }
            extra={[
              <FilterOutlined />,
              <LaunchSelector fetchData={fetchData} />,
            ]}
          />
        </div>
        <Tabledata data={data} loading={loading} />
      </Content>
      <Col span={3} />
    </Container>
  );
};

export default Dashboard;
