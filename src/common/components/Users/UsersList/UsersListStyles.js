import styled from 'styled-components';

const UsersContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
  background-color: #f8fafc;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => {
    if (props.$disabled) return '#cbd5e1';
    return props.$reactivate ? '#059669' : '#ef4444';
  }};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? '0.7' : '1'};
  &:hover {
    background-color: ${props => {
      if (props.$disabled) return '#cbd5e1';
      return props.$reactivate ? '#047857' : '#dc2626';
    }};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 100%;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: none;
  ${props => props.$primary ? `
    background-color: #ef4444;
    color: white;
    &:hover {
      background-color: #dc2626;
    }
  ` : `
    background-color: #e2e8f0;
    &:hover {
      background-color: #cbd5e1;
    }
  `}
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.$approved ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.$approved ? '#166534' : '#991b1b'};
`;

export {
  UsersContainer,
  Table,
  Th,
  Td,
  Select,
  ActionButton,
  ModalOverlay,
  ModalContent,
  ModalButtons,
  ModalButton,
  ErrorMessage,
  LoadingMessage,
  StatusBadge
};