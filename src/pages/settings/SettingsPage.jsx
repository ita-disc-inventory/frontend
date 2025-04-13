import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Title, Subtitle } from 'common/components/Text';
import { useUser } from 'common/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PasswordChangeForm from 'common/components/PasswordChangeForm';
import PropTypes from 'prop-types';
import NewAdmin from 'common/components/admin_modals/NewAdmin';

const SettingsPage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;
const AddAdminButton = styled.button`
  background-color: var(--newadmin-purple);
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldLabel = styled.h1`
  font-size: 14px;
  color: #555;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const FieldValue = styled.div`
  font-size: 16px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
`;

const FieldDropdown = styled.select`
  font-size: 16px;
  padding: 0.5rem;
  border: 1px solid #000000;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
`;

const ChangePasswordButton = styled.button`
  color: #0069ff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  align-self: center;
`;

const LogoutButton = styled.button`
  background-color: #f66e6f;
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;
const UpdateButton = styled.button`
  background-color: rgb(21, 33, 244);
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Add some space between the checkboxes */
`;

export const SingleSelectDropdown = ({ options, selectedOption, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FieldDropdown value={selectedOption} onChange={handleChange}>
      <option value='' disabled>
        Select an option
      </option>
      {Object.keys(options).map((option) => (
        <option key={option} value={option}>
          {options[option]}
        </option>
      ))}
    </FieldDropdown>
  );
};
SingleSelectDropdown.propTypes = {
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function AdminSettings() {
  const { user, logout } = useUser();
  const [specialization, setSpecialization] = useState('');
  const [showNewAdminPopup, setshowNewAdminPopup] = useState(false);
  const therapistMap = {
    art: 'Art Therapy',
    dance: 'Dance / Movement Therapy',
    drama: 'Drama Therapy',
    music: 'Music Therapy',
  };
  useEffect(() => {
    if (user && user.specialization) {
      setSpecialization(user.specialization);
    }
  }, [user]);

  const navigate = useNavigate();
  const handlePasswordChange = () => {
    navigate('/forgot-password');
  };
  const handleAddAdminClick = () => {
    setshowNewAdminPopup(true);
  };
  const handleCloseNewAdminPopup = () => {
    setshowNewAdminPopup(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/therapist/${user.id}/specialization`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ specialization: specialization }),
        }
      );
      console.log(response);
      if (response.ok) {
        alert('Settings updated successfully');
      } else {
        alert('Failed to update settings');
      }
      setSpecialization('');

      navigate('/'); // Redirect to the admin page after successful update
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };
  console.log(user.position_title);

  return (
    <SettingsPage>
      <TextContainer>
        <Title>Account Settings</Title>
        <FieldLabel>Full Name</FieldLabel>
        <FieldValue>
          {user.firstname} {user.lastname}
        </FieldValue>
        <FieldLabel>Email</FieldLabel>
        <FieldValue>{user.email}</FieldValue>
        <FieldLabel>Role</FieldLabel>
        {user.position_title === 'therapist' ? (
          <FieldValue>Therapist</FieldValue>
        ) : (
          <FieldValue>Admin</FieldValue>
        )}
        <FieldLabel>Specialization</FieldLabel>

        {user.position_title === 'therapist' ? (
          <SingleSelectDropdown
            options={therapistMap}
            selectedOption={specialization}
            onChange={setSpecialization}
          />
        ) : user.specialization === 'standard_admin' ? (
          <FieldValue>Standard Admin</FieldValue>
        ) : user.specialization === 'super_admin' ? (
          <FieldValue>Super Admin</FieldValue>
        ) : (
          <FieldValue>{''}</FieldValue>
        )}
        {user.specialization === 'super_admin' && (
          <AddAdminButton onClick={handleAddAdminClick}>
            Add a admin
          </AddAdminButton>
        )}
        <ChangePasswordButton onClick={handlePasswordChange}>
          Change Password
        </ChangePasswordButton>
        {user.position_title === 'therapist' && (
          <UpdateButton onClick={handleUpdate}>Update Settings</UpdateButton>
        )}
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </TextContainer>
      {/* Render the NewAdminConfirm popup */}
      {showNewAdminPopup && (
        <NewAdmin
          open={true}
          onCancel={handleCloseNewAdminPopup} // Close the popup when the user clicks "Close"
          onConfirm={async (adminData) => {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(adminData),
                  credentials: 'include',
                }
              );

              if (response.ok) {
                alert('Admin created successfully');
              } else {
                const errorData = await response.json();
                alert(
                  `Failed to create admin: ${errorData.error || 'Unknown error'}`
                );
              }
            } catch (error) {
              console.error('Error creating admin:', error);
            } finally {
              // Close the popup after the operation
              handleCloseNewAdminPopup();
            }
          }}
        />
      )}
    </SettingsPage>
  );
}
