import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'
import {
    Card,
    Breadcrumb,
    Form,
    Radio,
    Select,
    DatePicker,
    Button,
    Table,
    Space,
    Popconfirm,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import img404 from '@/assets/error.png'
import { http } from '@/utils'

import useStore from '@/store'
import { observer } from 'mobx-react-lite'

const { RangePicker } = DatePicker
const Article = () => {
    const { channelStore } = useStore()

    //文章列表
    const [articles, setArticles] = useState({
        list: [],
        count: 0,
    })
    //文章参数
    const [params, setParams] = useState({
        page: 1,
        per_page: 10,
    })

    useEffect(() => {
        const loadListHandler = async () => {
            const res = await http.get('/mp/articles', { params })
            // console.log('params改变了', res)

            const { results, total_count } = res.data.data

            setArticles({
                list: results,
                count: total_count,
            })
        }
        loadListHandler()
    }, [params])

    const navigate = useNavigate()
    const goPublish = (data) => {
        navigate(`/publish?id=${data.id}`)
    }

    const delArticle = async (data) => {
        // console.log(data)
        await http.delete(`/mp/articles/${data.id}`)
        setParams({
            ...params,
            page: 1,
        })
    }

    const cancelHandler = () => {
        return
    }

    const columns = [
        {
            title: '缩略图',
            dataIndex: 'cover',
            width: 120,
            render: (cover) => {
                return (
                    <img
                        src={cover.images[0] || img404}
                        width={80}
                        height={60}
                        alt=""
                    />
                )
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220,
        },
        {
            title: '频道',
            dataIndex: 'channel',
        },
        {
            title: '状态',
            dataIndex: 'status',
            // render: (data) => formatStatus(data),
        },
        {
            title: '发布时间',
            dataIndex: 'createdAt',
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => goPublish(data)}
                        />
                        <Popconfirm
                            title="确定要删除这篇文章吗？"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => delArticle(data)}
                            onCancel={cancelHandler}
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                // onClick={() => delArticle(data)}
                            />
                        </Popconfirm>
                    </Space>
                )
            },
            fixed: 'right',
        },
    ]

    const finishHandler = (values) => {
        const { channel_id, date, status } = values
        const params = {}
        if (status !== -1) {
            params.status = status
        }
        if (channel_id) {
            params.channel_id = channel_id
        }
        if (date) {
            params.begin_pubdate = date[0].format('YYYY-MM-DD')
            params.end_pubdate = date[1].format('YYYY-MM-DD')
        }

        setParams(params)
    }

    const pageChangeHandler = (page) => {
        setParams({
            ...params,
            page,
        })
    }

    return (
        <>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{ status: -1 }} onFinish={finishHandler}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}> 全部 </Radio>
                            <Radio value={0}> 草稿 </Radio>
                            <Radio value={1}> 待审核 </Radio>
                            <Radio value={2}> 审核通过 </Radio>
                            <Radio value={3}> 审核失败 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道" name={'channel_id'}>
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channelStore.channelList.map((channel) => (
                                <Select.Option
                                    key={channel.id}
                                    value={channel.name}
                                >
                                    {channel.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name={'date'}>
                        <RangePicker locale={locale} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 ${articles.count} 条结果。`}>
                <Table
                    rowKey="id"
                    bordered
                    columns={columns}
                    dataSource={articles.list}
                    pagination={{
                        pageSize: params.per_page,
                        total: articles.count,
                        onChange: pageChangeHandler,
                    }}
                />
            </Card>
        </>
    )
}

export default observer(Article)
