import React from 'react'
import { Button, Card, Form, Input, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import useStore from '@/store'
const Login = () => {
    const { loginStore } = useStore()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            await loginStore.getToken({
                identifier: values.username,
                password: values.password,
            })
            //登录成功跳转到首页
            navigate('/', { replace: true })
            //提示用户
            message.success('登录成功')
        } catch (error) {
            message.error(error.message || '登录失败')
        }
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                <Form
                    initialValues={{
                        remember: true,
                    }}
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        // label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            {
                                pattern: /^1[3-9]\d{9}/,
                                message: '请输入正确的手机号',
                                validateTrigger: 'onBlur',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        // label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                len: 6,
                                message: '请输入6位密码',
                                validateTrigger: 'onBlur',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>
                            我已阅读并同意[用户协议]和[隐私条款]
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            block
                            type="primary"
                            htmlType="submit"
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
