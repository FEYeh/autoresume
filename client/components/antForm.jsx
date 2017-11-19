/* eslint-disable */
/*
  基于ant-design中的Form，支持通过描文件生成表单
  <Form onSubmit={this.handleSubmit} formSchema={formConfigs} onFieldsChange={this.onFieldsChange}></Form>
  const formConfigs = new FormSchema({
    // 传递给ant-design中的Form的属性 参考https://ant.design/components/form-cn/#Form
    formProps:{},
    // 表单项
    items:[{
      // 表单项参数，同getFieldDecorator(id, options) https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-参数
      opts: {
        // 默认值
        initialValue: '1',
        rules: [{ required: true, message: '请选择策略类型' }]
      },
      // 表单项的属性 参考https://ant.design/components/form-cn/#Form.Item
      props: formItemLayout,
      // 字段名称
      name: 'type',
      // 字段描述
      label: '策略类型',
      // 表单项依赖组件
      component: <Select placeholder="选择策略类型">
                    {Object.keys(ModelTypes.strategy_type).sort().map((key) => {
                      return(<Select.Option key={key} value={key}>{ModelTypes.strategy_type[key]}</Select.Option>)
                    })}
                 </Select>
    },
    {
      // 分组把多个字段分成一组，放在一个div中
      // 分组样式
      className: "ant-form-group-scheduletime"
      group: [
        {
          name: 'immediately',
          // props: formItemLayout,
          label: '是否立即执行',
          component: <Checkbox />
        },
        {
          opts: {
            rules: [{ required: true, message: '请选择执行时间' }]
          },
          name: 'scheduletime',
          // props: formItemLayout,
          label: '执行时间',
          // component: <DatePicker disabledDate={function(current){return current && current.valueOf() < Date.now()}}/>
          component: <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime disabledDate={(current)=>{ return current && current.valueOf() < Date.now()}}/>
        }
      ]
    },
  ]})
 */
import { Form, DatePicker, TimePicker, Button, Select, Input, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
import React, { Component } from 'react';
import './antForm.scss'

class AntForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, fieldsValue) => {
      this.props.onSubmit(error, fieldsValue)
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };
    const createButton = (cfg) => {
      return <Button key={cfg.key} {...cfg.props}>{cfg.text}</Button>
    }

    const createFormItem = (schema, idx) => {
      if (schema.disabled) {
        // console.log(`${schema.name} is disabled`)
        return null
      }
      if (schema.group){
        // 分组第一项的 name拼接"_group"作为key
        return <div className={'ant-form-item ant-row ant-form-group ' + schema.className} key={schema.group[0].name+'_group'}>
          {schema.group.map((item) => {
              return createFormItem(item)
            })}
        </div>
      }
      if (schema.props && schema.props.col) {
        return <Col key={`col-item-${idx}`} span={schema.props.col}>
          <FormItem key={schema.name} onChange={this.handleFormChange}
            {...schema.props}
          >
            {getFieldDecorator(schema.name, schema.opts)(schema.component || <Input />)}
          </FormItem>
        </Col>
      }
      return <FormItem key={schema.name} onChange={this.handleFormChange}
          {...schema.props}
        >
        {getFieldDecorator(schema.name, schema.opts)(schema.component || <Input />)}
      </FormItem>
    }
    const {formSchema} = this.props
    return <Form onSubmit={this.handleSubmit} {...formSchema.formProps}
      >
        {
          formSchema.layout === 'row' 
          ? formSchema.items.map((item, idx) => {
              if(item){
                return <Row key={`row-item-${idx}`}>{createFormItem(item, idx)}</Row>
              }
            })
          : formSchema.items.map((item, idx) => {
            if(item){
              return createFormItem(item, idx)
            }
          })
        }
        {/*生成表单按钮*/}
        {!formSchema.buttons
          ? <FormItem wrapperCol={{span: 4, offset: 4}}><Button type="primary" htmlType="submit" size="large">提  交</Button></FormItem>
          : <FormItem {...formSchema.buttons.props}>
            {formSchema.buttons.items.map((btn) => {
              if(!btn){
                return;
              }
              return createButton(btn)
            })}
          </FormItem>}
      </Form>
  }
}

const WrappedAntForm = Form.create({
  onFieldsChange (props, fields) {
    props.onFieldsChange && props.onFieldsChange(fields)
  }
})(AntForm)

function disableItem(list, name, isDisabled){
  let formItem = list.find((cfg) => {
    if (cfg.group) {
      disableItem(cfg.group, name, isDisabled)
      return false
    }
    return cfg.name === name
  })
  formItem && (formItem.disabled = isDisabled)
}

function FormSchema (options) {
  Object.assign(this, options)
/**
 * 禁用某个表单项
 * @param  {String}  name       [description]
 * @param  {String} isDisabled [description]
 * @return {[type]}             [description]
 */
  this.disable = function(name, isDisabled){
    disableItem(this.items, name, isDisabled)
  }
}
export default {
  FormSchema,
  Form: WrappedAntForm
}
