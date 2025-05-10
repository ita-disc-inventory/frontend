import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContentBox = styled.div`
  margin: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const PeopleManagement = () => {
  return (
    <Container>
      <ContentBox>
        <Title>User Management</Title>
        {/* Add your user management content here */}
      </ContentBox>
    </Container>
  );
};

export default PeopleManagement;
