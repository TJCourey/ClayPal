import React from "react";
import { useQuery } from "@apollo/client";

import Home from "../components/Home";

import { QUERY_USER } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const profiles = data?.profiles || [];

  //   return (
  //     <main>
  //       <div className="flex-row justify-center">
  //         <div className="col-12 col-md-10 my-3">
  //           {loading ? (
  //             <div>Loading...</div>
  //           ) : (
  //             <ProfileList
  //               profiles={profiles}
  //               title="Here's the current roster of friends..."
  //             />
  //           )}
  //         </div>
  //       </div>
  //     </main>
  //   );
};

export default Home;
