import { Grid, Card, Box, Typography, SxProps } from '@mui/material';
import React from 'react';
import { AccountData } from '../AccountsAndCardsPage';

const AccountBalanceCard = ({
  sx = {},
  accountData,
}: {
  sx?: SxProps;
  accountData: AccountData;
}) => {
  const date = new Intl.DateTimeFormat('en-US').format(new Date(Date.now()));
  const euroFormatted = Math.round(accountData.total.EUR);
  const usdFormatted = Math.round(accountData.total.USD);
  return (
    <Grid item xs={12} sm={6} sx={{ ...sx }}>
      <Card sx={{ border: '2px solid orange', p: 2, borderRadius: 1.25 }}>
        <Box display="flex">
          <Box width="100%">
            <Typography variant="h5" sx={{ color: 'orange' }}>
              Account {accountData.accountNumber}
            </Typography>
            <Box mt={2}>
              <Typography>Euro balance</Typography>
              <Typography fontWeight={700}>€ {euroFormatted}</Typography>
            </Box>
            <Box mt={2}>
              <Typography>US Dollars balance</Typography>
              <Typography fontWeight={700}>$ {usdFormatted}</Typography>
            </Box>
          </Box>
          <Box justifySelf="flex-end" alignSelf="flex-end">
            <Typography>{date}</Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default AccountBalanceCard;
