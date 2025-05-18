import React, { useEffect, useState } from 'react';

import { Title } from 'common/components/form/Text';
import { useUser } from 'common/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewAdmin from 'common/components/admin_modals/NewAdmin';
import {
  SettingsPage,
  AddAdminButton,
  TextContainer,
  FieldLabel,
  FieldValue,
  FieldDropdown,
  ChangePasswordButton,
  LogoutButton,
  UpdateButton,
} from './SettingsPageStyles';


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
  const { user, setUser, logout } = useUser();
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
        return;
      }
      const updatedUser = { ...user, specialization: specialization };
      setUser(updatedUser); // Assuming `setUser` is available from `useUser()`

      setSpecialization('');

      navigate(`/${user.position_title}`); // Redirect to the admin page after successful update
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

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
