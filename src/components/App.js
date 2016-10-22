import React, { Component } from 'react';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';

const shuffle = (array) => {
 var currentIndex = array.length, temporaryValue, randomIndex;

 // While there remain elements to shuffle...
 while (0 !== currentIndex) {

   // Pick a remaining element...
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;

   // And swap it with the current element.
   temporaryValue = array[currentIndex];
   array[currentIndex] = array[randomIndex];
   array[randomIndex] = temporaryValue;
 }

 return array;
}

class App extends Component {
  constructor(props) {
    super(props);

    let raffled = [];
    if(typeof window !== 'undefined' && window.localStorage.getItem('listSorted')){
      raffled = JSON.parse(window.localStorage.getItem('listSorted'));
    }

    this.state = {
      list: [],
      allList: [],
      sorted: false,
      raffled: raffled
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allList: nextProps.allAttendees,
      list: nextProps.allAttendees
    })
  }

  onClickSortMe() {
    const list = this.state.list.filter(user => this.state.raffled.indexOf(user.email) === -1)
    const user = shuffle(list)[0];

    if (!user) return;

    const raffled = this.state.raffled;
    raffled.unshift(user.email);
    if(typeof window !== 'undefined') window.localStorage.setItem('listSorted', JSON.stringify(raffled))
    this.setState({
      sorted: true,
      raffled
    })
  }

  handleChange(e) {
    this.setState({
      list: this.props.handleSearchAttends(e.target.value)
    });
  }


  render() {
    const { list, raffled, sorted } = this.state;
    return (
      <Grid>
        <h1 style={{textAlign: 'center'}}>Sorteio - FEC 2016</h1>
        <br />
        <div style={{textAlign: 'center'}}><Button bsSize="large" onClick={this.onClickSortMe.bind(this)}>Sorteio Agora!</Button></div>
        <br />
        <Row>
          <Col xs={10} md={8}>
          { sorted && raffled.slice(0,1).map(MapUsers(list)) }
          <br/>
          <br/>
          { sorted && raffled.slice(1,).map(MapUsers(list)) }
          { !sorted && raffled.slice(0,).map(MapUsers(list)) }
          </Col>
        </Row>
      </Grid>
    );
  }
}

const MapUsers = (list) => (email, index) => {
  const listFiltered = list.filter(user => user.email === email)
  const item = listFiltered.length > 0 ? listFiltered[0] : false;
  return item && <User key={index} item={item} />
}

const User = ({item, index}) => (
  <Panel header={item.name}></Panel>
);

export default App;
