import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import './index.scss'
import { Layout, Menu, Popconfirm } from 'antd'

import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'

import useStore from '@/store'
import { observer } from 'mobx-react-lite'

const { Header, Footer, Sider, Content } = Layout

const GeeLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const items = [
        {
            label: '数据概览',
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: '内容管理',
            key: '/article',
            icon: <DiffOutlined />,
        },
        {
            label: '发布文章',
            key: '/publish',
            icon: <EditOutlined />,
        },
    ]

    const menuClickHandler = (e) => {
        navigate(e.key, { replace: false })
    }

    const { userStore, loginStore, channelStore } = useStore()

    useEffect(() => {
        userStore.getUserInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    const confirmHandler = () => {
        //退出登录 删除token 跳回到登录页
        loginStore.loginOut()
        navigate('/login')
    }

    return (
        <Layout>
            <Layout>
                <Header>
                    <div className="logo" />
                    <div className="user-info">
                        <span className="user-name">
                            {userStore.userInfo.username}
                        </span>
                        <span className="user-logout">
                            <Popconfirm
                                title="是否确定退出？"
                                okText="退出"
                                cancelText="取消"
                                onConfirm={confirmHandler}
                            >
                                <LogoutOutlined />
                                退出
                            </Popconfirm>
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={[pathname]}
                            selectedKeys={[pathname]}
                            items={items}
                            onClick={menuClickHandler}
                        />
                    </Sider>
                    <Content className="layout-content">
                        <Outlet />
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}

export default observer(GeeLayout)
