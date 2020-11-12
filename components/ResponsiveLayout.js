import styled from 'styled-components';

const ResponsiveLayout = styled.div`
  max-width: 1080px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 320px 1fr;
  }
`;

export { ResponsiveLayout };
