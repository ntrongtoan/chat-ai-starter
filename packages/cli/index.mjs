#!/usr/bin/env node

import readline from 'readline';
import { Command } from 'commander';

const program = new Command();

program.version('1.0.0');

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
  const rl = createInterface();
  const projectName = await askQuestion(rl, 'Enter project name: ');
  rl.close();
  return projectName;
};

const main = async () => {
  const projectName = await getProjectName();
  console.log(projectName);
};

main().catch(console.error);
