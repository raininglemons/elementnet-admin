import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { Form } from "reacto-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import ErrorsBlock from "@reactioncommerce/components/ErrorsBlock/v1";
import Field from "@reactioncommerce/components/Field/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";
import { i18next, Reaction } from "/client/api";
import updateOrderFulfillmentGroupMutation from "../graphql/mutations/updateOrderFulfillmentGroup";

class OrderCardFulfillmentGroupWeight extends Component {
  static propTypes = {
    classes: PropTypes.object,
    fulfillmentGroup: PropTypes.object,
    orderId: PropTypes.string
  };

  state = {
    isEditing: !this.props.fulfillmentGroup.data || this.props.fulfillmentGroup.data.weight === null,
    weight: this.props.fulfillmentGroup.data && this.props.fulfillmentGroup.data.weight
  }

  handleFormChange = (value) => {
    this.formValue = value;
  };

  handleSubmitForm = () => {
    const hasPermission = Reaction.hasPermission(["reaction:legacy:orders/update"], Reaction.getUserId(), Reaction.getShopId());

    if (hasPermission) {
      this.form.submit();
    }
  };

  handleToggleEdit = () => {
    const hasPermission = Reaction.hasPermission(["reaction:legacy:orders/update"], Reaction.getUserId(), Reaction.getShopId());

    if (hasPermission) {
      this.setState({
        isEditing: !this.state.isEditing
      });
    }
  };

  handleUpdateFulfillmentGroupWeight = (data, mutation) => {
    const hasPermission = Reaction.hasPermission(["reaction:legacy:orders/update"], Reaction.getUserId(), Reaction.getShopId());

    if (hasPermission) {
      const { fulfillmentGroup, orderId } = this.props;
      const { weight } = data;

      mutation({
        variables: {
          orderFulfillmentGroupId: fulfillmentGroup._id,
          orderId,
          weight: parseInt(weight, 10)
        }
      });

      this.setState({
        isEditing: false,
        weight: parseInt(weight, 10)
      });
    }
  }

  render() {
    const hasPermission = Reaction.hasPermission(["reaction:legacy:orders/update"], Reaction.getUserId(), Reaction.getShopId());
    const { fulfillmentGroup } = this.props;
    const { isEditing, weight } = this.state;

    if (hasPermission) {
      if (isEditing) {
        return (
          <Mutation mutation={updateOrderFulfillmentGroupMutation}>
            {(mutationFunc) => (
              <Fragment>
                <Form
                  ref={(formRef) => {
                    this.form = formRef;
                  }}
                  onChange={this.handleFormChange}
                  onSubmit={(data) => this.handleUpdateFulfillmentGroupWeight(data, mutationFunc)}
                  value={fulfillmentGroup}
                >
                  <Field
                    name="weight"
                    labelFor="weightInput"
                  >
                    <TextInput
                      id="weightInput"
                      name="weight"
                      placeholder={i18next.t("order.weight", "Weight")}
                      value={(weight || 0).toString()}
                      type="number"
                    />
                    <ErrorsBlock names={["weight"]} />
                  </Field>

                  {weight ?
                    <Grid container alignItems="center" justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button color="primary" size="small" variant="outlined" onClick={this.handleToggleEdit}>
                          {i18next.t("app.cancel", "Cancel")}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button color="primary" size="small" variant="contained" onClick={this.handleSubmitForm}>
                          {i18next.t("app.save", "Save")}
                        </Button>
                      </Grid>
                    </Grid>
                    :
                    <Button color="primary" size="small" variant="outlined" onClick={this.handleSubmitForm}>
                      {i18next.t("app.add", "Add")}
                    </Button>
                  }
                </Form>
              </Fragment>
            )}
          </Mutation>
        );
      }
    }

    return (
      <Link
        component="button"
        variant="body2"
        onClick={() => { this.handleToggleEdit(); }}
      >
        {(weight && `${weight}g`) || "Not available"}
      </Link>
    );
  }
}

export default OrderCardFulfillmentGroupWeight;
