import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import CurrentBuySellPrice from './CurrentBuySellPrice';
import ProfitMargin from './ProfitMargin';

function App() {
  return (
    <Container>
      <Routes>
        <Route
          path="/binance-snipper_entries-usd-kenya-shilling/profit/"
          element={<CurrentBuySellPrice />}
        />
        <Route
          path="/binance-snipper_entries-usd-kenya-shilling/prices"
          element={<ProfitMargin />}
        />
      </Routes>
    </Container>
  );
}

const Container = styled.div``;
export default App;
