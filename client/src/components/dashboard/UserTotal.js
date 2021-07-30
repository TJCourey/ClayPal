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
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function UserTotal() {
  const classes = useStyles();

  const { loading, data } = useQuery(QUERY_USERNAME);
  const userData = data?.user || {};
  let percent = 0;
  let averagePercentage = 0;
  let percentage = 0;
  if (loading) {
    return <> Loading...</>;
  }
  if (userData && userData.skeetScore) {
    userData.skeetScore.forEach((element) => {
      percent += parseFloat(element.overallScore);
    });
  }
  if (userData && userData.trapScore) {
    userData.trapScore.forEach((element) => {
      percent += parseFloat(element.overallScore);
    });
  }
  if (userData && (userData.skeetScore || userData.trapScore)) {
    averagePercentage =
      percent / (userData.trapScore.length + userData.skeetScore.length);
    percentage = averagePercentage.toFixed(2);
  }
  return (
    <React.Fragment>
      <Title>Average Hits per Round</Title>
      <Typography component="p" variant="h2">
        {percentage}
      </Typography>
      <Typography
        color="textSecondary"
        className={classes.depositContext}
      ></Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Shoots
        </Link>
      </div>
    </React.Fragment>
  );
}
