import React from "react";
import { useEffect, useState } from "react";
import { getTransactions } from "../../apis/Api";
import { getPointsEarned } from "../../utils/RetailRewards";
import Config from "../../configs/config.json";

function TransactionList() {
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    getTransactions()
      .then((response) => response.json())
      .then((data) => setTransactionData(data));
  }, []);

  const { transactionId, date, time, customerId, amountUsd, pointsEarned } =
    Config.TransactionList.transactionListTable;

  return (
    <>
      <h4>{Config.TransactionList.title}</h4>
      <table>
        <thead>
          <tr>
            <th>{transactionId}</th>
            <th>{date}</th>
            <th>{time}</th>
            <th>{customerId}</th>
            <th>{amountUsd}</th>
            <th>{pointsEarned}</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.length > 0 ? (
            transactionData.map((transaction) => (
              <tr key={transaction.transId}>
                <td>{transaction.transId}</td>
                <td>{transaction.date}</td>
                <td>{transaction.time}</td>
                <td>{transaction.custId}</td>
                <td>{transaction.amount}</td>
                <td>{getPointsEarned(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{Config.LoadingText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TransactionList;
