import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

/**
 * @name OrderTotalCell
 * @param {Object} row A react-table row object
 * @return {React.Component} A React component to render an order's total
 */
function OrderRevenueCell({ row }) {
  return (
    <Box textAlign="right">
      {row.values["profit.displayAmount"] || ''}
    </Box>
  );
}

OrderRevenueCell.propTypes = {
  row: PropTypes.object.isRequired
};

export default OrderRevenueCell;
