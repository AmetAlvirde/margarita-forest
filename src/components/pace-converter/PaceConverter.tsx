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
import { getConversions } from "./utils";

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
  const [speedPerHour, setspeedPerHour] = useState("");
  const [conversionResults, setConversionResults] =
    useState<ConversionResults>();

  function triggerConversion() {
    const { minkm, minmi, kmh, mih } = getConversions({
      from: unitFrom,
      minutes,
      seconds,
      speedPerHour,
    });

    setConversionResults({
      minkm,
      minmi,
      kmh: Number(kmh),
      mih: Number(mih),
    });
  }

  function handleUnitChange(newUnit: string) {
    setUnitFrom(newUnit);
    setConversionResults({
      minmi: "",
      kmh: 0,
      minkm: "",
      mih: 0,
    });

    if (newUnit === "minkm" || newUnit === "minmi") {
      setspeedPerHour("");
    } else {
      setMinutes("");
      setSeconds("");
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
              value={speedPerHour}
              onChange={e => setspeedPerHour(e.target.value)}
              id="ph-time"
              type="number"
              placeholder="8.5"
            ></Input>
          </>
        ) : null}
        <Select onValueChange={handleUnitChange}>
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
          onClick={triggerConversion}
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
          {conversionResults?.minmi ? (
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
