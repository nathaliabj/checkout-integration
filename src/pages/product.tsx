import React, { useState, FC } from "react";
import Image from "./wine-tasting.jpeg";
// @ts-ignore
import { Primer, checkout } from "@primer-io/checkout-web";
import {
  ProductPageWrapper,
  ProductImage,
  ProductInfoContainer,
  ProductTitle,
  ProductOverview,
  QuantityContainer,
  CounterButton,
  NumberOfPpl,
  Product,
  CheckoutWrapper,
  PriceContainer,
  Bold,
  CheckoutButton,
  ErrorMessage,
} from "./Product.styles";

const KEY = "0f44d4e9-fe4c-45d6-8946-2b58f05cab9a";
const BASE_URL = "https://api.sandbox.primer.io";

const Checkout: FC = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [showError, setShowError] = useState(false);
  const [clientToken, setClientToken] = useState(null);
  const hasQuantity = quantity <= 0;
  const [isCheckoutCompleted, setCheckoutCompleted] = useState(false);

  const options = {
    container: "#checkout-container",
    onCheckoutComplete() {
      setCheckoutCompleted(true);
    },
  };

  const lineItems = {
    itemId: "tasting-101",
    description: "Wine tasting and salsa club",
    amount: 4500,
  };

  const updateCheckout = (newQuantity: number) => {
    // When there is a client token already present
    // We will proceed to update the token with the updated price & quantity

    if (clientToken) {
      fetch(`${BASE_URL}/client-session`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Api-Version": "2.1",
          "X-Api-Key": KEY,
        },

        body: JSON.stringify({
          clientToken: clientToken,
          order: {
            lineItems: [
              {
                ...lineItems,
                quantity: newQuantity,
              },
            ],
          },
        }),
      })
        .then((data) => data.json())
        .catch((e) => console.error(e));
    }
    return;
  };

  const onClickCheckout = () => {
    if (price > 0) {
      setOpenCheckout(true);
    } else {
      setShowError(true);
    }

    if (!clientToken) {
      fetch(`${BASE_URL}/client-session`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Version": "2.1",
          "X-Api-Key": KEY,
        },
        body: JSON.stringify({
          orderId: "order-" + Math.random(),
          currencyCode: "GBP",
          customer: {
            emailAddress: "testdummy@address.com",
            billingAddress: {
              firstName: "john",
              lastName: "row",
              addressLine1: "196",
              addressLine2: "road",
              city: "london",
              countryCode: "GB",
              postalCode: "RE1 5RD",
            },
          },
          order: {
            lineItems: [
              {
                ...lineItems,
                quantity: quantity,
              },
            ],
          },
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (price > 0) {
            setClientToken(data.clientToken);
            Primer.showUniversalCheckout(data.clientToken, options);
          } else {
            checkout.setPaymentCreationEnabled(false);
          }
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <ProductPageWrapper>
      <Product>
        <ProductInfoContainer>
          <ProductTitle>
            Lux wine tasting ( With some Salsa fun 💃🕺 )
          </ProductTitle>
          <ProductImage src={Image} alt="" />
          <ProductOverview>
            Let yourself be allured by the raw emotion and captivating taste of
            this luxury wine tasting in the heart of beautiful wineries. Sink
            into a comfortable seat in a venue considered one of the best in the
            world and watch an electrifying salsa performance that expertly
            demonstrates the best moves.
          </ProductOverview>
        </ProductInfoContainer>

        <PriceContainer>
          <Bold>Price:</Bold>
          £45 pp
        </PriceContainer>

        {!isCheckoutCompleted ? (
          <QuantityContainer>
            <CounterButton
              disabled={hasQuantity}
              onClick={() => {
                setQuantity(quantity - 1);
                setPrice(price - 45);
                updateCheckout(quantity - 1);
              }}
            >
              -
            </CounterButton>

            <NumberOfPpl>{quantity}</NumberOfPpl>
            <CounterButton
              onClick={() => {
                setQuantity(quantity + 1);
                setPrice(price + 45);
                updateCheckout(quantity + 1);
              }}
            >
              +
            </CounterButton>
            <PriceContainer>
              <Bold>Total:</Bold>
              {`£${price}`}
            </PriceContainer>
            <CheckoutButton onClick={onClickCheckout}>Checkout</CheckoutButton>
          </QuantityContainer>
        ) : (
          <NumberOfPpl>Thanks for your purchase!</NumberOfPpl>
        )}
        {showError && (
          <ErrorMessage>
            Please select how many tickets you wish to purchase.
          </ErrorMessage>
        )}
      </Product>
      {openCheckout && (
        // @ts-ignore
        <CheckoutWrapper disable={!hasQuantity} id="checkout-container" />
      )}
    </ProductPageWrapper>
  );
};

export default Checkout;
