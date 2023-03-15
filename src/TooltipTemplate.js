import React from 'react';

export default function TooltipTemplate(info) {
  return (
    <div className="state-tooltip">
      <div className="capital">
        <span className="caption">Time</span>: {info.argument}
      </div>
      <div className="capital">
        <span className="caption">Median</span>: {info.point.data.median}
      </div>
      <div className="population">
        <span className="caption">Profit</span>: {info.point.data.profit}
      </div>
      <div className="population">
        <span className="caption">Minimum Buy</span>: {info.point.data.buyprice}
      </div>
      <div className="population">
        <span className="caption">Maximum Sell</span>:{' '}
        {info.point.data.sellprice}
      </div>
    </div>
  );
}
