/* eslint-disable no-plusplus */

const sellerOffer = (quote) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const deliveryDay = new Date();

  deliveryDay.setDate(deliveryDay.getDate() + quote.delivery_days);

  const day = days[deliveryDay.getDay()];
  const month = months[deliveryDay.getMonth()];
  const date = deliveryDay.getDate();

  if (quote.delivery_free === 0) {
    return `Free delivery by ${day}, ${month} ${date}`;
  } else {
    return `Spend $${quote.delivery_min} for free delivery by ${day}, ${month} ${date}`;
  }
}

const formatOptions = (options) => {
  options.map((quote) => {
    quote.offer = sellerOffer(quote);
  });

  options.sort((a, b) => { return (a.price + a.tax) - (b.price + b.tax) });

  return options.slice(0, 4);
}

module.exports = {
  sellerOffer,
  formatOptions
};
