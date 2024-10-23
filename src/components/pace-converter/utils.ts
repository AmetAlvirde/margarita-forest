export function decimalToSexagecimal(decimalMinutes: number) {
  const wholeMinutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes - wholeMinutes) * 60);
  const adjustedSeconds = seconds === 60 ? 0 : seconds;
  const adjustedMinutes = seconds === 60 ? wholeMinutes + 1 : wholeMinutes;

  return `${adjustedMinutes.toString().padStart(2, "0")}:${adjustedSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function getConversions({
  from = "minkm",
  minutes = "",
  seconds = "",
  perHourTime = "",
}: {
  from: string;
  minutes?: string;
  seconds?: string;
  perHourTime?: string;
}) {
  const kmToMiles = 0.621371;
  const milesToKm = 1.60934;
  const totalMinutesPerMile = Number(minutes) + Number(seconds) / 60;
  const totalMinutesPerKm = Number(minutes) + Number(seconds) / 60;

  switch (from) {
    case "minkm": {
      if (!minutes || !seconds)
        throw new Error("You need to enter minutes and seconds");

      return {
        minmi: decimalToSexagecimal(totalMinutesPerKm / kmToMiles),
        mih: Number((60 / totalMinutesPerKm) * kmToMiles).toFixed(2),
        kmh: Number(60 / totalMinutesPerKm).toFixed(2),
      };
    }

    case "minmi": {
      if (!minutes || !seconds)
        throw new Error("You need to enter minutes and seconds");

      return {
        minkm: decimalToSexagecimal(Number(totalMinutesPerMile) * milesToKm),
        kmh: ((60 / Number(totalMinutesPerMile)) * milesToKm).toFixed(2),
        mih: (60 / Number(totalMinutesPerMile)).toFixed(2),
      };
    }
    case "kmh": {
      if (!perHourTime) throw new Error("You need to enter the per hour time");

      return {
        minkm: decimalToSexagecimal(60 / Number(perHourTime)),
        minmi: decimalToSexagecimal(
          60 / (Number(perHourTime) * Number(kmToMiles))
        ),
        mih: Number(Number(perHourTime) * kmToMiles).toFixed(2),
      };
    }
    case "mih": {
      if (!perHourTime) throw new Error("You need to enter the per hour time");

      return {
        minkm: decimalToSexagecimal(60 / (Number(perHourTime) * milesToKm)),
        minmi: decimalToSexagecimal(60 / Number(perHourTime)),
        kmh: Number(Number(perHourTime) * milesToKm).toFixed(2),
      };
    }
    default:
      throw new Error("You need to enter the per hour time");
  }
}
