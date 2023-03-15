import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import TooltipTemplate from './TooltipTemplate.js';
import React, { useEffect, useState } from 'react';
import SelectBox from 'devextreme-react/select-box';
import { Link } from 'react-router-dom';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';
import service from './data.js';
import axios from 'axios';
import handleDateTimeStr from './date/dateTimeStr.js';
import styled from 'styled-components';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
const energySources = service.getEnergySources();
const types = ['line', 'stackedline', 'fullstackedline'];

const DEFAULT = 30;

function ProfitMargin() {
  const [type, setType] = useState('line');
  const [profitData, setProfitData] = useState([]);

  const [seconds, setSeconds] = useState(DEFAULT);

  function handleChange(e) {
    setType(e.value);
  }

  function handleUpdateSeconds(e) {
    setSeconds(e.target.value);
  }

  useEffect(() => {
    let api = `https://remotever.com/getusdtprices/?q=${seconds}`;
    // let api = `http://127.0.0.1:8000/getusdtprices/?q=${seconds}`;
    axios
      .get(api)
      .then((res) => {
        setProfitData(
          res.data.map((data) => {
            return {
              median: data.profitmedian,
              created_at: handleDateTimeStr(data.created_at),
              profit: data.profit,
              buyprice: data.buyprice,
              sellprice: data.sellprice,
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, [seconds]);

  function handleReset() {
    setSeconds(DEFAULT);
  }

  return (
    <Container>
      <Header className="px-3">
        <ButtonSet>
          <FormControl className="mx-4" size="small" style={{ width: '200px' }}>
            <InputLabel id="demo-simple-select-label">Filters</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={seconds}
              label="Minutes"
              onChange={handleUpdateSeconds}
            >
              <MenuItem value={30}>30 minutes</MenuItem>
              <MenuItem value={60}>1 hrs</MenuItem>
              <MenuItem value={60 * 3}>3 hrs</MenuItem>
              <MenuItem value={60 * 24}>6 hrs</MenuItem>
              <MenuItem value={60 * 24}>24 hrs</MenuItem>
            </Select>
          </FormControl>
        </ButtonSet>

        <ButtonSet>
          <TextField
            size="small"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            value={seconds}
            onChange={(e) => {
              setSeconds(parseFloat(e.target.value));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Minutes</InputAdornment>
              ),
            }}
          />
        </ButtonSet>
        <ButtonSet>
          <Button
            onClick={(e) => {
              handleReset();
            }}
            className="mx-4"
            variant="outlined"
          >
            Refresh
          </Button>
        </ButtonSet>
      </Header>
      <React.Fragment>
        <Chart palette="Violet" dataSource={profitData}>
          <CommonSeriesSettings
            argumentField="created_at"
            type={type}
          ></CommonSeriesSettings>
          {energySources.map((item) => (
            <Series
              key={item.value}
              valueField={item.value}
              name={`KSH ${item.name} / USDT`}
            />
          ))}
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />

          <Title
            text={`USDT @ KES ${
              profitData.length > 0 &&
              `Buy - ${profitData[profitData.length - 1].buyprice}  Sell - ${
                profitData[profitData.length - 1].sellprice
              }   Profit - ${profitData[profitData.length - 1].profit}`
            } `}
          >
            <Subtitle text="(Trade Analysis)" />
          </Title>
          <Tooltip contentRender={TooltipTemplate} enabled={true} />
        </Chart>
        <Link to="/binance-snipper_entries-usd-kenya-shilling/profit/">
          Prices
        </Link>
        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <span>Series Type </span>
            <SelectBox
              dataSource={types}
              value={type}
              onValueChanged={handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    </Container>
  );
}

export default ProfitMargin;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ButtonSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
