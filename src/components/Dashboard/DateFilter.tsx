import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { FC } from "react";
import moment from "moment";
import styled from "styled-components";
import DateIcon from "../../assets/date.svg";
import { DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useQuery } from "./index";
import { toDateString } from "../../utils/tableData";

const DateFilters = styled.p`
  margin-bottom: 0px;
  margin-left: 10px;
`;
const DatePicker = styled.div`
  font-weight: normal;
  font-size: 14px;
  display: flex;
`;
const DownArrow = styled(DownOutlined)`
  margin-top: 11px;
  margin-left: 10px;
`;

interface IProps {
  setlabel: (val: any) => void;
  label: string;
  startDate: any;
  endDate: any;
  fetchData: (lType: string | null, start: any, end: any) => void;
}

const DateFilter: FC<IProps> = ({
  setlabel,
  label,
  endDate,
  startDate,
  fetchData,
}) => {
  const history = useHistory();
  const params: URLSearchParams = useQuery();
  const handlePicker = (start: any, end: any, label: any) => {
    fetchData(null, start, end);
    const tLabel = label
      ? label
      : `From ${toDateString(new Date(start), false)} To ${toDateString(
          new Date(end),
          false
        )}`;
    params.set("startDate", start.toString());
    params.set("endDate", end.toString());
    params.set("label", tLabel);
    history.push({ search: params.toString() });
    setlabel(tLabel);
  };

  return (
    <DatePicker>
      <img src={DateIcon} alt="" />
      <DateRangePicker
        initialSettings={{
          startDate: startDate,
          endDate: endDate,
          opens: "center",
          timePicker: false,
          ranges: {
            "Past Week": [moment().subtract(7, "days"), moment()],
            "Past Month": [
              moment().subtract(1, "month").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
            "Past 3 months": [
              moment().subtract(3, "months").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
            "Past 6 months": [
              moment().subtract(6, "months").startOf("month"),
              moment().subtract(1, "months").endOf("month"),
            ],
            "Past year": [
              moment().subtract(1, "year").startOf("year"),
              moment().subtract(1, "year").endOf("year"),
            ],
            "Past 2 year": [
              moment().subtract(2, "year").startOf("year"),
              moment().subtract(1, "year").endOf("year"),
            ],
            "Past 20 year": [
              moment().subtract(20, "year").startOf("year"),
              moment().subtract(1, "year").endOf("year"),
            ],
          },

          showCustomRangeLabel: false,
          autoApply: true,
          alwaysShowCalendars: true,
          autoUpdateInput: true,
        }}
        onCallback={handlePicker}
      >
        <DateFilters>{label}</DateFilters>
      </DateRangePicker>
      <DownArrow />
    </DatePicker>
  );
};

export default DateFilter;
