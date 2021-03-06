import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const WAIT_INTERVAL = 0;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class NumberFormatCustom extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        onValueChange={values => {
          this.props.onChange({
            target: {
              value: values.value
            }
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired
};

class Inputs extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   num_stocks: this.props.num_stocks,
    //   total_amount: this.props.total_amount
    // };
  }

  // componentWillMount() {
  //   this.timer = null;
  // }

  onFieldChange(e) {
    // clearTimeout(this.timer);
    const field = e.target.id;
    const value =
      field === 'total_amount'
        ? parseFloat(e.target.value.slice(1).replace(/,/g, ''))
        : e.target.value;
    // this.setState({ [field]: value });
    this.props.onChange(field, value);
    // this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
  }

  // triggerChange() {
  //   let { num_stocks, total_amount } = this.state;
  //   total_amount = parseFloat(total_amount.slice(1).replace(/,/g, ''));
  //   this.props.onChange(num_stocks, total_amount);
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="num_stocks">Number of Stocks</InputLabel>
          <Input
            id="num_stocks"
            type="number"
            min="0"
            step="1"
            value={this.props.num_stocks}
            onChange={this.onFieldChange.bind(this)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="total_amount">Total Amount</InputLabel>
          <Input
            id="total_amount"
            label="Name"
            inputComponent={NumberFormatCustom}
            className={classes.textField}
            value={this.props.total_amount}
            onChange={this.onFieldChange.bind(this)}
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Inputs);
