import React, {Component} from 'react';
import videocamera from './videocamera.svg'
import './App.css';
import InputForm from './InputForm'
import {movies} from "./Movies";

class App extends Component {
    //The state handles the data which the application uses to calculate the average score and to display the movie best fitted for the result
    constructor(props) {
        super(props);
        this.state = {
            comedyVal: '',
            actionVal: '',
            horrorVal: '',
            movieResult: '',
            showMovieName: false,
        };
        this.findMovieFit = this.findMovieFit.bind(this);
    }

//The callback functions that is used to get the data from the input forms, stores the result data in the state
    myCallback = (dataFromChild) => {

        //Right now it only works for one use of the app, and then you have to reset the page or it will bug out and you will
        //only get The Room as a result. I would personally consider it a feature because The Room is the best movie of all time
        //but will fix it in the next update so you can resend data and get dynamic new result
        let comedyData = +this.state.comedyVal + +dataFromChild.comedyVal;
        let actionData = +this.state.actionVal + +dataFromChild.actionVal;
        let horrorData = +this.state.horrorVal + +dataFromChild.horrorVal;

        this.setState({
            comedyVal: comedyData,
            actionVal: actionData,
            horrorVal: horrorData,
        });

    };

//The algorithm for finding the best suited movie for the group
    findMovieFit(movieList) {

        movieList = {movies}.movies;

        //Since there are only 3 forms in the first version we divide by 3, will later implement dynamic values for how many users are added to the app
        let comedyScore = this.state.comedyVal / 3;
        let actionScore = this.state.actionVal / 3;
        let horrorScore = this.state.horrorVal / 3;

        //The main algorithm for finding the best suited movie. Uses the reduce() function and some quick maths
        //to go thought the list of movies and find the closest value for all the genre values.
        //it then returns the index of the found movie
        let result = movieList.reduce(function (r, a, i, aa) {
            return (
                (i && Math.abs(aa[r].genreComedy - comedyScore) < Math.abs(a.genreComedy - comedyScore) ? r : i) &&
                (i && Math.abs(aa[r].genreAction - actionScore) < Math.abs(a.genreAction - actionScore) ? r : i) &&
                (i && Math.abs(aa[r].genreHorror - horrorScore) < Math.abs(a.genreHorror - horrorScore) ? r : i)
            );
        }, -1);

        //For simplicity we just save the result's movie name in the state
        this.setState({
            movieResult: movieList[result].name,
            showMovieName: true
        });

    }

    render() {
        return (
            <div className="App">
                <div className="content-wrapper">
                    <header className="App-header">
                        <img src={videocamera} className="App-logo" alt="logo"/>
                        <div className='form-div'>
                            <InputForm callbackFromParent={this.myCallback}/>
                            <InputForm callbackFromParent={this.myCallback}/>
                            <InputForm callbackFromParent={this.myCallback}/>
                        </div>
                        <div className="button-div">
                            <button type="button" name="submit-forms-button" onClick={this.findMovieFit}>Find me a
                                movie
                            </button>
                            <p style={this.state.showMovieName ? {} : {display: 'none'}}>The best movie for your group
                                is: {this.state.movieResult}!</p>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

export default App;
