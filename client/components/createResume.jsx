import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeHighlight from 'code-highlight';
import 'code-highlight/lib/style.css';
import 'highlight.js/styles/xcode.css';

import { Input, Modal, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, Card } from 'antd'
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

const Option = Select.Option;
const { TextArea } = Input;


class CreateResume extends Component {
  static propTypes = {
    match: PropTypes.object,
  }
  static defaultProps = {
    match: { params: {} },
  }
  constructor(props) {
    super(props)
    this.state = {
      resume: [],
      loading: false,
    }
  }
  componentDidMount() {
    const templateName = this.props.match.params.name
    this.getTemplate(templateName)
  }
  getTemplate(templateName) {
    console.log('templateName', templateName)
  }
  hideHelp = () => {
    this.setState({
      basicInfoVisible: false,
      specialitiesVisible: false,
      skillsListVisible: false,
      skillsDescptionVisible: false,
      communityVisible: false,
      experienceVisible: false,
      projectVisible: false,
      opensourceVisible: false,
      interestsVisible: false,
    })
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
            initialValue: null,
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
          component: <div className="basicInfo">
            <TextArea placeholder="请输入基本信息" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    basicInfoVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="basicInfo-help-modal"
              title="基本信息模板"
              visible={this.state.basicInfoVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写基本信息"
              >
                {BASICINFO_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'personalInfo',
          props: {
            label: '个人简介',
            labelCol,
            wrapperCol,
            col,
          },
          component: <TextArea placeholder="请输入个人简介" rows={4} />,
        },
        {
          name: 'specialities',
          props: {
            label: '技能专长',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="specialities">
            <TextArea placeholder="请输入技能专长" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    specialitiesVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="specialities-help-modal"
              title="技能专长模板"
              visible={this.state.specialitiesVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写技能专长"
              >
                {SPECIALITIES_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'skillsList',
          props: {
            label: '技能评价',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="skillsList">
            <TextArea placeholder="请输入技能评价" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    skillsListVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="skillsList-help-modal"
              title="技能评价模板"
              visible={this.state.skillsListVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写技能评价"
              >
                {SKILLSLIST_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'skillsDescption',
          props: {
            label: '能力简述',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="skillsDescption">
            <TextArea placeholder="请输入能力简述" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    skillsDescptionVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="skillsDescption-help-modal"
              title="能力简述模板"
              visible={this.state.skillsDescptionVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写能力简述"
              >
                {SKILLSDESCRIPTION_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'community',
          props: {
            label: '社区经验',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="community">
            <TextArea placeholder="请输入社区经验" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    communityVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="community-help-modal"
              title="社区经验模板"
              visible={this.state.communityVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写社区经验"
              >
                {COMMUNITY_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'experience',
          props: {
            label: '个人经验',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="experience">
            <TextArea placeholder="请输入个人经验" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    experienceVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="experience-help-modal"
              title="个人经验模板"
              visible={this.state.experienceVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写个人经验"
              >
                {EXPERIENCE_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'project',
          props: {
            label: '项目经历',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="project">
            <TextArea placeholder="请输入项目经历" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    projectVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="project-help-modal"
              title="项目经历"
              visible={this.state.projectVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写项目经历"
              >
                {PROJECT_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'opensource',
          props: {
            label: '开源项目',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="opensource">
            <TextArea placeholder="请输入开源项目" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    opensourceVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="opensource-help-modal"
              title="开源项目"
              visible={this.state.opensourceVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写开源项目"
              >
                {OPENSOURCE_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
        },
        {
          name: 'interests',
          props: {
            label: '扩展技能',
            labelCol,
            wrapperCol,
            col,
          },
          component: <div className="interests">
            <TextArea placeholder="请输入扩展技能" rows={4} />
            <Tooltip title="点击显示帮助">
              <Button
                className="help-button"
                shape="circle"
                icon="question"
                onClick={() => {
                  this.setState({
                    interestsVisible: true,
                  })
                }}
              />
            </Tooltip>
            <Modal
              className="interests-help-modal"
              title="扩展技能"
              visible={this.state.interestsVisible}
              onCancel={this.hideHelp}
            >
              <CodeHighlight
                language="javascript"
                description="请参考本模板填写扩展技能"
              >
                {INTERESTS_TEMPLATE}
              </CodeHighlight>
            </Modal>
          </div>,
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
