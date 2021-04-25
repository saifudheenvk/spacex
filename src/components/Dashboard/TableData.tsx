import { Table } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../../assets/Loader.svg";
import LaunchDetails from "./LaunchDetails";
import { getTagStyle, toDateString } from "../../utils/tableData";
import { useQuery } from "./index";
import { useHistory } from "react-router";

export interface TagProps {
  color: string;
  background: string;
}
const SpinContainer = styled.div`
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const span: any = styled.span;
const StyledTag = span`
  border-radius: 20px;
  color:${(props: TagProps) => props.color};
  background:${(props: TagProps) => props.background};
  padding: 4px 12px;
  font-weight:bold;
`;
const LaunchTable = styled(Table)`
  border-radius: 6px;
  font-size: 12px;
`;

interface IProps {
  data: Array<any>;
  loading: boolean;
}

const TableData: FC<IProps> = ({ data, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const [launchItem, setLaunchItem] = useState("");
  const params: URLSearchParams = useQuery();
  const history = useHistory();

  useEffect(() => {
    const sModal = params.get("showModal") === "true";
    const lItem = params.get("launchItem");
    if (lItem) setLaunchItem(lItem);
    setShowModal(sModal);
  }, []);
  const columns: Array<any> = [
    {
      title: "No:",
      key: "index",
      render: (text: string, record: any, index: number) => {
        if (index + 1 < 10) return `0${index + 1}`;
        else return index + 1;
      },
    },
    {
      title: "Launched (UTC)",
      key: "launchDate",
      dataIndex: "launch_date_utc",
      render: (dateString: string) => {
        const date: Date = new Date(dateString);
        return toDateString(date, true);
      },
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "launch_site",
      render: (location: any) => location.site_name,
    },
    {
      title: "Mission",
      key: "mission",
      dataIndex: "mission_name",
      render: (mission: string) => mission,
    },
    {
      title: "Orbit",
      key: "orbit",
      dataIndex: "rocket",
      render: (rocket: any) => rocket.second_stage.payloads[0].orbit,
    },
    {
      title: "Launch Status",
      key: "status",
      dataIndex: "launch_success",
      render: (status: boolean, record: any, index: number) => {
        const { tag, color, background } = getTagStyle(status);
        return (
          <StyledTag color={color} background={background} key={index}>
            {tag}
          </StyledTag>
        );
      },
    },
    {
      title: "Rocket",
      key: "rocket",
      dataIndex: "rocket",
      render: (rocket: any) => rocket.rocket_name,
    },
  ];
  return (
    <>
      <LaunchDetails
        item={launchItem}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <LaunchTable
        onRow={(record: any, recordIndex) => ({
          onClick: (event) => {
            params.set("showModal", "true");
            params.set("launchItem", record.flight_number);
            setLaunchItem(record.flight_number);
            setShowModal(true);
            history.push({ search: params.toString() });
          },
        })}
        locale={{
          emptyText: !loading ? (
            <p>No results found for the specified filter</p>
          ) : (
            <SpinContainer>
              <img className="rotate-image" src={Loader} alt="" />
            </SpinContainer>
          ),
        }}
        pagination={{
          pageSize: 12,
          total: data.length,
          showSizeChanger: false,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
export default TableData;
