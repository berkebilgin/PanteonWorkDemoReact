import { Button, Form, Input, notification, Spin } from "antd";
import { LoginPageMain, LoginPageFormDiv } from "../styled";
import { Login as LoginRequest } from "../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../../static/images/panteon-logo.webp";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    let checkStatus = true;
    await form.validateFields().catch(function () {
      checkStatus = false;
    });
    if (checkStatus) {
      const formValues = form.getFieldsValue();
      await dispatch(LoginRequest(formValues));
    }
    setLoading(false);
  };

  useEffect(() => {
    const registrationSuccess = localStorage.getItem("registrationSuccess");
    if (registrationSuccess) {
      notification.success({
        message: "Hesabınız başarıyla oluşturuldu, giriş yapabilirsiniz",
      });
      localStorage.removeItem("registrationSuccess");
    }
  }, []);

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

          <div className="op-area">
            <Button
              className="submitBtn"
              size="default"
              type="primary"
              onClick={submitForm}
            >
              <Spin spinning={loading}></Spin>
              {!loading && "Giriş Yap"}
            </Button>

            <Link className="registerBtn" to={"/register"}>
              Hesap Oluştur
            </Link>
          </div>
        </Form>
      </LoginPageFormDiv>
    </LoginPageMain>
  );
}

export default Login;
