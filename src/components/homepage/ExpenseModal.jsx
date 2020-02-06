import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from "reactstrap";
import { TextField } from "../../utils/formUtils";
import { formatDate } from "../../utils/utils";

const initialState = {
  amount: "",
  description: "",
  transactionDate: formatDate(new Date(), "yyyy-mm-dd")
};

const ExpenseModal = props => {
  const { isModalOpen, toggleModal, modalType, addTransaction } = props;
  const [state, setState] = useState(initialState);

  // To close the modal
  const closeModal = () => {
    toggleModal(false);
    setState(initialState);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const modifiedState = { ...state, [name]: value };
    setState(modifiedState);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    addTransaction(state);
    closeModal();
  };

  const title = modalType === "credit" ? "Add Income" : "Add Spending";
  const { amount, description, transactionDate } = state;
  return (
    <Modal backdrop="static" isOpen={isModalOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{title}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleFormSubmit}>
          <TextField
            required
            type="number"
            label="Amount"
            value={amount}
            placeholder="Enter amount"
            name="amount"
            onChange={handleChange}
          />
          <TextField
            required
            type="textarea"
            maxLength="150"
            label="Description"
            value={description}
            placeholder="Enter description"
            name="description"
            onChange={handleChange}
          />
          <TextField
            required
            type="date"
            label="Date"
            max={formatDate(new Date(), "yyyy-mm-dd")}
            value={transactionDate}
            placeholder="Enter date"
            name="transactionDate"
            onChange={handleChange}
          />
          <ModalFooter>
            <Button type="submit" color="success">
              Save
            </Button>{" "}
            <Button type="button" color="danger" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ExpenseModal;
