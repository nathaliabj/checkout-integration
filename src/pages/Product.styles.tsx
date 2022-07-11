import styled, { css } from "styled-components";

const commonButtonStyling = css`
  background: rgb(36, 42, 47);
  color: white;
  border-radius: 5px;
  border: none;
  transition: 0.3s ease all;
  :hover {
    cursor: pointer;
    background: rgba(36, 42, 47, 0.8);
  }
`;

export const ProductPageWrapper = styled.div`
  padding: 30px 50px;
  display: flex;
  flex-direction: row;
  gap: 50px;
  background: rgb(240, 240, 240);
  justify-content: center;
`;

export const Product = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 6px;
  color: rgb(38, 38, 38);
  text-align: left;
  max-width: auto;
`;

export const ProductImage = styled.img`
  max-width: 600px;
  border-radius: 6px;
  margin: 20px auto 40px;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProductTitle = styled.h3`
  text-align: center;
`;

export const ProductOverview = styled.p`
  max-width: 600px;
  margin: auto;
`;

export const Bold = styled.span`
  font-weight: 700;
  margin-right: 8px;
`;

export const PriceContainer = styled.p`
  text-align: left;
`;

export const QuantityContainer = styled.div`
  display: flex;
  margin: auto;
  gap: 10px;
  align-items: center;
`;

export const CounterButton = styled.button`
  ${commonButtonStyling};
  width: 30px;
  height: 30px;
  font-size: 22px;
  line-height: 25px;
`;

export const NumberOfPpl = styled.p`
  font-size: 18px;
`;

export const CheckoutWrapper = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 6px;
  color: rgb(38, 38, 38);
  text-align: left;
  width: 420px !important;
  height: fit-content;
`;

export const CheckoutButton = styled.button`
  ${commonButtonStyling};
  height: 40px;
  width: 140px;
  margin-left: auto;
  font-size: 16px;
`;

export const ErrorMessage = styled.p`
  color: red;
`;
