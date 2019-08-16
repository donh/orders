import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function parse (date) {
  const arr = date.split('/')
  let str = ''
  for(const key in arr) {
    const item = arr[key]
    if(item.length < 2) {
      str += '0' + item
    } else {
      str += item
    }
  }
  return +str
}

class BlockProcess extends Component {
  render() {
    const rows = this.props.orders.map((item, key) => {
      return (
        <div key={key + 1} className="order">
          <div className="left logo">
            <img className="" src={item.logo} alt="Logo" height="95" width="95" />
          </div>
          <div className="text">
            <div className="">
              <div className="logo green">{item.status}</div>
              <div className="logo date">預計出貨：{item.date}</div>
            </div>
            <div className="name">{item.name}</div>
          </div>
        </div>
      )
    })

    return (
      <div className="">
        <div className="header left">
          <div className="square"></div>
          {this.props.title}
        </div>
        {rows}
      </div>
    );
  }
}

class BlockDone extends Component {
  render() {
    const rows = this.props.orders.map((item, key) => {
      return (
        <div key={key + 1} className="order">
          <div className="left logo">
            <img className="" src={item.logo} alt="Logo" height="95" width="95" />
          </div>
          <div className="text">
            <div className="">
              <div className="logo">{item.status}</div>
              <div className="logo date"></div>
            </div>
            <div className="name">{item.name}</div>
          </div>
        </div>
      )
    })

    return (
      <div className="">
        <div className="header left">
          <div className="square"></div>
          {this.props.title}
        </div>
        {rows}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  async componentWillMount() {
    try {
      const response = await axios.get('http://localhost:5000')
      console.log('👉 Returned data:', response);
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {
    const process = []
    const done = []
    this.state.data.map((order, key) => {
      if (order.status === '已成立' || order.status === '處理中') {
        process.push(order)
      } else if (order.status === '已取消' || order.status === '已送達') {
        done.push(order)
      }
    })
    process.sort(function(a, b) {
      return parse(b.date) - parse(a.date)
    })
    done.sort(function(a, b) {
      return parse(b.date) - parse(a.date)
    });

    return (
      <div className="App">
        <BlockProcess title="進行中" orders={process} />
        <BlockDone title="已完成" orders={done} />
      </div>
    );
  }
}

export default App;
