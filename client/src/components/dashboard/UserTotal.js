import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useQuery } from "@apollo/client";
import { QUERY_USERNAME } from "../../utils/queries";

function preventDefault(event) {
  event.preventDefault();
}
//Dont really know whats going on
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function UserTotal() {
  const classes = useStyles();

  const { loading, data } = useQuery(QUERY_USERNAME);
  const userData = data?.user || {};
  console.log(data);
  let percent = 0;
  let averagePercentage = 0;
  let percentage = 0;
  if (loading) {
    return <> Loading...</>;
  }
  if (userData && userData.skeetScore) {
    userData.skeetScore.forEach((element) => {
      console.log(element);
      percent += parseFloat(element.overallScore);
      console.log("total", percent);
    });
  }
  // averagePercentage = percent / userData.skeetScore.length;
  // percentage = averagePercentage.toFixed(2);
  if (userData && userData.trapScore) {
    userData.trapScore.forEach((element) => {
      console.log(element);
      percent += parseFloat(element.overallScore);
      console.log("total", percent);
    });
  }
  averagePercentage =
    percent / (userData.trapScore.length + userData.skeetScore.length);
  percentage = averagePercentage.toFixed(2);
  console.log(averagePercentage, "average");

  return (
    <React.Fragment>
      <Title>Average Hits per Round</Title>
      <Typography component="p" variant="h2">
        {percentage}
        {/* $3,024.00 */}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {/* on 15 March, 2019 */}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Shoots
        </Link>
      </div>
    </React.Fragment>
  );
}
