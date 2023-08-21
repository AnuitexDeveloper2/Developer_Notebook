import React, { useState } from "react";

interface Checkboxes {
  [key: string]: boolean;
}

const generatInitialCheckboxes = (itemsCount: number) => {
  const form = Array.from(Array(itemsCount), (_, idx) => ({
    [`Test #${idx + 1}`]: Boolean(Math.floor(Math.random() * 2)),
  }));

  return form.reduce((acc, item) => ({ ...acc, ...item }), {});
};

// Problem statement:
// Given a component consisting of 3 checkboxes and a button.
// The task is to implement the functionality of the button,
// which will change according to the following conditions:

// - If one or more checkboxes are not selected (checked: false),
// then when the button is clicked, all unselected checkboxes become selected.
// - If all checkboxes are selected (checked: true),
// then when the button is clicked, all checkboxes become unselected.

const initialCheckboxes: Checkboxes = generatInitialCheckboxes(3);

export default function CheckboxesApp() {
  const [checkboxes, setCheckboxes] = useState<Checkboxes>(initialCheckboxes);
  const isAllSelected = Object.values(checkboxes).every((item) => item);
  const changeValue = (key: string, value: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [key]: value }));
  };

  function intersect(a: Array<any>, b: Array<any>) {
    const set = new Set(a);

    return b.filter((item) => set.has(item));
  }

  const handleButtonClick = () => {
    const newCheckboxes = Object.keys(checkboxes).reduce((acc, item) => {
      acc[item] = isAllSelected ? false : true;
      return acc;
    }, {});
    console.log(intersect([1, 2, 3, 4, 5], [1, 10, 20]));

    setCheckboxes(newCheckboxes);
  };

  return (
    <>
      <button onClick={handleButtonClick}>
        {isAllSelected ? "Unselect All" : "Select All"}
      </button>
      <p />
      {Object.entries(checkboxes).map(([key, value]) => (
        <Checkbox
          key={key}
          checked={value}
          name={key}
          onChange={(ev) => changeValue(key, ev.target.checked)}
        />
      ))}
    </>
  );
}

interface Props {
  name: string;
  checked: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<Props> = ({ name, checked, onChange }) => (
  <>
    <div>{name}</div>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
  </>
);

React.memo(Checkbox);
