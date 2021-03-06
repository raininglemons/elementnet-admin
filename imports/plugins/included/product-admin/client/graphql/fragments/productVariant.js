import gql from "graphql-tag";

export default gql`
  fragment ProductVariant on ProductVariant {
    _id
    attributeLabel
    barcode
    height
    index
    isDeleted
    isVisible
    length
    metafields {
      key
      value
    }
    minOrderQuantity
    optionTitle
    media {
      _id
      URLs {
        original
        small
      }
      priority
    }
    originCountry
    pricing {
      compareAtPrice {
        amount
      }
      price
      costPrice
      dropshipCostPrice
    }
    shop {
      _id
    }
    sku
    title
    updatedAt
    weight
    width
    isTaxable
    taxCode
    taxDescription
    cbdContent
    volume
    cannabinoidProfile
    maxPerOrder
    cbdInformation {
      cbdContent
      volume
      cannabinoidProfile {
        url
        description
      }
      capsules
      flavour
      allowCPC
    }
  }
`;

