import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useUser } from '../../contexts/UserContext';

const SPECIALIZATION_OPTIONS = {
  admin: ['standard_admin', 'super_admin'],
  therapist: ['art', 'music']
};

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
  background-color: ${props => props.approved === 'true' ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.approved === 'true' ? '#166534' : '#991b1b'};
`;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { user: currentUser } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecializationChange = async (userId, newSpecialization) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users/${userId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ specialization: newSpecialization }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update specialization');
      }

      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, specialization: newSpecialization }
          : user
      ));
    } catch (err) {
      console.error('Error updating specialization:', err);
      setError(err.message);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users/${userId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, approved: newStatus }
          : user
      ));
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error updating user status:', err);
      setError(err.message);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await handleStatusChange(userToDelete.id, false);
  };

  const handleReactivateClick = async (user) => {
    await handleStatusChange(user.id, true);
  };

  if (loading) {
    return <LoadingMessage>Loading users...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <UsersContainer>
      <Table>
        <thead>
          <tr>
            <Th>Username</Th>
            <Th>Name</Th>
            <Th>Position</Th>
            <Th>Specialization</Th>
            <Th>Status</Th>
            <Th>Created At</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>{user.username || 'No username'}</Td>
              <Td>{`${user.firstname} ${user.lastname}`}</Td>
              <Td>{user.position_title}</Td>
              <Td>
                <Select
                  value={user.specialization}
                  onChange={(e) => handleSpecializationChange(user.id, e.target.value)}
                >
                  {SPECIALIZATION_OPTIONS[user.position_title]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                <StatusBadge approved={String(user.approved)}>
                  {user.approved ? 'Approved' : 'Not Approved'}
                </StatusBadge>
              </Td>
              <Td>{format(new Date(user.created_at), 'MMM d, yyyy HH:mm')}</Td>
              <Td>
                {user.approved ? (
                  <ActionButton 
                    onClick={() => handleDeleteClick(user)}
                    $disabled={user.id === currentUser.id}
                    title={
                      user.id === currentUser.id 
                        ? "You cannot deactivate your own account" 
                        : "Deactivate user"
                    }
                  >
                    Deactivate
                  </ActionButton>
                ) : (
                  <ActionButton 
                    onClick={() => handleReactivateClick(user)}
                    $reactivate
                    title="Reactivate user"
                  >
                    Reactivate
                  </ActionButton>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {deleteModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Confirm Deactivation</h3>
            <p>
              Are you sure you want to deactivate {userToDelete?.username}? 
              The user's approved status will be set to false, and the user will no longer be able to place orders.
            </p>
            <ModalButtons>
              <ModalButton onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton $primary onClick={handleDeleteConfirm}>
                Deactivate
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </UsersContainer>
  );
}
