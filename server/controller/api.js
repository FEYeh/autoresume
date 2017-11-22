const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars')
const TemplateOneModel = require('../model/TemplateOneModel')

const readJsonFile = fPath => new Promise((resolve, reject) => {
  fs.readFile(fPath, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      try {
        const templateJson = JSON.parse(data)
        resolve(templateJson)
      } catch (e) {
        // eslint-disable-next-line
        console.log('json parse error:', e)
        reject(e)
      }
    }
  });
})

const readFile = fPath => new Promise((resolve, reject) => {
  fs.readFile(fPath, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  });
})

const writeFile = (fPath, data) => new Promise((resolve, reject) => {
  fs.writeFile(fPath, data, 'utf8', (err) => {
    if (err) {
      console.log('write file error:', err)
      resolve(false)
    } else {
      resolve(true)
    }
  });
})

const exists = fPath => new Promise((resolve, reject) => {
  fs.exists(fPath, (e) => {
    if (e) {
      resolve(true)
    } else {
      console.log('file no exists')
      resolve(false)
    }
  });
})

const mkdir = fPath => new Promise((resolve, reject) => {
  fs.mkdir(fPath, (err) => {
    if (err) {
      console.log('mkdir error:', err)
      resolve(false)
    } else {
      resolve(true)
    }
  });
})

const getTemplates = async (ctx) => {
  try {
    const templateJsonFile = path.resolve(__dirname, '../../public/data/templates.json')
    const json = await readJsonFile(templateJsonFile)
    ctx.response.body = {
      status: { code: 0, msg: 'success' },
      data: { templates: json },
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log('server error:', e)
    ctx.response.body = {
      status: { code: 1000, msg: '服务异常' },
    }
  }
};

const getResumes = async (ctx) => {
  try {
    const resumesFolder = path.resolve(__dirname, '../../public/data/resumes')
    const files = fs.readdirSync(resumesFolder);
    const filesList = []
    files.forEach((filename) => {
      const stat = fs.statSync(path.resolve(resumesFolder, filename));
      if (!stat.isDirectory() && /.json$/.test(filename)) {
        filesList.push(filename.replace('.json', ''));
      }
    })
    ctx.response.body = {
      status: { code: 0, msg: 'success' },
      data: { resumes: filesList },
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
  const templateFile = path.resolve(__dirname, `../../public/data/templates/${ctx.request.body.templateName}.html`)
  const resumeFolder = path.resolve(__dirname, '../../public/data/resumes')
  if (!fs.existsSync(resumeFolder)) {
    fs.mkdirSync(resumeFolder)
  }
  const templateDataFile = path.resolve(__dirname, '../../public/data/resumes/resume1.json')
  const templateHtmlFile = path.resolve(__dirname, '../../public/data/resumes/resume1.html')
  const source = await readFile(templateFile);
  const template = Handlebars.compile(source);

  const originData = { ...ctx.request.body }
  const model = TemplateOneModel(ctx.request.body)
  try {
    const ds = model.fillData()
    const result = template(ds);
    let writeRes = writeFile(templateDataFile, JSON.stringify(originData))
    if (!writeRes) {
      console.log('写入json文件失败')
    }
    console.log('JSON.stringify(result)', result)
    writeRes = writeFile(templateHtmlFile, result)
    if (!writeRes) {
      console.log('写入html文件失败')
    }
    ctx.response.body = {
      status: { code: 0, msg: 'success' },
    }
  } catch (error) {
    ctx.response.body = {
      status: { code: 1000, msg: '服务异常' },
    }
  }
}

module.exports = {
  'GET /api/getTemplates': getTemplates,
  'GET /api/getResumes': getResumes,
  'POST /api/createResume': createResume,
};
