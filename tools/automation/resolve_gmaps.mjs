async function resolveGmaps() {
  const url = 'https://maps.app.goo.gl/B87SETh1WvUaChPa6?g_st=ac';
  const res = await fetch(url, { redirect: 'follow' });
  console.log('Final URL:', res.url);
}
resolveGmaps();
