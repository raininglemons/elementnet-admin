import gql from "graphql-tag";

export default gql`
  query fulfillmentGroupsForRoyalMailCSV($shopIds: [ID]) {
    fulfillmentGroupsForRoyalMailCSV(shopIds: $shopIds,) {
      csvContent
    }
  }
`;
