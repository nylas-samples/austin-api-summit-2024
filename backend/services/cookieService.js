export const getCookieName = () => {
  return process.env.APP_NAME.toLowerCase() + ".sid";
};
