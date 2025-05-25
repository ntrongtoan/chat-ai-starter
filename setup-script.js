const readline = require('readline');
const yargs = require('yargs');

const createInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const getProjectName = async () => {
  let projectName = yargs.argv.name;

  if (!projectName) {
    const rl = createInterface();
    projectName = await askQuestion(rl, 'Enter project name: ');
    rl.close();
  }

  return projectName;
};

const main = async () => {
  const projectName = await getProjectName();
  console.log(projectName);
};

main().catch(console.error);
