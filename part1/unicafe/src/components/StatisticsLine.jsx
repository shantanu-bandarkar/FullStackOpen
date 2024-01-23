import React from "react";

const StatisticsLine = ({ children, value }) => {
  return (
      <tr>
        <td>{children}</td>
        {children=='positive'? <td>{value}%</td> : <td>{value}</td>}
      </tr>
  );
};
export default StatisticsLine;
