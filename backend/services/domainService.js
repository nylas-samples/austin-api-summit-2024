const getAppDomain = () => {
  return process.env.NODE_ENV === "prod"
    ? process.env.APP_DOMAIN_PROD
    : process.env.APP_DOMAIN_DEV;
};

export { getAppDomain };
