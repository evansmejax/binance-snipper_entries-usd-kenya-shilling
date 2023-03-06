import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';

import React, { useEffect, useState } from 'react';
import SelectBox from 'devextreme-react/select-box';
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

const DEFAULT = 56666;

function App() {
  const [type, setType] = useState('line');
  const [profitData, setProfitData] = useState([]);

  const [seconds, setSeconds] = useState(60 * 30);

  function handleChange(e) {
    setType(e.value);
  }

  function handleUpdateSeconds(e) {
    setSeconds(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`https://remotever.com/getusdtprices/?q=${seconds}`)
      .then((res) => {
        setProfitData(
          res.data.map((data) => {
            return {
              median: data.profitmedian,
              created_at: handleDateTimeStr(data.created_at),
              profit: data.profit,
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
      <Header>
        <ButtonSet>
          <FormControl className="mx-4" size="small" style={{ width: '200px' }}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={seconds}
              label="Age"
              onChange={handleUpdateSeconds}
            >
              <MenuItem value={60 * 30}>30 minutes</MenuItem>
              <MenuItem value={60 * 60}>1 hrs</MenuItem>
              <MenuItem value={60 * 60 * 3}>3 hrs</MenuItem>
              <MenuItem value={60 * 60 * 24}>6 hrs</MenuItem>
              <MenuItem value={60 * 60 * 24}>24 hrs</MenuItem>
            </Select>
          </FormControl>
        </ButtonSet>

        <ButtonSet>
          <TextField
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            value={seconds}
            onChange={(e) => {
              setSeconds(parseFloat(e.target.value));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Seconds</InputAdornment>
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
          <CommonSeriesSettings argumentField="created_at" type={type} />
          {energySources.map((item) => (
            <Series key={item.value} valueField={item.value} name={item.name} />
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
          <Title text="USDT @ KES">
            <Subtitle text="(Trade Detection Alert)" />
          </Title>
          <Tooltip enabled={true} />
        </Chart>
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

export default App;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ButtonSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
