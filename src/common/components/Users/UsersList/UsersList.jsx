import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useUser } from 'common/contexts/UserContext';
import {
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
  StatusBadge,
} from './UsersListStyles';
const SPECIALIZATION_OPTIONS = {
  admin: ['standard_admin', 'super_admin'],
  therapist: ['art', 'music', 'dance', 'drama'],
};

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

      setUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, specialization: newSpecialization }
            : user
        )
      );
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

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, approved: newStatus } : user
        )
      );
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
                  onChange={(e) =>
                    handleSpecializationChange(user.id, e.target.value)
                  }
                >
                  {SPECIALIZATION_OPTIONS[user.position_title]?.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </Select>
              </Td>
              <Td>
                <StatusBadge $approved={user.approved}>
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
                        ? 'You cannot deactivate your own account'
                        : 'Deactivate user'
                    }
                  >
                    Deactivate
                  </ActionButton>
                ) : (
                  <ActionButton
                    onClick={() => handleReactivateClick(user)}
                    $reactivate
                    title='Reactivate user'
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
              Are you sure you want to deactivate {userToDelete?.username}? The
              user's approved status will be set to false, and the user will no
              longer be able to place orders.
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
