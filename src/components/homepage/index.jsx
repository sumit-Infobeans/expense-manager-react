import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

// Components
import ExpenseModal from "./ExpenseModal";
import Header from "./BalanceHeader";
import ExpenseList from "./ExpenseList";

// Utils
import { retrieveData, setDataToLocal } from "../../utils/storageUtil";
import { initialData } from "../../utils/staticData"

// Css files
import "../../assets/css/homepage.css";

const HomePage = () => {
  const [isModalOpen, toggleModal] = useState(false);
  const [addModalType, setModalType] = useState("credit");
  const [income, setIncome] = useState(0);
  const [spendings, setSpendings] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    let totalIncome = 0;
    let totalSpendings = 0;
    let transactionList = JSON.parse(retrieveData("data")) || [];
    if(transactionList.length == 0) {
      transactionList = initialData
    }
    setData(transactionList);
    if (transactionList.length) {
      // Get total income
      totalIncome = transactionList.reduce(function(total, currentValue) {
        if (currentValue.type === "credit") {
          return Number(total) + Number(currentValue.amount);
        }
        return Number(total);
      }, 0);
      // Get total spendings
      totalSpendings = transactionList.reduce(function(total, currentValue) {
        if (currentValue.type === "debit") {
          return Number(total) + Number(currentValue.amount);
        }
        return Number(total);
      }, 0);
    }
    setIncome(totalIncome);
    setSpendings(totalSpendings);
  }, []);

  const onOpenModal = type => {
    setModalType(type);
    toggleModal(true);
  };

  const addTransaction = values => {
    const formData = { ...values, type: addModalType };
    const existingData = [...data];
    existingData.push(formData);
    existingData.sort(function(a, b) {
      return new Date(a.transactionDate) - new Date(b.transactionDate);
    });
    setData(existingData);
    setDataToLocal("data", JSON.stringify(existingData));

    let totalIncome = income;
    let totalSpendings = spendings;

    if (addModalType === "credit") {
      totalIncome = Number(totalIncome) + Number(formData.amount);
    } else {
      totalSpendings = Number(totalSpendings) + Number(formData.amount);
    }

    // component state manipulation
    if (addModalType === "credit") {
      setIncome(totalIncome);
    } else {
      setSpendings(totalSpendings);
    }
  };

  const onDeleteTransaction = (index, type, amount) => {
    const existingData = [...data];
    existingData.splice(index, 1);
    setData(existingData);
    setDataToLocal("data", JSON.stringify(existingData));

    if (type === "credit") {
      let totalIncome = income || 0;
      totalIncome = Number(totalIncome) - Number(amount);
      setIncome(totalIncome);
    } else {
      let totalSpendings = spendings || 0;
      totalSpendings = Number(totalSpendings) - Number(amount);
      setSpendings(totalSpendings);
    }
  };

  return (
    <Container className="no-horizontal-padding" fluid={true}>
      <Header income={income} spendings={spendings} />
      <ExpenseModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        modalType={addModalType}
        addTransaction={addTransaction}
      />
      <Row className="expense-list-container no-horizontal-margin">
        <Col xs="12">
          <ExpenseList data={data} onDeleteTransaction={onDeleteTransaction} />
        </Col>
      </Row>
      <Row className="mt-15 no-horizontal-margin">
        <Col xs="6" sm="6" md={{ size: 4, offset: 2 }} className="text-right">
          <button
            className="add-buttons add-income-color"
            onClick={() => onOpenModal("credit")}
          >
            Add Income
          </button>
        </Col>
        <Col xs="6" sm="6" md={{ size: 4 }}>
          <button
          className="add-buttons add-spending-color"
            onClick={() => onOpenModal("debit")}
          >
            Add Spending
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
