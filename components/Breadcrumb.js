import styled from 'styled-components';

import { shade, midnight } from '../styles/color';
import { familyDefault } from '../styles/font';

const BreadcrumbList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0 16px;

  @media screen and (min-width: 768px) {
    margin: 0 0 8px;
    background-color: hsla(${shade.h}, ${shade.s}%, ${shade.l.iii}%, 0.8);
    backdrop-filter: blur(8px);
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

export { BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink };
