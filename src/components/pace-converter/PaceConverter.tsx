import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

type PaceConverterType = {
  from?: string;
  to?: string;
  view?: string;
  withPredictions?: boolean;
};

type ConversionResults = {
  minmi?: string;
  minkm?: string;
  kmh?: number;
  mih?: number;
};
export const PaceConverter = ({
  from = "minkm",
  withPredictions = false,
}: PaceConverterType) => {
  const [unitFrom, setUnitFrom] = useState(from);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [perHourTime, setPerHourTime] = useState("");
  const [conversionResults, setConversionResults] =
    useState<ConversionResults>();

  function decimalToSexagecimal(decimalMinutes: number): string {
    const wholeMinutes = Math.floor(decimalMinutes);
    const seconds = Math.round((decimalMinutes - wholeMinutes) * 60);
    const adjustedSeconds = seconds === 60 ? 0 : seconds;
    const adjustedMinutes = seconds === 60 ? wholeMinutes + 1 : wholeMinutes;

    return `${adjustedMinutes.toString().padStart(2, "0")}:${adjustedSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  function getConversions({
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
        if (!perHourTime)
          throw new Error("You need to enter the per hour time");

        return {
          minkm: decimalToSexagecimal(60 / Number(perHourTime)),
          minmi: decimalToSexagecimal(
            60 / (Number(perHourTime) * Number(kmToMiles))
          ),
          mih: Number(Number(perHourTime) * kmToMiles).toFixed(2),
        };
      }
      case "mih": {
        if (!perHourTime)
          throw new Error("You need to enter the per hour time");

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

  return (
    <>
      <section className="flex">
        {unitFrom === "minkm" || unitFrom === "minmi" ? (
          <>
            <Input
              id="minutes"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              type="number"
              placeholder="minutes"
            ></Input>
            <Input
              id="second"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              type="number"
              placeholder="seconds"
            ></Input>
          </>
        ) : null}
        {unitFrom === "kmh" || unitFrom === "mih" ? (
          <>
            <Input
              value={perHourTime}
              onChange={e => setPerHourTime(e.target.value)}
              id="ph-time"
              type="number"
              placeholder="8.5"
            ></Input>
          </>
        ) : null}
        <Select
          onValueChange={value => {
            setUnitFrom(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder={unitFrom} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="minkm">min/km</SelectItem>
            <SelectItem value="minmi">min/mi</SelectItem>
            <SelectItem value="kmh">Km/h</SelectItem>
            <SelectItem value="mih">Mi/h</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="bg-slate-800 text-white hover:bg-slate-900"
          onClick={() => {
            const { minkm, minmi, kmh, mih } = getConversions({
              from: unitFrom,
              minutes,
              seconds,
              perHourTime,
            });
            console.log({
              minkm,
              minmi,
              kmh,
              mih,
            });
            setConversionResults({
              minkm,
              minmi,
              kmh: Number(kmh),
              mih: Number(mih),
            });
          }}
        >
          Convert
        </Button>
      </section>
      <Separator
        className="my-4 bg-gray-300"
        orientation="horizontal"
      ></Separator>
      <section>
        <ul>
          {conversionResults?.minkm ? (
            <li>
              <span className="text-3xl font-mono px-1">
                {conversionResults.minkm}
              </span>
              <span className="text-md font-light px-1">min/km</span>
            </li>
          ) : null}
          {conversionResults?.kmh ? (
            <li>
              <span className="text-3xl font-mono px-1">
                {conversionResults?.minmi}
              </span>
              <span className="text-md font-light px-1">min/mi</span>
            </li>
          ) : null}
          {conversionResults?.mih ? (
            <li>
              <span className="text-3xl font-mono px-1">
                {conversionResults?.mih}
              </span>
              <span className="text-md font-light px-1">mi/h</span>
            </li>
          ) : null}
          {conversionResults?.kmh ? (
            <li>
              <span className="text-3xl font-mono px-1">
                {conversionResults?.kmh}
              </span>
              <span className="text-md font-light px-1">km/h</span>
            </li>
          ) : null}
        </ul>
      </section>

      {withPredictions ? (
        <section>
          <h2 className="text-3xl">Race predictions</h2>
        </section>
      ) : null}
    </>
  );
};
