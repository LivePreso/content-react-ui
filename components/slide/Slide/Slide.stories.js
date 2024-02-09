import React from "react";
import { Slide, Header, Title, Content, Footer } from "@deck/components/slide";
import { slideDecoratorStyle } from "../../js/storybook-utils";

export default {
  component: Slide,
  title: "Components/Slides/Slide",
  decorators: [
    (Story) => (
      <div style={slideDecoratorStyle}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    children: (
      <>
        <Header>
          <Title>Slide header</Title>
        </Header>
        ,
        <Content>
          <p>Content</p>
        </Content>
        ,<Footer>Disclaimer & footer</Footer>
      </>
    ),
  },
};
