import React from "react";

const ParseData: React.FC = () => {
    const dataSchema = {
      id: "number",
      name: "string",
      age: "number",
      createdAt: "number",
    };

    const dataStr =
      "1,Basia Crawford,70,1672177486000,2,Melvin Dickson,29,1696294245000,3,Jemima Mccray,74,1713660169000,4,Quynn Sosa,80,1685097548000,5,Maile Martinez,29,1708411935000,6,Kristen Burton,28,1722364810000,7,Flynn Tillman,65,1690021251000,8,Chase Lowe,68,1703436348000,9,Mark Lucas,38,1689540417000,10,Darius Dyer,41,1677662996000";

    function parseData(input: string, schema: any) {
      // const parsedSchema = Object.entries(schema);
      // const items = input.split(',');
      // const result = [];

      // for (let i = 0; i < items.length; i += parsedSchema.length) {
      //   const itemData = {};

      //   for (let j = 0; j < parsedSchema.length; j++) {
      //     const [fieldName, fieldType] = parsedSchema[j];
      //     const fieldValue = items[i + j];

      //     if (fieldType === "number") {
      //       itemData[fieldName] = parseInt(fieldValue);
      //     } else {
      //       itemData[fieldName] = fieldValue;
      //     }
      //   }

      //   result.push(itemData);
      // }

      // return result;
      const parsedString = input.split(",");
      const parsedSchema = Object.entries(schema);

      const result = [];
      while (parsedString.length > 0) {
        const el = parsedSchema.reduce((acc, item) => {
          const element = parsedString.shift();
          const value = item[1] === "number" ? Number(element) : element;
          acc[item[0]] = value;
          return acc;
        }, {});
        result.push(el);
      }
      return result;
    }

    const result = parseData(dataStr, dataSchema);
    console.log(result);
    
    /*
    Result example:
    [
        {
            id: 1,
            name: "Basia Crawford",
            age: 70,
            createdAt: 1672177486000
        },
        ...
    ]
    */
  return <div></div>;
};

export default ParseData;
