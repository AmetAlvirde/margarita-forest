import { expect, describe, test } from "vitest";
import { getConversions, decimalToSexagecimal } from "./utils";

describe("Utils for <PaceConverter>: decimalToSexagesimal, getConversions", () => {
  test("decimalToSexagesimal", () => {
    expect(decimalToSexagecimal(3.75)).toEqual("03:45");
    expect(decimalToSexagecimal(5.55)).toEqual("05:33");
    expect(decimalToSexagecimal(10.25)).toEqual("10:15");
    expect(decimalToSexagecimal(8.1)).toEqual("08:06");
  });

  test("conversions from min/km", () => {
    expect(
      getConversions({
        from: "minkm",
        minutes: "7",
        seconds: "30",
      })
    ).toStrictEqual({
      minmi: "12:04",
      mih: "4.97",
      kmh: "8.00",
    });
  });

  test("conversions from min/mi", () => {
    expect(
      getConversions({
        from: "minmi",
        minutes: "10",
        seconds: "16",
      })
    ).toStrictEqual({
      minkm: "06:23",
      mih: "5.84",
      kmh: "9.41",
    });
  });

  test("conversions from mih", () => {
    expect(
      getConversions({
        from: "mih",
        speedPerHour: "8.64",
      })
    ).toStrictEqual({
      minkm: "04:19",
      minmi: "06:57",
      kmh: "13.90",
    });
  });
  test("conversions from kmh", () => {
    expect(
      getConversions({
        from: "kmh",
        speedPerHour: "14.4",
      })
    ).toStrictEqual({
      minkm: "04:10",
      minmi: "06:42",
      mih: "8.95",
    });
  });

  test("getConversions throws when `from` property is not valid (kmh, mih, minmi, minkm)", () => {
    expect(() =>
      getConversions({ from: "kph", perHourSpeed: "12.2" })
    ).toThrowError("You need to choose a valid case(mih, kmh, minmi, minkm)");
  });
});
