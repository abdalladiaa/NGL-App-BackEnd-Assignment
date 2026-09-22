export const toMs = (value, unit) => {
  switch (unit) {
    case "second":
      return value * 1000;

    case "minute":
      return value * 60 * 1000;

    case "hour":
      return value * 60 * 60 * 1000;

    case "day":
      return value * 24 * 60 * 60 * 1000;

    default:
      throw new Error("Invalid time unit");
  }
};
