export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mmAPIDomain: process.env.MM_API_DOMAIN,
});
