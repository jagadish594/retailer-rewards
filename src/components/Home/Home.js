import React from "react";
import TransactionList from "../Transactions/TransactionList";
import CustomerByMonth from "../Customer/CustomerByMonth";
import Config from "../../configs/config.json";

function Home() {
  return (
    <>
      <h3>{Config.Home.title}</h3>
      <TransactionList />
      <CustomerByMonth />
    </>
  );
}

export default Home;
