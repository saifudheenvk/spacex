import { Col, Divider, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import RocketActions from "../../actions/Rockets/RocketActions";
import { getTagStyle, toDateString } from "../../utils/tableData";
import { TagProps } from "./TableData";
import { useQuery } from "./index";
import { useHistory } from "react-router";
import ApiCalls from "../../actions/Launches/LaunchAcions";
import Loader from "../../assets/Loader.svg";
import nasa from "../../assets/image 2.png";
import wiki from "../../assets/image 3.png";
import youtube from "../../assets/image 4.png";
import React from "react";

const Container = styled.div``;
const StyledModal = styled(Modal)`
  & .ant-modal-content {
    border-radius: 6px;
  }
`;
const LinkContainer = styled(Row)`
  width: 60px;
`;
const SpinContainer = styled.div`
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledImage = styled.img`
  height: 72px;
`;
const MissionHeader = styled.div`
  margin: 0px 15px;
`;
const Header = styled(Row)`
  margin-bottom: 16px;
`;
const span: any = styled.span;
export const StyledTag = span`
  border-radius: 20px;
  color:${(props: TagProps) => props.color};
  background:${(props: TagProps) => props.background};
  padding: 4px 12px;
  font-weight:bold;
  height: 27px;
  font-size: 12px;
`;
const MissionName = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  max-width: 261px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const RocketName = styled.p`
  font-size: 12px;
  margin-bottom: 0px;
`;
const Details = styled.p`
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 24px;
`;
const SingleItem = styled(Row)``;
const DividerStyled = styled(Divider)`
  margin: 16px 0;
  border-top: 1px solid #e4e4e7;
`;

interface IProps {
  item: any;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const LaunchDetails: FC<IProps> = ({ item, showModal, setShowModal }) => {
  const [country, setCountry] = useState();
  const [company, setCompany] = useState();
  const history = useHistory();
  const [launchItem, setLaunchItem] = useState<any>();

  const params: URLSearchParams = useQuery();

  useEffect(() => {
    if (item) {
      ApiCalls.getLauncheById(item).then((res) => {
        if (res.data) {
          setLaunchItem(res.data);
          RocketActions.getRocketById(res.data.rocket.rocket_id).then((res) => {
            setCountry(res.data.country);
            setCompany(res.data.company);
          });
        }
      });
    }
  }, [item]);

  const onCancel = () => {
    setShowModal(false);
    params.set("showModal", "false");
    history.push({ search: params.toString() });
  };
  const { tag, color, background } = getTagStyle(
    launchItem ? launchItem.launch_success : false
  );
  return (
    <StyledModal
      footer={null}
      title={null}
      visible={showModal}
      onCancel={onCancel}
    >
      {launchItem ? (
        <Container>
          <Header>
            <StyledImage src={launchItem.links.mission_patch_small} />
            <MissionHeader>
              <MissionName>{launchItem.mission_name}</MissionName>
              <RocketName>{launchItem.rocket.rocket_name}</RocketName>
              <LinkContainer>
                <Col span={8}>
                  <a href={launchItem.links.presskit}>
                    <img alt="" src={nasa} />
                  </a>
                </Col>
                <Col span={8}>
                  <a href={launchItem.links.wikipedia}>
                    <img alt="" src={wiki} />
                  </a>
                </Col>
                <Col span={8}>
                  <a href={launchItem.links.video_link}>
                    <img alt="" src={youtube} />
                  </a>
                </Col>
              </LinkContainer>
            </MissionHeader>
            <StyledTag color={color} background={background}>
              {tag}
            </StyledTag>
          </Header>
          <Details>
            {launchItem.details}
            <a href={launchItem.links.wikipedia}>Wikipedia</a>
          </Details>
          <SingleItem>
            <Col span={10}>Flight Number</Col>
            <Col span={14}>{launchItem.flight_number}</Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Mission Name</Col>
            <Col span={14}>{launchItem.mission_name}</Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Rocket Type</Col>
            <Col span={14}>{launchItem.rocket.rocket_type}</Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Manufacturer</Col>
            <Col span={14}>{company}</Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Nationality</Col>
            <Col span={14}>{country}</Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Launch Date</Col>
            <Col span={14}>
              {toDateString(new Date(launchItem.launch_date_utc), true)}
            </Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Payload Type</Col>
            <Col span={14}>
              {launchItem.rocket.second_stage.payloads[0].payload_type}
            </Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Orbit</Col>
            <Col span={14}>
              {launchItem.rocket.second_stage.payloads[0].orbit}
            </Col>
          </SingleItem>
          <DividerStyled />
          <SingleItem>
            <Col span={10}>Launch Site</Col>
            <Col span={14}>{launchItem.launch_site.site_name}</Col>
          </SingleItem>
        </Container>
      ) : (
        <SpinContainer>
          <img className="rotate-image" src={Loader} alt="" />
        </SpinContainer>
      )}
    </StyledModal>
  );
};

export default LaunchDetails;
