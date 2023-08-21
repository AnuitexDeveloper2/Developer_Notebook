function pick<T extends Record<string, string | number>, K extends keyof T>(
  obj: T,
  ...key: Array<K>
) {
  const result = key.map((item) => ({ [item]: obj[item] }));

  return Object.assign({},...result)
}


type Person  = {
  name?: string;
  lastName: string;
  age: number;
  city: string;
}

export default function show() {
  const person: Person = {
    name: "John",
    lastName: "Doe",
    age: 35,
    city: "London",
  };

  const picked = pick(person, "name", "age", "city");
  return <div>{JSON.stringify(picked)}</div>;
}
