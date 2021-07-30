import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useQuery } from "@apollo/client";
import { QUERY_USERNAME } from "../../utils/queries";

function createData(time, amount) {
  return { time, amount };
}

let data2 = [];

export default function Chart() {
  const theme = useTheme();

  const { loading, data } = useQuery(QUERY_USERNAME);
  if (loading) {
    return <>Loading...</>;
  }
  const userData = data?.user || [];

  data2 = [];
  if (userData && userData.skeetScore) {
    userData.skeetScore.forEach((element) => {
      data2.push(createData(element.date, element.overallScore));
    });
  }
  if (userData && userData.trapScore) {
    userData.trapScore.forEach((element) => {
      data2.push(createData(element.date, element.overallScore));
    });
  }

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data2}
          margin={{
            top: 5,
            right: 50,
            bottom: 0,
            left: 50,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis domain={[0, 25]} stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              {/* Sales ($) */}
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
