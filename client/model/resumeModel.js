import Base from './base.js';

class ResumeModel extends Base {
  // 1.获取模板库
  getTemplates = params => this.$get('/api/getTemplates', params);
  // 2.创建简历
  createResume = params => this.$post('/api/createResume', params);
  // 3.获取已创建的简历
  getResumes = params => this.$get('/api/getResumes', params);
}

export default new ResumeModel();
