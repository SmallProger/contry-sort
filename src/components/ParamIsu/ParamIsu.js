import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { getRequest } from '../../utils';

const OPTIONS = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'ИСУ',
    },
  }
}

export default function ParamIsu(param) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRequest('output-data.xlsx', param).then(data => {
      setData(data);
      setLoading(false);
    }).catch(err => console.log(err))
  }, [param])
  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <Bar
        options={OPTIONS}
        datasetIdKey='id'
        data={data}
      />
    );
  }
}