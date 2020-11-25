/* eslint-disable no-plusplus */

const sellerName = (id, sellers) => {
  for (let i = 0; i < sellers.length; i++) {
    if (sellers[i].id === id) {
      return sellers[i].name;
    }
  }
  return '';
};

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

const sellerReturnPolicy = (id, sellers) => {
  for (let i = 0; i < sellers.length; i++) {
    if (sellers[i].id === id) {
      return sellers[i].returnPolicy;
    }
  }
  return '';
};

const sellerShippingFee = (id, sellers) => {
  for (let i = 0; i < sellers.length; i++) {
    const { delivery } = sellers[i];
    if (sellers[i].id === id) {
      return delivery.fee;
    }
  }
  return '';
};

module.exports = {
  sellerName,
  sellerOffer,
  sellerReturnPolicy,
  sellerShippingFee,
};
