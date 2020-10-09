import styled from 'styled-components';

const ResponsiveLayout = styled.div`
  max-width: 1080px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    display: grid;
    grid: "breadcrumb lyric" 72px
          ". lyric"
          ". heard" / 320px 1fr;
  }

  @media screen and (min-width: 992px) {
    /* max-width: 1080px;
    margin-right: auto;
    margin-left: auto; */
  }

  @media screen and (min-width: 1080px) {
    /* padding-right:0;
    padding-left:0; */
  }
`;

export { ResponsiveLayout };
