import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/authentication/actionCreator";
import { useEffect, useState } from "react";
import { DataService } from "../../config/dataService/dataService";
import Cookies from "js-cookie";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";

function BuildingList() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [state, setState] = useState({
    buildingList: null,
    buildingTypeList: null,
    upToDate: false,
  });
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const getBuildingList = async () => {
    const response = await DataService.get(
      `${process.env.REACT_APP_GET_BUILDING_LIST}`,
      {
        userId: Cookies.get("userId"),
      }
    );
    return response.data.model;
  };

  const getBuildingTypeList = async () => {
    const response = await DataService.get(
      `${process.env.REACT_APP_GET_BUILDING_TYPE_LIST}`,
      {
        userId: Cookies.get("userId"),
      }
    );
    return response.data.model;
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const addBuilding = async () => {
    if (modalLoading) return;
    setModalLoading(true);

    let checkStatus = true;
    await form.validateFields().catch(function () {
      checkStatus = false;
    });
    if (checkStatus) {
      try {
        const values = form.getFieldsValue();
        values.buildingCost = parseInt(values.buildingCost);
        values.constructionTime = parseInt(values.constructionTime);
        const response = await DataService.put(
          `${process.env.REACT_APP_ADD_BUILDING}`,
          values
        );

        if (!response.data.isValid) {
          if (!response.data.errorMessages?.length) {
            notification.error({
              message: "İşlem Sırasında Hata Oluştu",
            });
          } else {
            response.data.errorMessages?.forEach((msg) => {
              notification.error({
                message: msg,
              });
            });
          }
        } else {
          form.resetFields();
          notification.success({
            message: "Bina Eklendi",
          });
          setModalVisible(false);
          setState((prev) => ({ ...prev, upToDate: false }));
        }
      } catch {
        notification.error({
          message: "İşleminiz Sırasında Bir Hata Meydana Geldi",
        });
      }
    }
    setModalLoading(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const operations = async () => {
      const buildingList = await getBuildingList();
      const buildingTypeList = await getBuildingTypeList();
      setState({
        buildingList,
        buildingTypeList,
        upToDate: true,
      });
    };
    if (!state.upToDate) {
      if (!loading) {
        setLoading(true);
      }
      operations();
      setLoading(false);
    }
  }, [state.upToDate, loading]);
  const dataSource = [];
  state.buildingList?.map((value) => {
    const { buildingCost, constructionTime, buildingTypeId } = value;
    return dataSource.push({
      buildingCost: <span>{buildingCost}</span>,
      constructionTime: <span>{constructionTime}</span>,
      buildingType: (
        <span>
          {
            state.buildingTypeList?.find(
              (item) => item.idString === buildingTypeId
            ).name
          }
        </span>
      ),
    });
  });

  const columns = [
    {
      title: "Bina Maliyeti (c)",
      dataIndex: "buildingCost",
      key: "buildingCost",
    },
    {
      title: "İnşa Süresi (sn)",
      dataIndex: "constructionTime",
      key: "constructionTime",
    },
    {
      title: "Bina Türü",
      dataIndex: "buildingType",
      key: "buildingType",
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <Card
          extra={
            <Button
              type="link"
              icon={<LogoutOutlined />}
              onClick={async () => {
                await dispatch(Logout());
              }}
            >
              Çıkış Yap
            </Button>
          }
        >
          <Row gutter={25}>
            <Col xs={24}></Col>
            <Col xs={24} className="mx-32">
              <Row className="align-items-center">
                <Col xs={12}>
                  <h1>Bina Listesi</h1>
                </Col>
                <Col xs={12} className="text-right">
                  {state.buildingTypeList?.some((i) => i.unused) ? (
                    <Button
                      size="default"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={showModal}
                    >
                      Yeni Ekle
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <hr></hr>
            </Col>
            <Col xs={24}>
              {state.buildingList ? (
                <Table dataSource={dataSource} columns={columns} />
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Card>

        {state.buildingTypeList ? (
          <Modal
            title="Yeni Bina Ekle"
            visible={modalVisible}
            onOk={addBuilding}
            onCancel={handleCancel}
            okText="Ekle"
            cancelText="Vazgeç"
          >
            <Spin spinning={modalLoading}>
              <Form form={form} layout="vertical">
                <Form.Item
                  name="addUserId"
                  initialValue={Cookies.get("userId")}
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="buildingCost"
                  label="Bina Maliyeti"
                  rules={[
                    { required: true, message: "Bina maliyetini girin!" },
                  ]}
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                  name="constructionTime"
                  label="İnşa Süresi (sn)"
                  rules={[{ required: true, message: "İnşa süresini girin!" }]}
                >
                  <InputNumber min={30} max={1800} />
                </Form.Item>

                <Form.Item
                  name="buildingTypeId"
                  label={"Bina Türü"}
                  rules={[{ required: true, message: "Bina türünü seçin!" }]}
                >
                  <Select
                    defaultValue=""
                    showSearch
                    optionFilterProp="children"
                    onChange={(value) => {
                      form.setFieldValue("buildingTypeId", value);
                    }}
                  >
                    <Option value="">Seçiniz</Option>
                    {state.buildingTypeList
                      .filter((i) => i.unused)
                      .map((item) => (
                        <Option value={item.idString}>{item.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Form>
            </Spin>
          </Modal>
        ) : (
          ""
        )}
      </Spin>
    </>
  );
}

export default BuildingList;
