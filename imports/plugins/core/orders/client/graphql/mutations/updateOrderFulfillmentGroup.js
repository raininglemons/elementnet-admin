import gql from "graphql-tag";
import { orderCommonFragment } from "../fragments/orderCommon";

export default gql`
  mutation updateOrderFulfillmentGroupMutation($orderFulfillmentGroupId: ID!, $orderId: ID!, $status: String, $tracking: String, $language: String! = "en", $weight: Int) {
    updateOrderFulfillmentGroup(input: {
      orderFulfillmentGroupId: $orderFulfillmentGroupId,
      orderId: $orderId,
      status: $status,
      tracking: $tracking
      weight: $weight
    }) {
      order {
        ...OrderCommon
      }
    }
  }
  ${orderCommonFragment}
`;
