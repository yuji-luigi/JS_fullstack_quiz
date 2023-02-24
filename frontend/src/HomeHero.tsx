import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import Form from './providers/Form';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ImportFilterForm from './components/forms/ImportFilterForm';
import { API_BASE_PATH, API_PATH } from './constant/constants';
import { Link, useNavigate } from 'react-router-dom';

interface ErrorResponse {
  message: string;
  status: string;
  error: string;
}

interface FormData {
  date?: string;
  account?: string;
  currency?: 'EUR' | 'USD';
}

const HomeHero = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleImport = (): void => {
    setOpen(true);
  };

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      let query = `date=${data.date || '{}'}`;
      query += `account=${data.account || '{}'}`;
      query += `currency=${data.currency || '{}'}`;
      const res = await fetch(`${API_PATH.import}?${query}`);
      const dataFromServer = await res.json;
      window.alert(JSON.stringify(dataFromServer));
    } catch (error: any) {
      window.alert(error.message);
    }
  };

  const gotoBalancePage = () => {
    navigate('/accounts-cards');
  };

  const importFullCsv = async () => {
    try {
      const res = await fetch(API_PATH.import);
    } catch (error: any) {
      window.alert(error?.message || JSON.stringify(error, null, 4));
    }
  };
  return (
    <>
      <main className=" home-hero container flex">
        <section className="home-hero-section-1">
          <div>
            <h1 className="home-hero-header">Import your</h1>
            <h1 className="home-hero-header">transaction file with</h1>
            <h1 className="home-hero-header">a few clicks</h1>
          </div>
          <h2 className="home-hero-subheader">Upload is made easy for you</h2>
          <span>
            {/* <button onClick={handleImport} className="home-hero-button">
              IMPORT
            </button> */}
            <a className="textWhite" href={API_PATH.import}>
              <button
                /* onClick={importFullCsv} */ className="home-hero-button"
              >
                IMPORT
              </button>
            </a>
          </span>
        </section>
        <section>
          <img src="Illustration.png" />
        </section>
      </main>
      <Dialog open={open} onClose={() => setOpen(false)} sx={{}}>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Filter</DialogTitle>
          <DialogContent sx={{ p: 2, pb: 4 }}>
            <ImportFilterForm />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={importFullCsv}>
              <Typography>import</Typography>
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
};

export default HomeHero;
