import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const avg = (good + -1 * bad) / total;
  const post = (good / total) * 100;
  return (
    <table>
      <tbody>
        <StatisticsLine value={good}>Good</StatisticsLine>
        <StatisticsLine value={neutral}>neutral</StatisticsLine>
        <StatisticsLine value={bad}>bad</StatisticsLine>
        {total ? <StatisticsLine value={total}>all</StatisticsLine> : ""}
        {avg ? <StatisticsLine value={avg}>average</StatisticsLine> : ""}
        {post ? <StatisticsLine value={post}>positive</StatisticsLine> : ""}
      </tbody>
    </table>
  ); value={}
};

export default Statistics;
