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
export const PaceConverter = ({
  from = "minkm",
  withPredictions = true,
}: PaceConverterType) => {
  const [unitFrom, setUnitFrom] = useState(from);
  function doConversions() {}
  return (
    <>
      <section className="flex">
        {unitFrom === "minkm" ? (
          <>
            <Input type="number" placeholder="minutes"></Input>
            <Input type="number" placeholder="seconds"></Input>
          </>
        ) : null}
        {unitFrom === "minmi" ? (
          <>
            <Input type="number" placeholder="minutes"></Input>
            <Input type="number" placeholder="seconds"></Input>
          </>
        ) : null}
        {unitFrom === "kph" ? (
          <>
            <Input type="number" placeholder="kph"></Input>
          </>
        ) : null}
        {unitFrom === "miph" ? (
          <>
            <Input type="number" placeholder="kph"></Input>
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
          <SelectContent>
            <SelectItem value="minkm">min/km</SelectItem>
            <SelectItem value="minmi">min/mi</SelectItem>
            <SelectItem value="kph">Kph</SelectItem>
            <SelectItem value="miph">Miph</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={doConversions}
          className="bg-slate-800 text-white hover:bg-slate-900"
        >
          Convert
        </Button>
      </section>
      <Separator
        className="bg-gray-300 my-4"
        orientation="horizontal"
      ></Separator>
      <section>
        <ul>
          <li>
            <span className="text-2xl px-2 font-semibold">08:51</span>
            <span className="italic">min/mi</span>
          </li>
        </ul>
      </section>
      {withPredictions ? (
        <section>
          <h2 className="text-3xl">Race predictions</h2>
          <ul>
            <li>
              <span className="text-2xl px-2 font-semibold">08:51</span>
              <span className="italic">min/mi</span>
            </li>
            <li>
              <span className="text-2xl px-2 font-semibold">08:51</span>
              <span className="italic">min/mi</span>
            </li>
            <li>
              <span className="text-2xl px-2 font-semibold">08:51</span>
              <span className="italic">min/mi</span>
            </li>
          </ul>
        </section>
      ) : (
        <a>See race predictions with this pace</a>
      )}
    </>
  );
};
