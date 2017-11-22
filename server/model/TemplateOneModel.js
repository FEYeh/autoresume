module.exports = (data) => {
  this.templateName = data.templateName;
  this.pageTitle = data.pageTitle;
  this.pageDescription = data.pageDescription;
  this.name = data.name;
  this.position = data.position;
  this.basicInfo = data.basicInfo;
  this.personalInfo = data.personalInfo;
  this.specialities = data.specialities;
  this.skillsList = data.skillsList;
  this.skillsDescption = data.skillsDescption;
  this.community = data.community;
  this.experience = data.experience;
  this.project = data.project;
  this.opensource = data.opensource;
  this.interests = data.interests;

  this.fillBasicInfo = () => {
    try {
      console.log('this.basicInfo', this.basicInfo)
      const basicInfoJsonObj = JSON.parse(this.basicInfo)
      if (basicInfoJsonObj && basicInfoJsonObj.length > 0) {
        let content = ''
        basicInfoJsonObj.forEach((item) => {
          let valueHtml = ''
          if (item.data && item.data.length) {
            item.data.forEach((value) => {
              valueHtml += `<li>${value}</li>`
            })
            content +=
            `<div class="large-3 columns">
              <div class="row">
                <div class="small-4 columns light2">${item.title}</div>
                <div class="small-8 columns border-left light2">
                  <ul class="no-bullet">
                  ${valueHtml}
                  </ul>
                </div>
              </div>
            </div>`
          } else {
            throw new Error(`基本信息数据有误:${this.basicInfo}`)
          }
        })
        this.basicInfo = content
      } else {
        throw new Error(`基本信息数据有误:${this.basicInfo}`)
      }
    } catch (error) {
      throw new Error(`基本信息数据有误:${error}\n${this.basicInfo}`)
    }
  }

  this.fillSpecialities = () => {
    try {
      console.log('this.specialities', this.specialities)
      const specialitiesJsonObj = JSON.parse(this.specialities)
      if (specialitiesJsonObj && specialitiesJsonObj.length > 0) {
        let content = ''
        specialitiesJsonObj.forEach((item, index) => {
          content +=
          `<div class="large-4 medium-4 small-6 columns">
            <ul data-pie-id="${index + 1}" class="pie_desc">
              <li data-value="${item.score}">
              <div class="skill_info"><span class="skill_name">${item.name}</span>
              <span class="skill_level">${item.score}</span>
              </div>
              </li>
              <li data-value="${100 - item.score}"></li>
            </ul>
            <div id="${index + 1}" class="pie  animated bounceIn"></div>
          </div>`
        })
        this.specialities = content
      } else {
        throw new Error(`技能专长数据有误:${this.specialities}`)
      }
    } catch (error) {
      throw new Error(`技能专长数据有误:${error}\n${this.specialities}`)
    }
  }

  this.fillSkillsList = () => {
    try {
      console.log('this.skillsList', this.skillsList)
      const skillsListJsonObj = JSON.parse(this.skillsList)
      if (skillsListJsonObj && skillsListJsonObj.length > 0) {
        let content = ''
        skillsListJsonObj.forEach((item) => {
          let roundHtml = ''
          for (let i = 0; i < 8; i++) {
            roundHtml += item.score > i ? '<li><span></span></li>' : '<li><span class="grey"></span></li>'
          }
          content += (
            `<ul class="small-block-grid-2">
              <li class="name">${item.name}</li>
              <li>
              <ul class="small-block-grid-8 ellipses">
                ${roundHtml}
              </ul>
              </li>
            </ul>"`
          )
        })
        this.skillsList = content
      } else {
        throw new Error(`技能评价数据有误:${this.skillsList}`)
      }
    } catch (error) {
      throw new Error(`技能评价数据有误:${error}\n${this.skillsList}`)
    }
  }

  this.fillSkillsDescription = () => {
    try {
      console.log('this.skillsDescription', this.skillsDescription)
      const skillsDescriptionJsonObj = JSON.parse(this.skillsDescription)
      if (skillsDescriptionJsonObj && skillsDescriptionJsonObj.length > 0) {
        let content = ''
        skillsDescriptionJsonObj.forEach((item) => {
          content += (
            `<div class="name">${item}</div>`
          )
        })
        this.skillsDescription = content
      } else {
        throw new Error(`技能描述数据有误:${this.specialities}`)
      }
    } catch (error) {
      throw new Error(`技能描述数据有误:${error}\n${this.specialities}`)
    }
  }

  this.fillCommunity = () => {
    try {
      console.log('this.community', this.community)
      const communityJsonObj = JSON.parse(this.community)
      if (communityJsonObj && communityJsonObj.length > 0) {
        let content = ''
        communityJsonObj.forEach((item) => {
          content += (
            `<tr>
            <td>${item.title}</td>" +
            <td>${item.content}</td>" +
        </tr>`
          )
        })
        this.community = content
      } else {
        throw new Error(`社区经验数据有误:${this.community}`)
      }
    } catch (error) {
      throw new Error(`社区经验数据有误:${error}\n${this.community}`)
    }
  }

  this.fillExperience = () => {
    try {
      console.log('this.experience', this.experience)
      const experienceJsonObj = JSON.parse(this.experience)
      if (experienceJsonObj && experienceJsonObj.length > 0) {
        let content = ''
        experienceJsonObj.forEach((item) => {
          let valueHtml = ''
          if (item.data && item.data.length) {
            item.data.forEach((value) => {
              valueHtml += `<div class="date">${value}</div>`
            })
            content +=
            `<div class="large-6 medium-6 small-12 columns animated fadeIn">
              <div class="year">${item.title}</div>
              <div class="exp_data">
                ${valueHtml}
              </div>
            </div>`
          } else {
            throw new Error(`个人经验数据有误:${this.experience}`)
          }
        })
        this.experience = content
      } else {
        throw new Error(`个人经验数据有误:${this.experience}`)
      }
    } catch (error) {
      throw new Error(`个人经验数据有误:${error}\n${this.experience}`)
    }
  }

  this.fillProject = () => {
    try {
      console.log('this.project', this.project)
      const projectJsonObj = JSON.parse(this.project)
      if (projectJsonObj && projectJsonObj.length > 0) {
        let content = ''
        projectJsonObj.forEach((item) => {
          let proDescsHtml = ''
          if (item.pro_desc && item.pro_desc.length) {
            item.pro_desc.forEach((value) => {
              proDescsHtml += `<li class="desc_line">${value}</li>`
            })
            content +=
            `<div class="pro_item">
              <div class="category">${item.title}</div>
              <div class="pro_name">${item.pro_name}</div>
              <div class="pro_desc">
              <ul>
                ${proDescsHtml}
              </ul>
              </div>
            </div>`
          } else {
            throw new Error(`项目经历数据有误:${this.project}`)
          }
        })
        this.project = content
      } else {
        throw new Error(`项目经历数据有误:${this.project}`)
      }
    } catch (error) {
      throw new Error(`项目经历数据有误:${error}\n${this.project}`)
    }
  }

  this.fillOpensource = () => {
    try {
      console.log('this.opensource', this.opensource)
      const opensourceJsonObj = JSON.parse(this.opensource)
      if (opensourceJsonObj && opensourceJsonObj.length > 0) {
        let content = ''
        opensourceJsonObj.forEach((item) => {
          content +=
          `<div class="large-12 small-12 columns animated fadeIn">
            <div class="row">
            <div class="large-3 medium-3 small-4 columns">
            <div class="category">${item.name}</div><img src="img/ribbon.svg" width="100" height="131" alt="${item.title}" class="ribbon"></div>
            <div class="large-9 medium-9 small-8 columns">
            <div class="recog_data">
            <div class="title"><a href='${item.link}'>${item.title}</a></div>
            <div class="desc">${item.description}</div>
            </div>
            </div>
            </div>
          </div>`
        })
        this.opensource = content
      } else {
        throw new Error(`开源项目数据有误:${this.opensource}`)
      }
    } catch (error) {
      throw new Error(`开源项目数据有误:${error}\n${this.opensource}`)
    }
  }

  this.fillInterests = () => {
    try {
      console.log('this.interests', this.interests)
      const interestsJsonObj = JSON.parse(this.interests)
      if (interestsJsonObj && interestsJsonObj.length > 0) {
        let content = ''
        interestsJsonObj.forEach((item) => {
          content +=
          `<div class="large-3 small-6 medium-3 columns animated bounceIn">
          <div class="int_icon"><i class="${item.icon}"></i>
          <div class="activity">${item.name}</div>
          </div>
      </div>`
        })
        this.interests = content
      } else {
        throw new Error(`扩展技能数据有误:${this.interests}`)
      }
    } catch (error) {
      throw new Error(`扩展技能数据有误:${error}\n${this.interests}`)
    }
  }

  this.fillData = () => {
    this.fillBasicInfo()
    this.fillSpecialities()
    this.fillSkillsList()
    this.fillSkillsDescription()
    this.fillCommunity()
    this.fillExperience()
    this.fillProject()
    this.fillOpensource()
    this.fillInterests()

    return {
      templateName: this.templateName,
      pageTitle: this.pageTitle,
      pageDescription: this.pageDescription,
      name: this.name,
      position: this.position,
      basicInfo: this.basicInfo,
      personalInfo: this.personalInfo,
      specialities: this.specialities,
      skillsList: this.skillsList,
      skillsDescption: this.skillsDescption,
      community: this.community,
      experience: this.experience,
      project: this.project,
      opensource: this.opensource,
      interests: this.interests,
    }
  }

  return this
}
