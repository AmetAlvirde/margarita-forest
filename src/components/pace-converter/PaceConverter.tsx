import { Input } from "../ui/input";
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
  return (
    <>
      <section className="flex">
        <Input type="string" placeholder="05:30"></Input>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={from} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minkm">min/km</SelectItem>
            <SelectItem value="minmi">min/mi</SelectItem>
            <SelectItem value="kph">Kph</SelectItem>
            <SelectItem value="miph">Miph</SelectItem>
          </SelectContent>
        </Select>
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
