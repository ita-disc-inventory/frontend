import styled from 'styled-components';
import { Title as BaseTitle } from 'common/components/form/Text';

const AdminHomePage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  margin-left: 2vw;
  margin-right: 2vw;
  text-align: left;
`;

const LeftAlignedTitle = styled(BaseTitle)`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  position: relative;
`;

// Export all styled components
export { AdminHomePage, ContentContainer, LeftAlignedTitle };
