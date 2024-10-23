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

type ConversionResults = {
  minmi?: string;
  minkm?: string;
  kmh?: string;
  mih?: string;
};

export const PaceConverter = () => {
  const [unitFrom, setUnitFrom] = useState("minkm");
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
      kmh,
      mih,
    });
  }

  function handleUnitChange(newUnit: string) {
    setUnitFrom(newUnit);
    setConversionResults({
      minmi: "",
      kmh: "",
      minkm: "",
      mih: "",
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
      <section className="flex flex-col">
        {unitFrom === "minkm" || unitFrom === "minmi" ? (
          <>
            <Input
              className="w-60 my-2"
              id="minutes"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              type="number"
              placeholder="minutes"
            ></Input>
            <Input
              className="w-60 my-2"
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
              className="w-60"
              value={speedPerHour}
              onChange={e => setspeedPerHour(e.target.value)}
              id="ph-time"
              type="number"
              placeholder="8.5"
            ></Input>
          </>
        ) : null}
        <Select onValueChange={handleUnitChange}>
          <SelectTrigger className="w-60 my-2">
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
          className="bg-slate-800 text-white hover:bg-slate-900 my-2"
          onClick={triggerConversion}
        >
          Convert
        </Button>
      </section>
      {conversionResults ? (
        <>
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
        </>
      ) : null}
    </>
  );
};
