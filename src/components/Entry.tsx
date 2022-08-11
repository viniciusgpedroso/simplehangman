import { useEffect, useState } from "react";
import { IEntry } from "../types/types";

interface EntryProps {
  index: number;
  onChange: (index: number, entry: IEntry) => void;
}

const Entry = (props: EntryProps) => {
  const [entry, setEntry] = useState<IEntry>({
    words: "",
    category: "",
    hint: "",
  });

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>,
    value: keyof IEntry
  ) => {
    const inpt = event.currentTarget.value;
    setEntry((prev) => {
      return { ...prev, [`${value}`]: inpt };
    });
  };

  useEffect(() => {
    props.onChange(props.index, entry);
  }, [entry]);

  return (
    <div>
      <div className="create-entry">
        <input
          className="entry"
          type="text"
          name="word"
          placeholder="word(s)"
          value={entry.words}
          onChange={(e) => handleInputChange(e, "words")}
          maxLength={50}
          required
        ></input>
        <input
          className="entry"
          type="text"
          name="category"
          placeholder="category"
          value={entry.category}
          onChange={(e) => handleInputChange(e, "category")}
          maxLength={30}
          required
        ></input>
        <input
          className="entry"
          type="text"
          name="hint"
          placeholder="hint"
          value={entry.hint}
          onChange={(e) => handleInputChange(e, "hint")}
          maxLength={100}
        ></input>
      </div>
      <div className="entry-separator"></div>
    </div>
  );
};

export default Entry;
