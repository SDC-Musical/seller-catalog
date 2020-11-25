/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import $ from 'jquery';
import Sellers from './sellers';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      quotes: [],
      error: null,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3002/api/product/quotes',
      method: 'GET',
      data: {
        productId: this.state.productId,
        sellerLimit: 3,
      },
    })
      .done((priceQuotes) => {
        console.log(priceQuotes);
        this.setState({
          quotes: priceQuotes,
        });
      })
      .fail(() => {
        this.setState({
          error: 'Product Not Found.',
        });
      });
  }

  render() {
    if (this.state.error) {
      return <h3>{this.state.error}</h3>;
    }
    if (this.state.quotes.length) {
      const sellerOptions = this.state.quotes.map((option) => (
        <Sellers seller={option} key={option.id} />
      ));
      return (
        <div>
          {sellerOptions}
        </div>
      );
    }
    return false;
  }
}

export default Options;
