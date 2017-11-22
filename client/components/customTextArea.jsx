import React, { Component } from 'react';
import { Input, Tooltip, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import CodeHighlight from 'code-highlight';
import 'code-highlight/lib/style.css';
import 'highlight.js/styles/xcode.css';

const { TextArea } = Input;

export default class CustomTextArea extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    template: PropTypes.string,
    description: PropTypes.string,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    initialValue: '',
    title: '',
    placeholder: '',
    template: '',
    description: '',
    onChange: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.props.onChange && this.props.onChange(value);
  }
  hideHelp = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    /* eslint-disable */
    const { value, initialValue, title, placeholder, template, description, ...rest } = this.props;
    return (
      <div className="custom-textarea">
        <TextArea placeholder={placeholder} rows={10} value={value} onChange={this.handleChange} />
        <Tooltip title="点击显示帮助">
          <Button
            className="help-button"
            shape="circle"
            icon="question"
            onClick={() => {
              this.setState({
                visible: true,
              })
            }}
          />
        </Tooltip>
        <Modal
          className="help-modal"
          title={title}
          visible={this.state.visible}
          onCancel={this.hideHelp}
        >
          <CodeHighlight
            language="javascript"
            description={description}
          >
            {template}
          </CodeHighlight>
        </Modal>
      </div>
    );
  }
}

