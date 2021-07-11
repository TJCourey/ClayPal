import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Title from "./Title";
import { useQuery } from "@apollo/client";
import { QUERY_USERNAME } from "../../utils/queries";
import moment from "moment";
//Generate the average
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

let data2 = [];

export default function Chart() {
  const theme = useTheme();

  const { loading, data } = useQuery(QUERY_USERNAME);
  const userData = data?.user || [];
  console.log(data);
  data2 = [];
  let percent = 0;
  if (loading) {
    return <>Loading...</>;
  }
  userData.skeetScore.forEach((element) => {
    console.log(element);

    data2.push(createData(element.date, element.overallScore));
    percent = element.overallScore / 25;
    console.log(percent);
  });
  userData.trapScore.forEach((element) => {
    console.log(element);

    data2.push(createData(element.date, element.overallScore));
    percent = element.overallScore / 25;
    console.log(percent);
  });
  // createData("00:00", 0),
  // createData("03:00", 300),
  // createData("06:00", 600),
  // createData("09:00", 800),
  // createData("12:00", 1500),
  // createData("15:00", 2000),
  // createData("18:00", 2400),
  // createData("21:00", 2400),
  // createData("24:00", undefined),

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data2}
          margin={{
            top: 10,
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
              {/* Score */}
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <CartesianGrid stroke="#ccc" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
