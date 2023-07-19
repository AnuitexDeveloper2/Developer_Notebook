import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(1);
  console.log("Parent");

  return (
    <div style={{ marginTop: "200px" }}>
      Hello
      <button onClick={() => setCount(count + 1)}>Click</button>
      <div>
        <MemoChild props={count.toString()}/>
      </div>
    </div>
  );
};

export default Test;

const Child = ({ props }: { props: string }) => {
  console.log("Child");

  return <div>Child {props}</div>;
};

const MemoChild = React.memo(Child, (prev, next)=> {
  return true
});
