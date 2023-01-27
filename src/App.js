import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './REDUX/taskSlice';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
const { RangePicker } = DatePicker;



function App() {

  const dispatch = useDispatch();
  const { taskList, loading } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])



  useEffect(() => {
    setdataList(taskList);

  }, []);


  const [dataList, setdataList] = useState([]);


  return (
    <div className='container'>

      <h2 style={{ margin: "30px" }}>Analytics</h2>

      <RangePicker className='RangePicker ' />

      <div className='container1'>

        <div className="App">


          <table>
            <tr>
              <th >Date</th>
              <th>App</th>
              <th>clicks</th>
              <th>Request</th>
              <th>Response</th>
              <th>Fill rate</th>
              <th>CTR</th>

            </tr>

            {  
                dataList.map(item => {


                let date = new Date(item.date)

                let datemonth = date.toDateString().split(' ');

                let req = parseInt(item.requests);
                let res = parseInt(item.responses);

                let fillrate = req / res * 100;
                let clk = parseInt(item.clicks / item.impressions * 100);


                return (

                  <tr>
                    <td> {datemonth[2] + ' ' + datemonth[1] + ' ' + datemonth[3]}</td>
                    <td> {item.app_name}</td>
                    <td>{item.clicks}</td>
                    <td>{item.requests}</td>
                    <td >{item.responses}</td>
                    <td>{fillrate}</td>
                    <td>{clk}</td>
                  </tr>
                )
              })}

          </table>

        </div>
      </div>
    </div>

  );
}

export default App;
