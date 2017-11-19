import Base from './base.js';

class ResumeModel extends Base {
  // 1.获取模板库
  getTemplates = params => this.$get('/api/getTemplates', params);
}

export default new ResumeModel();
