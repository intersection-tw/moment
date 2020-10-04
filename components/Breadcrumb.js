import styled from 'styled-components';

import { shade, midnight } from '../styles/color';
import { familyDefault } from '../styles/font';

const Breadcrumb = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0 16px;

  @media screen and (min-width: 768px) {
    flex: 0 0 320px;
    padding: 0 0 16px 0;
    top: 24px;
  }
`;

const BreadcrumbList = styled.ul`
  display: flex;
  margin: 0 -16px;
  padding: 0 16px;
  background-color: hsla(${shade.h}, ${shade.s}%, ${shade.l.iii}%, 0.8);
  backdrop-filter: blur(8px);

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

const BreadcrumbItem = styled.li`
  margin: 0;
  padding: 2px 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
  font-family: ${familyDefault};
  font-size: 1.4rem;
  line-height: ${32 / 14};
  list-style: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const BreadcrumbItemLink = styled.a`
  display: inline-block;
  margin-left: -8px;
  padding: 0 8px;
  color: inherit;
  text-decoration: none;
`;

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink };
