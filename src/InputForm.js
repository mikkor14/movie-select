import React from 'react';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comedyVal: '', actionVal: '', horrorVal: ''};
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    //The send data method is used to pass the input data to the parent App.js component via a callback function it recieves from props
    sendData(){
        const data = {
            comedyVal: this.state.comedyVal,
            actionVal: this.state.actionVal,
            horrorVal: this.state.horrorVal,
        };
        this.props.callbackFromParent(data);
    }

    //A simple input form for 3 genres, more to be added later!
    render() {
        return (
            <div className='inputForm'>
                <form>
                    <p>Choose what genre you prefer from 0 to 10</p>

                    <label>Comedy: </label>
                    <input type="number" max="10" name='comedyVal' onChange={this.handleChange}/>

                    <label>Action: </label>
                    <input type="number" max="10" name='actionVal' onChange={this.handleChange}/>

                    <label>Horror: </label>
                    <input type="number" max="10" name='horrorVal' onChange={this.handleChange}/>

                </form>
                <button onClick={this.sendData}>Confirm</button>
            </div>
        )
    }

}

export default InputForm;