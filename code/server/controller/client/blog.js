import blogModel from '../../models/blog'
import path from 'path'

module.exports = {
  async list(ctx, next) {
    console.log('----------------获取博客列表 client_demo_api/blog/list-----------------------');
    const { type = null, pageindex = 1, pagesize = 5 } = ctx.request.query;
    console.log('type:' + type + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
    try {
      const data = await ctx.find(blogModel, { type, isVisible: true, source: 1 }, null, { limit: pagesize * 1, skip: (pageindex - 1) * pagesize, sort: { level: -1, createTime: -1 }});
      return ctx.send(data)
    } catch (e) {
      console.log(e)
      return ctx.sendError(e)
    }
  },
  async info(ctx, next) {
    console.log('----------------获取博客信息 client_demo_api/blog/info-----------------------');
    const _id = ctx.request.query._id;
    try {
      const data = await ctx.findOne(blogModel, { _id });
      return ctx.send(data);
    } catch (e) {
      return ctx.sendError(e)
    }
  },
  async addComment(ctx, next) {
    console.log('----------------添加评论 blog/addComment-----------------------');
    const paramsData = ctx.request.body;
    console.log(paramsData);
    try {
      const data = await ctx.update(blogModel, { _id: paramsData._id }, {
        $push: {
          comments: paramsData.comment
        }
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
