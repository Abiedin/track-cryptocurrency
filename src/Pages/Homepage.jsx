import React from 'react';
import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/CoinsTable/CoinsTable';
import './style.scss';

const Homepage = () => {
  return (
    <div className="homepage">
        <Banner />
        <CoinsTable />
    </div>
  );
};

export default Homepage;
