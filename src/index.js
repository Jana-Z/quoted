import React from 'react';
import ReactDOM from 'react-dom';
import * as QuotesClass from './quotes.js'
import * as Styles from './styles.js'

const quotes = QuotesClass.QUOTES
const colours = Styles.COLOURS

class OutlineButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'inFocus': false
    }
    this.changeFocus = this.changeFocus.bind(this)
  }
  changeFocus(){
    this.setState((state) => ({
      'inFocus': !state.inFocus
    }))
  }
  render() {
    return (
      <button
        id="new-quote"
        onClick={this.props.handleClick}
        onMouseEnter={this.changeFocus}
        onMouseLeave={this.changeFocus}
        style={{border: "2px solid" + this.props.colour,
                transition: "all 0.5s ease",
                textAlign: 'right',
                position: 'absolute',
                right: '1em',
                bottom: '1em',
                cursor: 'pointer',
                backgroundColor: this.state.inFocus? this.props.colour : 'white',
                fontFamily: "'Titillium Web', sans-serif",
                borderRadius: "5px",
                color: this.state.inFocus ? "white" : "#696969"}}>
        Neues Zitat
      </button>
    )
  }
}

class QuoteBox extends React.Component {
  constructor(props){
      super(props);
      let quoteIndex = parseInt(Math.random()*(quotes.length))
      let colorIndex = parseInt(Math.random()*(colours.length))
      this.state = {
      'quote': quotes[quoteIndex],
      'colour': colours[colorIndex]
      }
      this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
      let newQuoteIndex = parseInt(Math.random()*(quotes.length))
      while(quotes[newQuoteIndex] === this.state.quote){
        newQuoteIndex = parseInt(Math.random()*(quotes.length))
      }
      let newColourIndex = parseInt(Math.random()*(colours.length))
      while(colours[newColourIndex] === this.state.colour){
        newColourIndex = parseInt(Math.random()*(colours.length))
      }
      this.setState({
          'quote': quotes[newQuoteIndex],
          'colour': colours[newColourIndex]
      })
  }
  render() {
      return (
      <div style={{height:'100%',
                  width:'100%',
                  backgroundColor:this.state.colour,
                  transition: "background-color 0.7s ease",
                  fontFamily: "'Titillium Web', sans-serif",
                  color: "#696969"}}>
        <div id="quote" style={Styles.QUOTE}>
          {this.state.quote.map(quote => (
            <div key={quote[0]}>
              <p style={{color: this.state.colour, transition: "all 0.7s ease"}}>"{quote[0]}"</p>
              <p> – {quote[1]}</p>
            </div>))}
          <OutlineButton handleClick={this.handleClick} colour={this.state.colour}/>
        </div>
      </div>)
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
