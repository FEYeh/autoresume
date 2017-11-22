const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars')
const TemplateOneModel = require('../model/TemplateOneModel')

const readJsonFile = fPath => new Promise((resolve, reject) => {
  fs.readFile(fPath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      try {
        const templateJson = JSON.parse(data);
        resolve(templateJson)
      } catch (e) {
        // eslint-disable-next-line
        console.log('json parse error:', e)
        reject(e);
      }
    }
  });
})

const readFile = fPath => new Promise((resolve, reject) => {
  fs.readFile(fPath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data)
    }
  });
})

const getTemplates = async (ctx) => {
  try {
    const templateJsonFile = path.resolve(__dirname, '../../public/data/templates.json')
    const json = await readJsonFile(templateJsonFile)
    ctx.response.body = {
      status: { code: 0, msg: 'success' },
      data: { resumes: json },
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log('server error:', e)
    ctx.response.body = {
      status: { code: 1000, msg: '服务异常' },
    }
  }
};

const createResume = async (ctx) => {
  const templateFile = path.resolve(__dirname, '../../public/data/templates/template1.html')
  const source = await readFile(templateFile);
  const template = Handlebars.compile(source);

  const model = TemplateOneModel(ctx.request.body)
  const ds = model.fillData()
  const result = template(ds);
  console.log('result', model, ds, result)
  ctx.response.body = {
    status: { code: 0, msg: 'success' },
    data: { html: result },
  }
}

module.exports = {
  'GET /api/getTemplates': getTemplates,
  'POST /api/createResume': createResume,
};
