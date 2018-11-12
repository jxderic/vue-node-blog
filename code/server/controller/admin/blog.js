import blogModel from '../../models/blog'
import tagModel from '../../models/tag'
import path from 'path'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, // 允许 Git Hub标准的markdown.
  tables: true, // 允许支持表格语法。该选项要求 gfm 为true。
  breaks: true, // 允许回车换行。该选项要求 gfm 为true。
  pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: true, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})

module.exports = {
  async list(ctx, next) {
    console.log('----------------获取博客列表 blog/list-----------------------');
    const { keyword, pageindex = 1, pagesize = 10 } = ctx.request.query;
    console.log('keyword:' + keyword + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
    try {
      const reg = new RegExp(keyword, 'i')
      const data = await ctx.findPage(blogModel, {
        $or: [
          { type: { $regex: reg }},
          { title: { $regex: reg }}
        ]
      }, { createTime: 0, html: 0 }, { limit: pagesize * 1, skip: (pageindex - 1) * pagesize });
      ctx.send(data)
    } catch (e) {
      console.log(e)
      ctx.sendError(e)
    }
  },

  async getTag(ctx, next) {
    console.log('----------------获取标签 blog/getTag-----------------------');
    try {
      const data = await ctx.find(tagModel);
      ctx.send(data)
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async addTag(ctx, next) {
    console.log('----------------添加标签 blog/addTag-----------------------');
    const tag = ctx.request.body;
    console.log(tag);
    try {
      const data = await ctx.findOne(tagModel, { name: tag.name });
      if (data) {
        ctx.sendError('标签已经存在, 请重新添加!')
      } else {
        const data = await ctx.add(tagModel, { name: tag.name });
        ctx.send(data)
      }
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async deleteTag(ctx, next) {
    console.log('----------------删除标签 blog/deleteTag-----------------------');
    const name = ctx.request.query.name
    try {
      ctx.remove(tagModel, { name: name })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async add(ctx, next) {
    console.log('----------------添加博客 blog/add-----------------------');
    const paramsData = ctx.request.body;
    try {
      const data = await ctx.findOne(blogModel, { title: paramsData.title })
      if (data) {
        ctx.sendError('数据已经存在, 请重新添加!')
      } else {
        paramsData.html = marked(paramsData.html);
        const data = await ctx.add(blogModel, paramsData);
        ctx.send(paramsData)
      }
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async update(ctx, next) {
    console.log('----------------更新博客 blog/update-----------------------');
    const paramsData = ctx.request.body;
    try {
      paramsData.html = marked(paramsData.html);
      const data = await ctx.update(blogModel, { _id: paramsData._id }, paramsData)
      ctx.send()
    } catch (e) {
      if (e === '暂无数据') {
        ctx.sendError(e)
      }
    }
  },

  async del(ctx, next) {
    console.log('----------------删除博客 blog/del-----------------------');
    const id = ctx.request.query.id
    try {
      ctx.remove(blogModel, { _id: id })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
