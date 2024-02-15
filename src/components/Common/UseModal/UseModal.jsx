import { Modal } from "antd";
import { bool, func, node, number, string } from "prop-types";
import { useDispatch } from "react-redux";

const UseModal = ({
  children,
  modalTitle,
  isModalOpen,
  setIsModalOpen,
  modalWidth,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={() => dispatch(setIsModalOpen(false))}
      onCancel={() => dispatch(setIsModalOpen(false))}
      centered
      footer={null}
      width={modalWidth}
    >
      {children}
    </Modal>
  );
};

UseModal.propTypes = {
  children: node,
  modalTitle: string,
  isModalOpen: bool,
  setIsModalOpen: func,
  modalWidth: number,
};

export default UseModal;
