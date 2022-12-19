import React from "react";
import { useEffect, useState } from "react";
import { getPointsEarned, getMonthString } from "../../utils/RetailRewards";
import { getCustomers, getACustomerTransactions } from "../../apis/Api";
import InputFilter from "../Input/InputFilter/InputFilter";
import Config from "../../configs/config.json";

function CustomerByMonth() {
  const [customersData, setCustomersData] = useState([]);
  const [pointsByCustomer, setPointsByCustomer] = useState([]);
  const [monthToFilter, setMonthToFilter] = useState("");

  useEffect(() => {
    // getCustomers()
    //   .then((response) => response.json())
    //   .then((data) => setCustomersData(data));

    async function fetchCustomerData() {
      try {
        const response = await getCustomers();
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Could not get customer data: ${error}`);
      }
    }
    fetchCustomerData().then((data) => setCustomersData(data));
  }, []);

  /**
   * @param {object} customersData
   * gets and sets the customer with total points and pointsByMonth
   */
  function getCustomerByMonth(customersData) {
    const custResult = Promise.all(
      customersData.map(async (customer) => {
        return await getACustomerTransactions(customer.custId)
          .then((response) => response.json())
          .then((data) => {
            const totalPoints = data.reduce((acc, curr) => {
              acc = acc + getPointsEarned(curr.amount);
              return acc;
            }, 0);
            const pointsByMonth = data.reduce((acc, curr) => {
              let month = getMonthString(curr["date"].split("-")[0]);
              if (acc[month]) {
                //add curr to monthly total
                acc[month] = acc[month] + getPointsEarned(curr.amount);
              } else {
                //create a new month property to store monthly points earned
                acc[month] = getPointsEarned(curr.amount);
              }
              return acc;
            }, {});
            return {
              custId: customer.custId,
              totalPoints: totalPoints,
              pointsByMonth: pointsByMonth,
            };
          })
          .catch((err) => console.log("customersData error: ", err));
      })
    );
    custResult.then((data) => setPointsByCustomer(data));
  }

  /**
   * @param {e} - event handler
   * @param {text} - input from child component
   * sets the month to filter
   */
  function handleInputSubmit(e, text) {
    e.preventDefault();
    if (text) {
      setMonthToFilter(text[0].toUpperCase() + text.slice(1));
    }
  }
  useEffect(() => {
    getCustomerByMonth(customersData);
  }, [customersData]);

  const { customerId, monthlyPoints, totalPoints } =
    Config.CustomerByMonth.customerByMonthTable;
  return (
    <>
      <h4>{Config.CustomerByMonth.title}</h4>
      <InputFilter
        handleInputSubmit={handleInputSubmit}
        labelText={Config.CustomerByMonth.monthLabelText}
        placeHolderText={Config.CustomerByMonth.monthInputPlaceholderText}
      />
      <table>
        <thead>
          <tr>
            <th>{customerId}</th>
            <th>{monthlyPoints}</th>
            <th>{totalPoints}</th>
          </tr>
        </thead>
        <tbody>
          {pointsByCustomer.length > 0 ? (
            pointsByCustomer.map((customer) => (
              <tr key={customer.custId}>
                <td>{customer.custId}</td>
                <td>{customer.pointsByMonth[monthToFilter] || 0}</td>
                <td>{customer.totalPoints}</td>
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

export default CustomerByMonth;
