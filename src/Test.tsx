import React from 'react';

const Test = () => {
  const ex = [1, 1, 2, 3, 10, 4, 10, 10, 5, 1, 2, 3, 4, 5, 5, 5, 5, 5];

  console.log(typeof [...new Set(ex.sort((a, b) => b - a))]);

  //   console.log(
  //     ex
  //       .reduce((agg, item) => {
  //         const index = agg.findIndex((f) => f.key === item);
  //         if (index === -1) {
  //           agg.push({ key: item, count: 1 });
  //         } else {
  //           agg[index].count = agg[index].count + 1;
  //         }
  //         return agg;
  //       }, Array<{ key: number; count: number }>())
  //       .sort((a: any, b: any) => b.count - a.count)
  //       .map((a) => a.key),
  //   );

  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }

  let anyValue: any = 1;
  let unknownValue: unknown = 1;
  

  return <div style={{ marginTop: '200px' }}>Hello</div>;
};

export default Test;
