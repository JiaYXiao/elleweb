//base code from https://github.com/vsc-github/react-character-slot-machine
import React from 'react';
import { Motion, spring, presets } from 'react-motion';
class AlphabetSpinner extends React.Component {
    constructor(){
        super();
        this.alphabets = '\', @-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.'.split('');
    }

    findPosition = (char) => {
        return this.alphabets.indexOf(char);
    }

    render(){
        return (
            <Motion defaultStyle={{top: 0}} style={{top: spring(this.findPosition(this.props.alphabet))}}>
                {val => {
                    let style = {
                        position: 'absolute',
                        top: (val.top*55)*-1
                    }
                    return (
                        <div className="bit">
                            <div style={style}>
                                {this.alphabets.map(char => {
                                    let bitClass = 'bit-char';
                                    if(char === this.props.alphabet){
                                        bitClass += ' active '
                                    }
                                    return <div key={char} className={bitClass}>{char}</div>
                                })}
                            </div>
                        </div>
                    )
                }}
            </Motion>
        )
    }
}

class CharSpinners extends React.Component {
    constructor(){
        super();
    }
    render(){
        let spinners = this.props.str.split('').map((alphabet, i) => <AlphabetSpinner key={i} alphabet={alphabet} />)
        return (
            <div className="holder">{spinners}</div>
        );
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {stdOut: "i. Don't waste food."}
    }

    setString(s){
        this.setState({stdOut: s});
    }

    render(){
        return (
            <div>
                <div className="headers">
                    <h1 className="white-text">ecoventure</h1>
                    <h2 className="white-text">How can you help?</h2>
                </div>
                <div className="bits">
                    <CharSpinners str={this.state.stdOut} />
                </div>
                <RandomizeButton m={this.setString.bind(this)} />
                {/* <DetailsParagraph text={this.setString.bind(this)} /> */}
            </div>
        );
    }
}

class RandomizeButton extends React.Component {
  randNumGen(a, b) {
    if (a % 2 == 0) {
      return b;
    } else {
      return (a + 1) % 5;
    }
  }  
  randGen() {
 return Math.floor(Math.random() * Math.floor(5));
  }
  shuffle(a, b) {
        let messages = [
            {
              title: "i. Don't waste food.",
              text: "Did you know that 56 million tonnes of food is wasted in Canaday every year? This isn't just a huge waste of money, it adds to the amount of CO2 being created in landfills."
            }, 
            {
              title: "ii. Recycle everything.",
              text: "Chances are that if you're thinking about taking on a more eco-friendly lifestyle then you'll already be recycling. Before you throw it away, take a minute to find out if you could recycle it instead."
            },
            {
              title:  "iii. Try to cut out plastic.",
              text:  "Plastic seems to have found its way into every single aspect of our lives. However, giving it up isn't as difficult as you might think - bring a canvas bag with you when you go shopping, buy your fruit and veg loose and stop buying bottled water."
            },
            {
              title: "iv. Grow your own vegetables.",
              text: "It isn't just a good way to save money, it's also a great way to cut down your carbon footprint and be eco friendly."
            },
            { 
              title:  "v. Take shorter showers.",
              text: "It is a quick and wasy way to save water."
            } 
        ];
        let randNum = this.randGen();
        // let randNum = this.randNumGen(a, b);
        // b = randNum;
        return messages[randNum];
    }

    render(){
      let x = 0
      let messages = [
        {
          title: "Don't waste food.",
          text: "1. Did you know that 56 million tonnes of food is wasted in Canaday every year? This isn't just a huge waste of money, it adds to the amount of CO2 being created in landfills."
        }, 
        {
          title: "Recycle everything.",
          text: "2. Chances are that if you're thinking about taking on a more eco-friendly lifestyle then you'll already be recycling. Before you throw it away, take a minute to find out if you could recycle it instead."
        },
        {
          title:  "Try to cut out plastic.",
          text:  "3. Plastic seems to have found its way into every single aspect of our lives. However, giving it up isn't as difficult as you might think - bring a canvas bag with you when you go shopping, buy your fruit and veg loose and stop buying bottled water."
        },
        {
          title: "Grow your own vegetables.",
          text: "4. It isn't just a good way to save money, it's also a great way to cut down your carbon footprint and be eco friendly."
        },
        { 
          title:  "Take shorter showers.",
          text: "5. It is a quick and wasy way to save water."
        } 
    ];
        return  (
            <div className="bit-inputs">
              <p>{messages[0].text}</p>
              <p>{messages[1].text}</p>
              <p>{messages[2].text}</p>
              <p>{messages[3].text}</p>
              <p>{messages[4].text}</p>
                {/* <p>{this.shuffle(1, 4).text}</p> */}
                {/* <button onClick={() => { x = this.randGen(); {this.props.m.bind(null, messages[x].title)}}}>New Tip</button> */}
                <button onClick= {this.props.m.bind(null, this.shuffle().title)}>New Tip</button>
            </div>
        );
    }
}

// class DetailsParagraph extends React.Component {
//   shuffle() {
//       let messages = [
//           "Don't waste food.",
//           "Recycle everything.",
//           "Try to cut out plastic.",
//           "Grow your own vegetables.",
//           "Take shorter showers."
//       ];


//       // "Don't waste food. Did you know that 56 million tonnes of food is wasted in Canaday every year? This isn't just a huge waste of money, it adds to the amount of CO2 being created in landfills.",
//       // "Recycle everything. Chances are that if you're thinking about taking on a more eco-friendly lifestyle then you'll already be recycling. Before you throw it away, take a minute to find out if you could recycle it instead.",
//       // "Try to cut out plastic. Plastic seems to have found its way into every single aspect of our lives. However, giving it up isn't as difficult as you might think - bring a canvas bag with you when you go shopping, buy your fruit and veg loose and stop buying bottled water.",
//       // "Grow your own vegetables. It isn't just a good way to save money, it's also a great way to cut down your carbon footprint and be eco friendly.",
//       // "Take shorter showers. It is a quick and wasy way to save water."

//       let randNum = Math.floor(Math.random() * Math.floor(5));
//       return messages[randNum];
//   }
//   render(){
//       return  (
//           <div>
//               <p>{this.props.text.bind(null, "hello")}</p>
//           </div>
//       );
//   }
// }


export default App;
