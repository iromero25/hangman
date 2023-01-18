import { ReactNode, createContext, useState } from "react";

export const CharsContext = createContext<{
  chars: string[];
  setChars: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  chars: [],
  setChars: () => [],
});

interface Props {
  children: ReactNode;
}

export const CharsContextProvider: React.FC<Props> = ({ children }) => {
  const [chars, setChars] = useState<string[]>([]);
  const value = { chars, setChars };
  return (
    <CharsContext.Provider value={value}>{children}</CharsContext.Provider>
  );
};
