import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../components/Seo';
import GlobalStyles from '../components/GlobalStyles';

import { shade, dawn, midnight} from '../styles/color';

import { BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink } from '../components/Breadcrumb';


const ContactBody = createGlobalStyle`
  body {
    background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.i}%);
  }
`;

export default function Contact() {
  return(
    <>
      <Seo title="聯絡 The Moment"
           description="找到作者，或留言。"
           published="2020-11-08"
           modified="2020-11-08"
      />
      <GlobalStyles />
      <ContactBody />
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbItemLink>
            Moment 首頁
          </BreadcrumbItemLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </>
  )
};
