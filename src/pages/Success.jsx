import axios from "axios";
import React, { useEffect } from "react";

export default function Success() {
  const getUserDat = async () => {
    await axios
      .get("https://api.bevinzey.com/auth/google")
      .then((res) => {
        console.log("res :");
      });
  };

  useEffect(() => {
    getUserDat();
  }, []);
  return (
    <div>
      <h2> Hello World</h2>
    </div>
  );
}
