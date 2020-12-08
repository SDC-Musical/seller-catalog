/* eslint-disable react/prop-types */
import { Tooltip } from '@material-ui/core';
import React from 'react';
import styles from './main.module.css';
import useStyles from './useStyles';

const Sellers = ({ seller }) => {
  const classes = useStyles();
  return (
    <div className={styles.sellerOption}>
      <div>
        <div className={styles.total}>{`$${seller.price + seller.tax}`}</div>
        <div>{`$${seller.tax} est. tax`}</div>
        <div>{seller.offer}</div>
        <div>{seller.return_policy}</div>
        <div className={styles.store}>
          {seller.seller_name}
        </div>
        <div className={styles.gGuarantee}>
          <span>
            <img id={styles.gImage} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB5UlEQVR4Ae2YAUSDQRiGP4QQQgghQIAQhoAQQoAAA4Twj3+3DWgEGAIEGMIQQgAIMAwBhhCGIQwhDOv7OCT3Ntvduxn38gL77573/u+7+2+SRVVWVlZWu93ecs5dqV/VsxX5TV1ICjUajXs6MHC9Xr+QWDnnJnxY6JcUAWZr9GjTA3xQAghJ6wyQA9i2uVkBMDx/F6LA43OAH4AAb+6IiR6AAG+nv5j4AXjw9AAAqiDA8wIAqIIAzwsAoIoE8PwAts0hKAOOhOcHsMuOhnj6L0QEPDfAAiEi4IkBIkIE4Vut1uHK7gMKvLNcCLzyzWbzNPD7vsRKod7/DmyTiQmHwPD47l0NPPMssbJBAgPfCRAIAeHnzNNJEeAmVJsGKlhWEuf2OazgPXVlzhz7GvoLv+kI6eQHoByqYuL9dfMpXqwymtjOkQC+4pybUrdZmwQ05qAsy73ItzsOLQ4YNypED4QYGsgS450AeLuJ3Upq2YpY84IQE3Uxr7FNtVpt1wBDTevdx+MkKCU0sffIatcfSvu/S0V95px78KsOn/fP8WRwIESsx2VZHglDoH5HCeEH9JUHPdGNBP9Wd7Tmt2VdUoBjf05MFwTv4t1rDTIY7Y1rH2YYaM6B+lF/cxn4mt1QZWVlZf0AHtXl4laolpgAAAAASUVORK5CYII" alt="guaranteeImage" />
          </span>
          Google Guarantee
          <Tooltip
            title={(
              <p className={styles.gTooltip}>
                If anything goes wrong with your order, Google will help make it right.
                <br />
                <a href="https://support.google.com/googleshopping/answer/9128896">Learn more</a>
              </p>
            )}
            arrow
            placement="bottom-end"
            background="default"
            classes={{
              tooltip: classes.tooltip,
              arrow: classes.arrow,
            }}
            interactive
          >
            <span className={styles.infoTooltip}>&#9432;</span>
          </Tooltip>
        </div>
      </div>
      <div className={styles.buttonSpace}>
        <div className={styles.fRight}>
          <div className={`${styles.actionButton} ${styles.actionColor}`}>
            <span className={styles.cartSymbol} />
            Add to cart
          </div>
          <div className={`${styles.actionButton} ${styles.checkoutColor}`}>
            Quick checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellers;
