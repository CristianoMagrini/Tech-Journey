import dayjs from "dayjs";

export const useDayjs = () => {
  const dayJs = (date: string | number | Date) => dayjs(date);
  return { dayJs };
};
