import fs from 'fs';

const getVersionNumber = () => {
  const packageFile = fs.readFileSync(`${__dirname}/../../package.json`, 'utf8');
  const { version } = JSON.parse(packageFile);
  return version;
};

export default getVersionNumber;
