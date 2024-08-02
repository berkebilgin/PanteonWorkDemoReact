import { Button, Form, Input, Spin, notification } from "antd";
import { LoginPageMain, LoginPageFormDiv } from "../styled";
import { useState } from "react";
import logo from "../../static/images/panteon-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { DataService } from "../../config/dataService/dataService";

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    let checkStatus = true;
    await form.validateFields().catch(function () {
      checkStatus = false;
    });
    if (checkStatus) {
      try {
        const response = await DataService.post(
          `${process.env.REACT_APP_REGISTER_ENDPOINT}`,
          form.getFieldsValue()
        );

        if (!response.data.isValid) {
          response.data.errorMessages?.forEach((msg) => {
            notification.error({
              message: msg,
            });
          });
        } else {
          localStorage.setItem("registrationSuccess", "true");
          navigate("/");
        }
      } catch {
        notification.error({
          message: "İşleminiz Sırasında Bir Hata Meydana Geldi",
        });
      }
    }
    setLoading(false);
  };

  return (
    <LoginPageMain>
      <LoginPageFormDiv>
        <div className="img-wrapper">
          <img src={logo} alt="img" />
        </div>
        <Form
          layout="vertical"
          name="basic"
          style={{
            maxWidth: 450,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            layout="vertical"
            label="Kullanıcı Adı"
            name="username"
            rules={[
              {
                required: true,
                message: "Zorunlu Alan",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="E-posta"
            name="email"
            rules={[
              {
                required: true,
                message: "Zorunlu Alan",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Şifre"
            name="password"
            rules={[
              {
                required: true,
                message: "Zorunlu Alan",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Şifre (Tekrar)"
            name="passwordAgain"
            rules={[
              {
                required: true,
                message: "Zorunlu Alan",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="op-area">
            <Button
              className="submitBtn"
              size="default"
              type="primary"
              onClick={submitForm}
            >
              <Spin spinning={loading}></Spin>
              {!loading && "Kayıt Ol"}
            </Button>

            <Link className="loginBtn" to="/">
              Giriş Yap
            </Link>
          </div>
        </Form>
      </LoginPageFormDiv>
    </LoginPageMain>
  );
}

export default Register;
