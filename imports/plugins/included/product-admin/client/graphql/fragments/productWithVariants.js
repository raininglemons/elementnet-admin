import gql from "graphql-tag";
import ProductVariant from "./productVariant";

export default gql`
  fragment Product on Product {
    _id
    currentProductHash
    description
    isDeleted
    isVisible
    metaDescription
    metafields {
      key
      value
    }
    media {
      _id
      URLs {
        small
      }
      priority
    }
    originCountry
    pageTitle
    productType
    publishedAt
    publishedProductHash
    shop {
      _id
    }
    slug
    socialMetadata {
      message
      service
    }
    supportedFulfillmentTypes
    tagIds
    tags {
      nodes {
        _id
        name
      }
    }
    title
    updatedAt
    vendor
    cbdInformation {
      type
      vegan
      guaranteedZeroThc
      glutenFree
      gmpCertified
      notAnimalTested
      spectrumType
      extractionMethod
      base
      hempSource
      strain
      delivery
    }
    content {
      en {
        productInformation
        brandInformation
        howToUseThisItem
        keyInformation
        ingredients,
        allergyInformation
      }
    }
    variants {
      ...ProductVariant
      options {
        ...ProductVariant
      }
    }
  }
  ${ProductVariant}
`;
