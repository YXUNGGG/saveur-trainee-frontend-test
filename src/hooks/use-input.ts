import { useState } from "react";

export function useInput(initialValue?: string) {
  const [value, setValue] = useState<string>(initialValue ?? "");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clear = () => setValue("");

  return {
    value,
    clear,
    setValue,
    onChange
  };
}
