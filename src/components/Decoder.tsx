import { useState } from "react";
import { DecodingResult, IEntry } from "../types/types";
import { Buffer } from "buffer";

interface DecoderProps {
  onDecode: (result: DecodingResult) => void;
}

const Decoder = (props: DecoderProps) => {
  const [encodedStr, setEncodedStr] = useState("");

  const handleMessageChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setEncodedStr(event.currentTarget.value);
  };

  const decode = (base64str: string) => {
    try {
      const decoded = Buffer.from(base64str, "base64").toString("utf8");
      props.onDecode({
        error: "",
        decoded: JSON.parse(decoded) as IEntry[],
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.name : "Unknown error.";
      props.onDecode({
        error: errorMsg,
        decoded: null,
      });
    }
  };
  return (
    <div>
      <div className="entry-tip">Paste the encoded entries.</div>
      <textarea value={encodedStr} onChange={handleMessageChange} />
      <div
        className="button md-button highlight-button"
        onClick={() => decode(encodedStr)}
      >
        Start game
      </div>
    </div>
  );
};

export default Decoder;
