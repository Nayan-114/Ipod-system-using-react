import React from 'react';
import Screen from './Screen';
import ZingTouch from 'zingtouch';
import sound from './assets/music/Senorita.mp3'

class Ipod extends React.Component
{
    constructor() 
    {
        super();
        this.state = {
            activeItem: "NowPlaying",
            activePage:'Home',
            enter: 0,
            play:true
        }
    }
    rotateWheel = () =>
    {
        var containerElement = document.getElementById('inner-container');
        var activeRegion = new ZingTouch.Region(containerElement);
        var change = 0;
        var self = this;
        self.state.enter = self.state.enter + 1;

        if(self.state.enter < 2)    //This is done so that it only activates when user drag with mouse
        {                            //It only hovers than its value is continously changing but upon drag its value changes only one time
            activeRegion.bind(containerElement,'rotate',function(event)
            {
                var newAngle = event.detail.distanceFromLast;
                console.log(newAngle);
                if(newAngle < 0)    //Rotate anti-clockwise
                {
                    console.log('newAngle < 0');
                    console.log(change);
                    change++;
                    if(change === 15)
                    {
                        console.log("Change state");
                        change = 0;
                        
                        if(self.state.activePage === 'Home')
                        {
                                if(self.state.activeItem === 'NowPlaying')
                                {
                                    self.setState({
                                        activeItem: "Music"
                                    })
                                }
                                else if(self.state.activeItem === 'Music')
                                {
                                    self.setState({
                                        activeItem: "Games"
                                    })
                                }
                                else if(self.state.activeItem === 'Games')
                                {
                                    self.setState({
                                        activeItem : "Settings"
                                    })
                                }
                                else if(self.state.activeItem === 'Settings')
                                {
                                    self.setState({
                                        activeItem : "NowPlaying"
                                    })
                                }
                        }
                        else if(self.state.activePage === 'Music')
                        {   
                                if(self.state.activeItem === 'MyMusic'){
                                    self.setState({
                                        activeItem : "Artists"
                                    })
                                }
                                else if(self.state.activeItem === 'Artists'){
                                    self.setState({
                                        activeItem : "MyMusic"
                                    })
                                }
                        }
                    }
                }
                else    //Rotate clockwise
                {
                    console.log('newAngle > 0');
                    console.log(change);
                    change++;
                    if(change === 15)
                    {
                        console.log("Change state");
                        change = 0;
                        if(self.state.activePage === 'Home')
                        {
                                if(self.state.activeItem === 'NowPlaying')
                                {
                                    self.setState({
                                        activeItem : "Settings"
                                    })
                                }
                                else if(self.state.activeItem === 'Music')
                                {
                                    self.setState({
                                        activeItem : "NowPlaying"
                                    })
                                }
                                else if(self.state.activeItem === 'Games')
                                {
                                    self.setState({
                                        activeItem : "Music"
                                    })
                                }
                                else if(self.state.activeItem === 'Settings')
                                {
                                    self.setState({
                                        activeItem : "Games"
                                    })
                                }
                        }
                        else if(self.state.activePage === 'Music')
                        {
                                if(self.state.activeItem === 'MyMusic')
                                {
                                    self.setState({
                                        activeItem : "Artists"
                                    })
                                }
                                else if(self.state.activeItem === 'Artists')
                                {
                                    self.setState({
                                        activeItem : "MyMusic"
                                    })
                                }
                        }
                    }
                }
            });
        }
        else{
            console.log("Not allowed to enter");
        }
    }
    changePageToHomeScreen = () =>
    {
        console.log('Home screen button');
    }
    changePage = () =>
    {
        console.log('Change Page');
    }
    toggle = () =>
    {
        console.log('Toggle button');
    }
    componentDidMount() //Adding a new state (audio) here
    {
        let audio = document.getElementsByClassName("audio-element");
        console.log(audio);
        this.setState({
            audio:audio
        })
        console.log(this.state);
    }
    render()
    {
        return(
        <div style = {styles.ipodContainer}>

            <audio className = "audio-element">
                <source src={sound}></source>
            </audio>
            
            <Screen activeItem={this.state.activeItem} activePage={this.state.activePage} audio={this.state.audio} />

            <div id='inner-container' style={styles.wheel} onMouseOver={this.rotateWheel}>
                
                <div style = {styles.buttonContainer}>
                    <div style = {styles.menuButton}>
                        <i onClick={this.changePageToHomeScreen} style = {styles.image} className="fas fa-bars"></i>
                    </div>
                </div>
                
                <div style = {styles.buttonContainer}>
                    <div style = {styles.middleButtons}>
                            
                            <i style = {styles.image} className="fas fa-fast-backward"></i>
                            <div onClick={this.changePage} style={{backgroundImage: 'linear-gradient(45deg, #8c8181, transparent)' , width : '5rem' , height : '5rem' , borderRadius : '50%'}}></div>
                            <i style = {styles.image} className="fas fa-fast-forward"></i>

                    </div>
                </div>

                <div style = {styles.buttonContainer}>
                        <div onClick={this.toggle} style = {styles.playButton}>
                            <i onClick={this.toggle} style = {styles.image} className="fas fa-play"></i>&nbsp;<i onClick={this.toggle} style = {styles.image} className="fas fa-pause"></i>
                        </div>
                </div>

            </div>
            
        </div>
        );}
}
const styles = {
    ipodContainer : {
        height : '33rem',
        width : '20rem',
        backgroundImage: 'radial-gradient(#adb1b5, #4d4f50)',
        margin : '4rem auto',
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        borderRadius : '24px'
        
    },
    wheel : {
        width : '75%',
        height : '40%',
        margin : '1rem auto',
        backgroundColor : '#4b4e52',
        borderRadius : '50%',
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center'
    },
    buttonContainer : {
        width : '85%',
        height : '30%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    menuButton : {
        alignSelf:'center'
    },
    playButton : {
        alignSelf:'center'
    },
    middleButtons : {
        alignSelf:'center',
        width : '100%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    image: {
        alignSelf : 'center',
        fontSize: '1.5rem',
        color : 'white'
    },
}
export default Ipod;