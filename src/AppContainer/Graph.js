import React, { Component } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import firebase from '../Config/firebase'


class Graph extends Component {
    constructor(props){
      super(props)
      this.state = {
        data: [],
        temp: false
      }
    }


    getMonthly= () => {
      var fate = new Date();
      var year = fate.toString().split(' ')[3];
      var month = fate.toString().split(' ')[1];
      var date = fate.toString().split(' ')[2]
  
  
  firebase.database().ref(`graph/${year}/${month}`).once('value', snap => {
    
    if(snap.val()){
      snap.val().map((l, i )=> {
        this.state.data.push({id: i + 1, hiring: l})
           
      })
        this.setState({
          temp: true
        
      })
    }
      
  })
}

getWeekly= () => {
  var fate = new Date();
  var year = fate.toString().split(' ')[3];
  var month = fate.toString().split(' ')[1];
  var date = fate.toString().split(' ')[2]


firebase.database().ref(`graph/${year}/${month}`).once('value', snap => {

if(snap.val()){
  console.log(snap.val())
  var f = snap.val()
  var s = f.slice(Math.max(f.length - 7, 0))
  var len = snap.val().length
  s.map((l, i )=> {

    this.state.data.push({id: len = len -1, hiring: l})
       
  })
    this.setState({
      temp: true
    
  })
}
  
})
}

getYearly= () => {
  var fate = new Date();
  var year = fate.toString().split(' ')[3];
  var month = fate.toString().split(' ')[1];
  var date = fate.toString().split(' ')[2]
  

  

firebase.database().ref(`graph/${year}`).on('child_added', snap => {

    
          if(snap.val()){
  
  
      console.log(snap.val())
      
    var sum = snap.val().reduce((previous, current) => current += previous);
    var avg = sum / snap.val().length;

    this.state.data.push({id: snap.key, hiring: Math.round(avg)})
    console.log(this.state.data)
    this.setState({
      temp: true
    
  })
  
          }   
  })
  
    

}


    componentDidMount(){


      this.getWeekly()
  //     var fate = new Date();
  //     var year = fate.toString().split(' ')[3];
  //     var month = fate.toString().split(' ')[1];
  //     var date = fate.toString().split(' ')[2]
  
  // console.log(`graph/${year}/${month}/${date}`)
  // firebase.database().ref(`graph/${year}/${month}/${date}`).once('value', snap => {
    
  //   if(snap.val()){
  //   this.setState({
  //     count: snap.val()
  //   })
  //   }
      
  // })
    }

  render() {
    console.log('Graph')
    const { data } = this.state;
    return (
      this.state.temp && <AreaChart
        width={800}
        height={500}
        data={data}
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
    );
  }
}

export default Graph