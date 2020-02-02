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
        this.state = {stdOut: 'Hello World'}
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
            </div>
        );
    }
}

class RandomizeButton extends React.Component {
    shuffle() {
        let messages = [
            "sdsclkf text one svkm sadf",
            "bnvdkx text two xcvirsdfc",
            "gbfowsdwefsd text three rjek",
            "twed text four cxgtlrkds",
            "sdsdgber text five sdiodss"
        ];

        let randNum = Math.floor(Math.random() * Math.floor(5));//5 = max 
        return messages[randNum];
    }
    render(){
        return  (
            <div className="bit-inputs">
                <button onClick={this.props.m.bind(null, this.shuffle())}>New Tip</button>
            </div>
        );
    }
}


export default App;
