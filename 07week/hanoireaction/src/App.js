import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    stacks : {
      a: [4,3,2,1],
      b: [],
      c: [],
    },
    startStack: null,
    error: '',


  };

  renderRings(letter){
    const stack = this.state.stacks[letter];
    return stack.map((ringStack, index)=>{
      return <p key={index}>{ringStack}</p>
    })
  }
  isValidMove(endStackLetter){
      const endStack = this.state.stacks[endStackLetter];


      if(endStack.length){
        const startStack = this.state.stacks[this.state.startStack];
        const startStackLastItem = startStack[startStack.length - 1];
        const endStackLastItem = endStack[endStack.length -1];
        return startStackLastItem < endStackLastItem;
      }
      return !endStack.length;
    }




  handleUserClick=(stack)=>{
    console.log('U-CLICKIT', stack)
    if(!this.state.startStack){
      this.setState({startStack:stack})
    }else{
      if (this.isValidMove(stack)){
        const endStackLetter = stack;
        const newStartStack = [...this.state.stacks[this.state.startStack]]
        const poppedPiece = newStartStack.pop();
        const newEndStack = [...this.state.stacks[endStackLetter]];
        newEndStack.push(poppedPiece);
        const newStacks = this.state.stacks;
        newStacks[this.state.startStack]=newStartStack;
        newStacks[endStackLetter] = newEndStack;
        this.setState({stacks: newStacks, error:''})
      }else{
        this.setState({error:'Illegal Move'})
      }

    }
  }

  render() {
    console.log(this.state.stacks);
    const stackStyle = {margin:40};
    return (
      <div className="App" style={{display:'flex'}}>
      <h3>Towers of Hanoi</h3>
        <div style ={stackStyle} onClick = {() => this.handleUserClick('a')}>Stack A{this.renderRings('a')}
        </div>
        <div style ={stackStyle} onClick = {() => this.handleUserClick('b')}>Stack B{this.renderRings('b')}</div>
        <div style ={stackStyle} onClick = {() => this.handleUserClick('c')}>Stack C{this.renderRings('c')}</div>
      </div>
    );
  }
}

export default App;
