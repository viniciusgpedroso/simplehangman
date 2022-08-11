import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IEntry } from "../types/types";
import { Buffer } from "buffer";
import Entry from "./Entry";

const CreatePage = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<IEntry[]>([getEmptyEntry()]);
  const [copied, setCopied] = useState(false);

  const onChange = (index: number, entry: IEntry) => {
    const newEntries = entries.map((e, i) => {
      if (index === i) return entry;
      else return e;
    });
    setEntries(newEntries);
  };

  const copyEncodedToClipboard = () => {
    navigator.clipboard.writeText(createBase64JSON(entries));
    setCopied(true);
  };

  return (
    <div className="page">
      <div className="main-area extra-padding">
        <div className="entry-header">Entries</div>
        <div className="entry-tip">
          Fill entries with words and categories. Hints are optional.
        </div>
        {entries.map((e, i) => (
          <Entry key={i} index={i} onChange={onChange} />
        ))}
        <div
          className="button md-button"
          onClick={() => setEntries((prev) => [...prev, getEmptyEntry()])}
        >
          Add entry
        </div>
        <div
          className="button md-button highlight-button"
          onClick={copyEncodedToClipboard}
        >
          {copied ? "Copied!" : "Create"}
        </div>
        {copied && (
          <div className="button md-button" onClick={() => navigate("/play")}>
            PLAY!
          </div>
        )}
      </div>
    </div>
  );
};

const getEmptyEntry = (): IEntry => {
  return { words: "", category: "", hint: "" };
};

const createBase64JSON = (entries: IEntry[]): string => {
  const processedEntries = entries.reduce<IEntry[]>((acc, entry) => {
    const words = entry.words.toUpperCase().trim();
    const category = entry.category.toLocaleUpperCase().trim();
    const hint = entry.hint.toLocaleUpperCase().trim();
    if (words.length > 0 && category.length > 0) {
      acc.push({
        words,
        category,
        hint,
      });
    }
    return acc;
  }, []);
  const entriesJSON = JSON.stringify(processedEntries);
  return Buffer.from(entriesJSON, "utf8").toString("base64");
};

export default CreatePage;
