import React, { Component } from 'react';
import { Modal, message, Card } from 'antd'
import { Link } from 'react-router-dom'
import ResumeModel from '../model/resumeModel'
import './resumes.scss'

class Resumes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resumes: [],
      loading: false,
      currentImage: {},
      imageVisible: false,
    }
  }
  componentDidMount() {
    this.loadTemplates()
  }
  loadTemplates() {
    this.setState({ loading: true })
    ResumeModel.getTemplates().then((res) => {
      let data = { loading: false }
      if (res.data.status && res.data.status.code === 0) {
        data = {
          ...data,
          resumes: (res.data.data && res.data.data.resumes) || [],
        }
      } else {
        message.error(res.data.status ? res.data.status.msg : '获取模板库失败')
      }
      this.setState(data)
    })
  }
  showImage = (e) => {
    const alt = e.target ? e.target.alt : ''
    const src = e.target ? e.target.src : ''
    this.setState({
      imageVisible: true,
      currentImage: {
        alt,
        src,
      },
    })
  }
  hideImage = () => {
    this.setState({
      imageVisible: false,
    });
  }
  renderResumeList() {
    const { resumes } = this.state
    return (
      resumes.length < 1
        ? null
        : (
          <div className="resume-list">
            {
              resumes.map((r, idx) => (
                <Card key={`${r.name}-${idx}`} className="resume-card" bodyStyle={{ padding: 0 }}>
                  <div className="resume-image">
                    <img alt={r.name} width="100%" src={r.image} onClick={this.showImage} />
                  </div>
                  <div className="resume-title">
                    <h3>{r.name}</h3>
                    <Link to={`/resumes/create/${r.name}`}>Create</Link>
                  </div>
                </Card>
              ))
            }
          </div>
        )
    )
  }
  render() {
    return (
      <Card title="Resume Store" bordered={false} loading={this.state.loading}>
        {this.renderResumeList()}
        <Modal
          className="image-view"
          title={this.state.currentImage.alt}
          visible={this.state.imageVisible}
          onCancel={this.hideImage}
        >
          <img alt={this.state.currentImage.alt} width="100%" src={this.state.currentImage.src} />
        </Modal>
      </Card>
    )
  }
}

export default Resumes;
