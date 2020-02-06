import React, { Fragment, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from "reactstrap";
import { images } from "../../assets/images";
import { formatDate } from "../../utils/utils";

const ExpenseList = props => {
  const { data, onDeleteTransaction } = props;
  const [isModalOpen, toggleModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteIconClick = (index, type, amount) => {
    const selectedItem = {
      index,
      type,
      amount
    };
    setSelectedItem(selectedItem);
    toggleModal(true);
  };

  const handleConfirmDelete = () => {
    const { index, type, amount } = selectedItem;
    onDeleteTransaction(index, type, amount);
    toggleModal(false);
  };
  return (
    <Fragment>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <Row key={index} className="expense-list-item">
              <Col xs="4">
                <ul className="transaction-amount-ul">
                  <li className="fnt-10">
                    {formatDate(new Date(item.transactionDate), "dd.mm.yyyy")}
                  </li>
                  <li
                    className={`transaction-amount ${
                      item.type === "credit" ? "text-success" : "text-danger"
                    }`}
                  >
                    {item.amount} Kc
                  </li>
                </ul>
              </Col>
              <Col
                xs="4"
                className="text-center d-flex align-items-end justify-content-center"
              >
               <span className="description-elipsis" id={`UncontrolledTooltip-${index}`}>
                {item.description}
              </span>
              <UncontrolledTooltip placement="top" target={`UncontrolledTooltip-${index}`}>
               {item.description}
              </UncontrolledTooltip>
              </Col>
              <Col
                xs="4"
                className="text-right d-flex align-items-center justify-content-end"
              >
                <img
                  alt="trashIcon"
                  className="trash-icon"
                  src={images.trashIcon}
                  onClick={() =>
                    handleDeleteIconClick(index, item.type, item.amount)
                  }
                />
              </Col>
            </Row>
          );
        })
      ) : (
        <div className="full-height d-flex align-items-center justify-content-center">
          <h4>No records found</h4>
        </div>
      )}
      {/* Delete transaction modal */}
      <Modal isOpen={isModalOpen} toggle={() => toggleModal(false)}>
        <ModalHeader toggle={() => toggleModal(false)}>
          Delete Transaction
        </ModalHeader>
        <ModalBody>
          <p>Are you sure want to delete the transaction?</p>
          <ModalFooter>
            <Button color="success" onClick={handleConfirmDelete}>
              Yes
            </Button>{" "}
            <Button color="danger" onClick={() => toggleModal(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ExpenseList;
