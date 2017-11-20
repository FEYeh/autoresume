import Base from './base.js';

class ResumeModel extends Base {
  // 1.获取模板库
  getTemplates = params => this.$get('/api/getTemplates', params);
  // 2.创建简历
  createResume = params => this.$post('/api/createResume', params);
}

export default new ResumeModel();
