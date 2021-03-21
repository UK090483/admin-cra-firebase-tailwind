import * as faker from "faker";
import { IJudgeRecord } from "judges/JudgeTypes";

import { JUDGE_COLORS } from "../misc/constants";
import { base } from "./helper";

export const FakeJudgeRecord: (id: string) => IJudgeRecord = (id) => ({
  ...base,
  id: id,
  color: `bg-${faker.random.arrayElement(
    JUDGE_COLORS
  )}-${faker.random.arrayElement(["200", "400", "600", "900"])}`,
  email: id + "@test.com",
  name: id,
  active: true,
  judgeType: faker.random.arrayElement(["pre", "main"]),
  state: "active",
});
