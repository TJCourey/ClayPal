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
  console.log(data);
  let percent = 0;
  userData.skeetScore.forEach((element) => {
    console.log(element);

    percent += parseFloat(element.overallScore);
    console.log("total", percent);
  });
  const averagePercentage = percent / userData.skeetScore.length;

  console.log(averagePercentage, "average");

  return (
    <React.Fragment>
      <Title>Average Percentage</Title>
      <Typography component="p" variant="h2">
        {averagePercentage}
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
