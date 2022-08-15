import { useEffect, useState } from 'react';
import { IEntry } from '../types/types';

interface EntryProps {
  index: number;
  onChange: (index: number, entry: IEntry) => void;
}

const Entry = (props: EntryProps) => {
  const [entry, setEntry] = useState<IEntry>({
    w: '',
    c: '',
    h: '',
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
          value={entry.w}
          onChange={(e) => handleInputChange(e, 'w')}
          maxLength={50}
          required
        ></input>
        <input
          className="entry"
          type="text"
          name="category"
          placeholder="category"
          value={entry.c}
          onChange={(e) => handleInputChange(e, 'c')}
          maxLength={30}
          required
        ></input>
        <input
          className="entry"
          type="text"
          name="hint"
          placeholder="hint"
          value={entry.h}
          onChange={(e) => handleInputChange(e, 'h')}
          maxLength={100}
        ></input>
      </div>
      <div className="entry-separator"></div>
    </div>
  );
};

export default Entry;
