import { Select } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "./index";

const LaunchTypeSelect = styled(Select)`
  margin-left: 0px;
  & .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
  }
`;

interface IProps {
  fetchData: (lType: string | null, sart: any, end: any) => void;
}

const LaunchSelector: FC<IProps> = ({ fetchData }) => {
  const history = useHistory();
  const [launchType, setLaunchType] = useState("all");
  const params: URLSearchParams = useQuery();
  useEffect(() => {
    const lType = params.get("launchType");
    if (lType) {
      setLaunchType(lType);
    }
  }, []);
  return (
    <LaunchTypeSelect
      value={launchType}
      onSelect={(value) => {
        if (value) {
          params.set("launchType", value.toString());
          fetchData(value.toString(), null, null);
          setLaunchType(value.toString());
        } else {
          params.set("launchType", "all");
          fetchData("all", null, null);
          setLaunchType("all");
        }
        history.push({ search: params.toString() });
      }}
    >
      <Select.Option value="all">All Launches</Select.Option>
      <Select.Option value="upcoming">Upcoming Launches</Select.Option>
      <Select.Option value="success">Successful Launches</Select.Option>
      <Select.Option value="failed">Failed Launches</Select.Option>
    </LaunchTypeSelect>
  );
};

export default LaunchSelector;
