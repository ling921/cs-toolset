const handle = async ({ event, resolve }) => resolve(event, {
  transformPageChunk: ({ html }) => html.replace(
    '<html lang="en">',
    `<html lang="${event.url.pathname.startsWith("/zh-CN/") ? "zh-CN" : "en"}">`
  )
});
export {
  handle
};
