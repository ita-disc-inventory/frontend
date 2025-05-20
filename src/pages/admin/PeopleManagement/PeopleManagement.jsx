import React from 'react';
import UsersList from 'common/components/Users/UsersList/UsersList';
import { Container, ContentBox, Title } from './PeopleManagementStyles';

const PeopleManagement = () => {
  return (
    <Container>
      <ContentBox>
        <Title>User Management</Title>
        <UsersList />
      </ContentBox>
    </Container>
  );
};

export default PeopleManagement;
