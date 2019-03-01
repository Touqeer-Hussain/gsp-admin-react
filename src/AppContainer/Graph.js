import React, { Component } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import firebase from '../Config/firebase'


class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      temp: false,
      yearly: null,
      type: ''
    }
  }




  componentDidMount() {


    this.getWeekly()

  }


  getMonthly = () => {
    this.state.data.length = 0
    this.setState({
      type: 'Monthly:',
      
      temp: null
    })
    var fate = new Date();
    var year = fate.toString().split(' ')[3];
    var month = fate.toString().split(' ')[1];
    var date = fate.toString().split(' ')[2]


    firebase.database().ref(`graph/${year}/${month}`).once('value', snap => {

      if (snap.val()) {
        snap.val().map((l, i) => {
          this.state.data.push({ id: i + 1, hiring: l })

        })
        this.setState({
          temp: true

        })
      }

    })
  }

  getWeekly = () => {
    this.state.data.length = 0
    this.setState({
      type: 'Weekly:',
      
      temp: null
    })
    var fate = new Date();
    var year = fate.toString().split(' ')[3];
    var month = fate.toString().split(' ')[1];
    var date = fate.toString().split(' ')[2]
    var temp = 'Feb'

    firebase.database().ref(`graph/${year}/${month}`).once('value', snap => {

      if (snap.val()) {
        console.log(snap.val())
        var f = snap.val()
        var s = f.slice(Math.max(f.length - 7, 0))
        var len = snap.val().length
        s.map((l, i) => {

          this.state.data.push({ id: len = len - 1, hiring: l })

        })
        this.setState({
          temp: true

        })
      }

    })
  }

  getYearly = () => {
    this.state.data.length = 0
    this.setState({
      type: 'Yearly:',
      
      temp: null
    })
    var fate = new Date();
    var year = fate.toString().split(' ')[3];
    var month = fate.toString().split(' ')[1];
    var date = fate.toString().split(' ')[2]




    firebase.database().ref(`graph/${year - 1}`).on('child_added', snap => {


      if (snap.val()) {


        console.log(snap.val())

        var sum = snap.val().reduce((previous, current) => current += previous);
        var avg = sum / snap.val().length;

        this.state.data.push({ id: snap.key, hiring: Math.round(avg) })
        console.log(this.state.data)
        this.setState({
          temp: true

        })

      }
    })

    this.state.data.sort((a, b) => {
      if (a.id < b.id) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({
      yearly: true
    })

  }




  render() {
    console.log('Graph')
    const { data } = this.state;
    return (
      <div>
        <div>
         <Button as='a' primary onClick={() => {
                  console.log('Graphed')
                    this.getWeekly();
                    
                  }}>
                    Weekly
                  </Button>
                  <Button as='a' primary onClick={() => {
                  console.log('Graphed')
                  this.getMonthly();
                    
                  }}>
                    Monthly
                  </Button>
                  <Button as='a' primary onClick={() => {
                  console.log('Graphed')
                    this.getYearly();
                    
                  }}>
                    Yearly
                  </Button>
                  <h2>{this.state.type}</h2>
                  </div>
                  {
                    this.state.temp && <AreaChart
                    width={800}
                    height={500}
                    data={this.state.yearly ? this.state.data.length == 12 && this.state.data : this.state.data}
                    margin={{
                      top: 10, right: 30, left: 0, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="hiring" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                  }
      </div>
      
    );
  }
}

export default Graph