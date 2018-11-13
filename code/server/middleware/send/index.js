export default () => {
  const render = ctx => {
    return (json, msg) => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = JSON.stringify({
        code: 1,
        data: json || {},
        msg: msg || 'success'
      });
    }
  }
  const renderError = ctx => {
    return msg => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = JSON.stringify({
        code: 0,
        data: {},
        msg: msg.toString()
      });
    }
  }
  return async(ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = renderError(ctx);
    await next()
  }
}
