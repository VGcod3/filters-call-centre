import dayjs from "dayjs";
import { z } from "zod";

const TableSchema = z.object({
  id: z.number(),
  team: z.string(),
  date: z.string().refine((value) => dayjs(value, "DD/MM/YY").isValid()),
  startTime: z.string().refine((value) => dayjs(value, "HH:mm:ss").isValid()),
  waitingTime: z.string().refine((value) => dayjs(value, "mm:ss").isValid()),
  callerId: z.string(),
});

export type TableData = z.infer<typeof TableSchema>;

export const tableData: TableData[] = [
  {
    id: 1,
    team: "Customer Service",
    date: dayjs().subtract(32, "D").format("DD/MM/YY"),
    startTime: dayjs().subtract(32, "D").format("HH:mm:ss"),
    waitingTime: "01:14",
    callerId: "123456",
  },
  {
    id: 2,
    team: "Customer Service",
    date: dayjs().subtract(5, "D").format("DD/MM/YY"),
    startTime: dayjs().subtract(5, "D").format("HH:mm:ss"),
    waitingTime: "00:10",
    callerId: "980709",
  },
  {
    id: 3,
    team: "Retention",
    date: dayjs().subtract(3, "h").format("DD/MM/YY"),
    startTime: dayjs().subtract(3, "h").format("HH:mm:ss"),
    waitingTime: "02:15",
    callerId: "976873",
  },
  {
    id: 4,
    team: "Retention",
    date: dayjs().subtract(2, "M").format("DD/MM/YY"),
    startTime: dayjs().subtract(3, "h").format("HH:mm:ss"),
    waitingTime: "00:53",
    callerId: "903833",
  },
  {
    id: 5,
    team: "Sales",
    date: dayjs().subtract(3, "w").format("DD/MM/YY"),
    startTime: dayjs().subtract(3, "h").format("HH:mm:ss"),
    waitingTime: "00:42",
    callerId: "756789",
  },
  {
    id: 6,
    team: "Sales",
    date: dayjs().subtract(1, "M").format("DD/MM/YY"),
    startTime: dayjs().subtract(3, "h").format("HH:mm:ss"),
    waitingTime: "00:23",
    callerId: "891234",
  },
];
