import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'code-highlight/lib/style.css';
import 'highlight.js/styles/xcode.css';

import { Input, message, Select, Row, Col, Checkbox, Button, Card } from 'antd'
import { FormSchema, Form } from './antForm'
import ResumeModel from '../model/resumeModel'
import {
  MAX_PAGE_TITLE_NUM,
  MAX_PAGE_DESCRIPTION_NUM,
  BASICINFO_TEMPLATE,
  SPECIALITIES_TEMPLATE,
  SKILLSLIST_TEMPLATE,
  SKILLSDESCRIPTION_TEMPLATE,
  COMMUNITY_TEMPLATE,
  EXPERIENCE_TEMPLATE,
  PROJECT_TEMPLATE,
  OPENSOURCE_TEMPLATE,
  INTERESTS_TEMPLATE,
} from '../constant'
import './createResume.scss'

import CustomTextArea from './customTextArea'

const Option = Select.Option;
const { TextArea } = Input;


class CreateResume extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
  }
  static defaultProps = {
    match: { params: {} },
    history: {},
  }
  constructor(props) {
    super(props)
    this.state = {
      resume: [],
      loading: false,
    }
  }
  freshFormConfigs() {
    const labelCol = { span: 5 };
    const wrapperCol = { span: 19 };
    const col = 20;
    this.formConfigs = new FormSchema({
      layout: 'row',
      items: [
        {
          opts: {
            initialValue: this.props.match.params.name,
          },
          name: 'templateName',
          props: {
            label: '模板',
            labelCol,
            wrapperCol,
            col,
          },
          component: <Input disabled />,
        },
        {
          opts: {
            initialValue: 'FEYeh',
          },
          name: 'GitHubID',
          props: {
            label: 'GitHubID',
            labelCol,
            wrapperCol,
            col,
            style: { display: 'none' },
          },
          component: <Input disabled />,
        },
        {
          opts: {
            initialValue: '某某某的简历',
          },
          name: 'pageTitle',
          props: {
            label: '页面标题',
            labelCol,
            wrapperCol,
            col,
          },
          component: <Input placeholder="请输入页面标题" maxLength={`${MAX_PAGE_TITLE_NUM}`} />,
        },
        {
          opts: {
            initialValue: '某某某的简历',
          },
          name: 'pageDescription',
          props: {
            label: '页面描述',
            labelCol,
            wrapperCol,
            col,
          },
          component: <Input placeholder="请输入页面描述" maxLength={`${MAX_PAGE_DESCRIPTION_NUM}`} />,
        },
        {
          opts: {
            initialValue: '某某某',
          },
          name: 'name',
          props: {
            label: '姓名',
            labelCol,
            wrapperCol,
            col,
          },
          component: <Input placeholder="请输入姓名" />,
        },
        {
          opts: {
            initialValue: '前端开发',
          },
          name: 'position',
          props: {
            label: '职位',
            labelCol,
            wrapperCol,
            col,
          },
          component: <Input placeholder="请输入职位" />,
        },
        {
          name: 'basicInfo',
          props: {
            label: '基本信息',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: BASICINFO_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="基本信息模板"
              placeholder="请输入基本信息"
              description="请参考本模板填写基本信息"
              template={BASICINFO_TEMPLATE}
            />
          ),
        },
        {
          name: 'personalInfo',
          props: {
            label: '个人简介',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: `目前就职于饿了么，主要负责蜂鸟商家版的开发、维护及小组管理工作，同时也负责管理物流 iOS 开发组的 GitHub 组织和维护本组的技术博客。

自 2015 年开始接触 iOS 开发，至今已有 2 年时间，熟练掌握 Swift、Objective-C 代码的编写。熟悉大部分 iOS 开发与调试工具，理解 iOS App 结构与运行机制，注重代码质量与执行效率。

了解常见移动 App 架构，长期使用 Swift 与 Objective-C 进行混合开发，熟悉各类常用第三方库的使用。

熟悉 iOS 库的开发与发布，了解怎样利用 CocoaPods／Swift Package Manager／Cathage 进行打包与集成，业余时间热爱编写开源代码。熟悉持续集成，能够编写 Jenkins、Travis CI 等持续集成工具的配置。

熟悉 Git Flow 工作流程，有较好的 Git 使用习惯。有良好的代码风格与清晰的文档结构，遵循团队开发规范。`,
          },
          component: <TextArea placeholder="请输入个人简介" rows={10} />,
        },
        {
          name: 'specialities',
          props: {
            label: '技能专长',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: SPECIALITIES_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="技能专长模板"
              placeholder="请输入技能专长"
              description="请参考本模板填写技能专长"
              template={SPECIALITIES_TEMPLATE}
            />
          ),
        },
        {
          name: 'skillsList',
          props: {
            label: '技能评价',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: SKILLSLIST_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="技能评价模板"
              placeholder="请输入技能评价"
              description="请参考本模板填写技能评价"
              template={SKILLSLIST_TEMPLATE}
            />
          ),
        },
        {
          name: 'skillsDescription',
          props: {
            label: '能力简述',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: SKILLSDESCRIPTION_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="能力简述模板"
              placeholder="请输入能力简述"
              description="请参考本模板填写能力简述"
              template={SKILLSDESCRIPTION_TEMPLATE}
            />
          ),
        },
        {
          name: 'community',
          props: {
            label: '社区经验',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: COMMUNITY_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="社区经验模板"
              placeholder="请输入社区经验"
              description="请参考本模板填写社区经验"
              template={COMMUNITY_TEMPLATE}
            />
          ),
        },
        {
          name: 'experience',
          props: {
            label: '个人经验',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: EXPERIENCE_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="个人经验模板"
              placeholder="请输入个人经验"
              description="请参考本模板填写个人经验"
              template={EXPERIENCE_TEMPLATE}
            />
          ),
        },
        {
          name: 'project',
          props: {
            label: '项目经历',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: PROJECT_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="项目经历模板"
              placeholder="请输入项目经历"
              description="请参考本模板填写项目经历"
              template={PROJECT_TEMPLATE}
            />
          ),
        },
        {
          name: 'opensource',
          props: {
            label: '开源项目',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: OPENSOURCE_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="开源项目模板"
              placeholder="请输入开源项目"
              description="请参考本模板填写开源项目"
              template={OPENSOURCE_TEMPLATE}
            />
          ),
        },
        {
          name: 'interests',
          props: {
            label: '扩展技能',
            labelCol,
            wrapperCol,
            col,
          },
          opts: {
            initialValue: INTERESTS_TEMPLATE,
          },
          component: (
            <CustomTextArea
              title="扩展技能模板"
              placeholder="请输入扩展技能"
              description="请参考本模板填写扩展技能"
              template={INTERESTS_TEMPLATE}
            />
          ),
        },
      ],
      buttons: {
        props: {
          style: {
            textAlign: 'center',
          },
        },
        items: [
          {
            key: 'create',
            props: { type: 'primary', htmlType: 'submit', size: 'large', disabled: this.state.loading },
            text: 'Create',
          },
        ],
      },
    });
  }
  handleSubmit = (_, values) => {
    const data = {
      ...values,
    }
    const { history } = this.props
    ResumeModel.createResume(data).then((res) => {
      if (res.data.status && res.data.status.code === 0) {
        message.success('创建成功，3秒后自动跳转到我的简历库...')
        setTimeout(() => {
          history.push('/resumes')
        }, 3000)
      } else {
        message.error('创建失败')
      }
    })
  }
  render() {
    this.freshFormConfigs()
    return (
      <Card title="Create Resume " bordered={false} loading={this.state.loading}>
        <Form
          ref={(searchForm) => {
            this.searchForm = searchForm;
          }}
          onSubmit={this.handleSubmit}
          formSchema={this.formConfigs}
        />
      </Card>
    )
  }
}

export default CreateResume;
