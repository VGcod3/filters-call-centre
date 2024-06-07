import { faker } from "@faker-js/faker";

import { DailyData, QueuePerformanceReport } from "./columns";
import { useMemo } from "react";
import dayjs from "dayjs";

const generateDailyData = (): DailyData => ({
  queue: dayjs(faker.date.recent()).format("MMM DD, YYYY"),

  total: faker.number.int(100),
  answered: faker.number.int(100),
  abandoned: {
    count: faker.number.int(100),
    percentage: faker.number.int(100) + "%",
  },
  overflow: {
    count: faker.number.int(100),
    percentage: faker.number.int(100) + "%",
  },
  talkTime: {
    total: getRandomTimeRange(),
    average: getRandomTimeRange(),
    max: getRandomTimeRange(),
  },
  waitTime: {
    total: getRandomTimeRange(),
    average: getRandomTimeRange(),
    max: getRandomTimeRange(),
  },
});

const generateQueueData = (): QueuePerformanceReport => ({
  queue: faker.lorem.word(),
  total: faker.number.int(1000),
  answered: faker.number.int(1000),
  abandoned: {
    count: faker.number.int(100),
    percentage: faker.number.int(100) + "%",
  },
  overflow: {
    count: faker.number.int(100),
    percentage: faker.number.int(100) + "%",
  },
  talkTime: {
    total: getRandomTimeRange(),
    average: getRandomTimeRange(),
    max: getRandomTimeRange(),
  },
  waitTime: {
    total: getRandomTimeRange(),
    average: getRandomTimeRange(),
    max: getRandomTimeRange(),
  },
  dailyData: Array.from({ length: faker.number.int(30) }, generateDailyData),
});

export const useMockData = () =>
  useMemo(
    () =>
      Array.from(
        {
          length: faker.number.int({
            min: 10,
            max: 20,
          }),
        },
        generateQueueData
      ),
    []
  );

function getRandomTimeRange(): string {
  const randomNumber = faker.number.int(10000);

  return dayjs().startOf("day").add(randomNumber, "second").format("HH:mm:ss");
}
