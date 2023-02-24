import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AccountBalanceCard from './components/AccountBalanceCard';
import { API_BASE_PATH, API_PATH } from './constant/constants';

export interface AccountData {
  accountNumber: number;
  total: {
    EUR: number;
    USD: number;
  };
}

async function fetchData() {
  const res = await fetch(API_PATH.currentBalance);
  const data = await res.json();
  return data.data as AccountData[];
}

const AccountsAndCardsPage = () => {
  const [data, setData] = useState<AccountData[]>([]);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  console.log(data);
  return (
    <Container sx={{}}>
      <Typography variant="h6" my={2.5}>
        Your balance
      </Typography>
      <Grid container xs={12} spacing={2}>
        {data.map(account => (
          <AccountBalanceCard
            accountData={account}
            key={account.accountNumber}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default AccountsAndCardsPage;
