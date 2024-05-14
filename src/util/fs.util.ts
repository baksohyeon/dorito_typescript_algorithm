import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const DATE = new Date();

const formatDigit = (time: number) => {
  return time.toString().padStart(2, "0");
};

const TIMESTAMP = `${DATE.getFullYear()}-${formatDigit(
  DATE.getMonth() + 1
)}-${formatDigit(DATE.getDate())}`;

const DAY_TIMESTAMP = `daytime-${formatDigit(DATE.getHours())}:${formatDigit(
  DATE.getMinutes()
)}`;

interface ICommand {
  question: string;
  name: string;
  defaultValue: string;
}

const PLATFORM_LIST = {
  LeetCode: "LeetCode",
  Programmers: "Programmers",
} as const;

const commands: ICommand[] = [
  {
    question:
      "\n Press the letter of the platform (Programmers: p, LeetCode: l): ",
    name: "platform",
    defaultValue: PLATFORM_LIST.Programmers,
  },
  {
    question:
      "\n Configure solution directory name\n \t recommand solution name: ",
    name: "destDir",
    defaultValue: TIMESTAMP,
  },
  {
    question: "\n Configure file name to store",
    name: "destFile",
    defaultValue: "filename",
  },
];

const answers: { [key: string]: string } = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const executeCommands = (index: number) => {
  if (index === commands.length) {
    rl.close();

    processAnswers(answers);
    return;
  }

  const { question, name, defaultValue } = commands[index];

  rl.question(`${question} (default: ${defaultValue}): `, (answer) => {
    // 플랫폼이 leetcode programmers 인지 확인
    if (name === "platform") {
      if (
        answer.toLowerCase() === "p" ||
        answer.toLowerCase() === "programmers"
      ) {
        answers[name] = PLATFORM_LIST.Programmers;
      } else if (
        answer.toLowerCase() === "l" ||
        answer.toLowerCase() === "leetcode"
      ) {
        answers[name] = PLATFORM_LIST.LeetCode;
      } else {
        answers[name] = defaultValue;
      }
      // 그 외 다른 커맨드들은 그대로 저장
    } else {
      answers[name] = answer || defaultValue;
    }
    executeCommands(index + 1);
  });
};

const processAnswers = async (answers: { [key: string]: string }) => {
  const { platform, destDir, destFile } = answers;
  // 플랫폼, 문제이름, 파일이름
  const templatePath = path.resolve(
    __dirname,
    "../../src/util/REVIEW_TEMPLATE.md"
  );

  const solutionPath = path.resolve(__dirname, `../../src/app.ts`);

  const targetPath = path.resolve(
    __dirname,
    `../../solution/${platform}/${destDir}`
  );

  const [templateContent, solutionContent] = await Promise.all([
    fs.promises.readFile(templatePath, "utf8"),
    fs.promises.readFile(solutionPath, "utf8"),
  ]);

  console.log({ templatePath, targetPath });

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`${targetPath}/${destFile}.solution.ts`, solutionContent);
  fs.writeFileSync(`${targetPath}/${destFile}.note.md`, templateContent);

  console.log("ok");
};

executeCommands(0);

// 웹 페이지의 타이틀을 가져오는 함수
async function fetchWebTitle(url: string): Promise<string> {
  try {
    // const response = await axios.get(url);
    const response = fetch(url).then((res) => res.text());
    return response;
  } catch (error) {
    console.error("Error fetching web title:", error);
    return "error";
  }
}
