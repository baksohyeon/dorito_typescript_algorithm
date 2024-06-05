export const solution = (record: string[]) => {
  // [enter leave change] uid nickname
  // 모든 기록이 처리된 후, 최종적으로 방을 개설한 사람이 보게 되는 메시지
  // 현재 방 uid -> name
  const UserAction = {
    Enter: "Enter",
    Leave: "Leave",
    Change: "Change", // only admin can see
  } as const;

  const member = new Map<string, string>(); // uid, nickname
  const memberLog: string[][] = []; // list of action, user

  record.forEach((history) => {
    const [action, uid, nickname] = history.split(" ");
    if (nickname) {
      member.set(uid, nickname);
    }

    if (action !== UserAction.Change) {
      memberLog.push([action, uid]);
    }
  });

  return memberLog.map((log) => {
    const [action, uid] = log;

    const nickname = member.get(uid) ?? "";

    if (action === UserAction.Enter) {
      return `${nickname}님이 들어왔습니다.`;
    }
    if (action === UserAction.Leave) {
      return `${nickname}님이 나갔습니다.`;
    }
  });
};
