type propsTypes = {
  itemKey: number;
  index: number;
  setIsFrozen: (index: number, itemKey: number) => void;
  isFrozen: {[index: number]: number};
};


export default function Die({ itemKey, setIsFrozen, isFrozen, index }: propsTypes) {
  return (
    <button
      className={`py-2 px-4 rounded text-center ${
        Object.keys(isFrozen).includes(index.toString())
          ? "bg-green-400 bg-opacity-80"
          : "bg-whtie"
      } text-black font-bold text-3xl max-w-fit max-h-fit shadow-sm  shadow-black  max-sm:min-w-fit max-sm:text-lg`}
      onClick={() => setIsFrozen(index, itemKey)}
    >
      {itemKey}
    </button>
  );
}
