export const silentExec = () => {
  return process.env.VERBOSE == null || process.env.VERBOSE == '0';
};
