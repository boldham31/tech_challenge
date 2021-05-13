import React, { useEffect, useState } from "react";
import './App.css';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import brycePhoto from '../src/bryce.jpg';
import songData from '../src/songData.json';
import { Storage, API } from 'aws-amplify';
import { gql, useQuery } from '@apollo/client';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'song', headerName: 'Name', width: 200 },
  { field: 'artist', headerName: 'Artist', width: 150 },
  { field: 'playCount', headerName: 'Play Count', width: 150 },
  { field: 'songReleaseDate', headerName: 'Release Date', width: 150 },
  { field: 'metricA', headerName: 'A' },
  { field: 'metricB', headerName: 'B' },
  { field: 'metricC', headerName: 'C' },
  { field: 'metricD', headerName: 'D' },
  { field: 'metricE', headerName: 'E' },
  { field: 'metricF', headerName: 'F' },
  { field: 'metricG', headerName: 'G' },
  { field: 'metricH', headerName: 'H' },
  { field: 'metricI', headerName: 'I' },
  { field: 'metricJ', headerName: 'J' },
  { field: 'metricK', headerName: 'K' },
  { field: 'metricL', headerName: 'L' },
  { field: 'metricM', headerName: 'M' },
  { field: 'metricN', headerName: 'N' },
  { field: 'metricO', headerName: 'O' },
  { field: 'metricP', headerName: 'P' },
]


const GET_SONG_DATA = gql`
query FetchSongData {
  fetchSongData(bucketName:"iheart-coding-challenge", key: "songData.json") {
    name,
    value
  }
}
`;


const App = () => {
  // Functional component version of component mount lifecycle hook
  return (
    <div className="App">
      <Router>
      <header className="App-header">
      <div className="Buttons-container">
        <NavigationButton route="songs" name="Songs" />
        <NavigationButton route="about-bryce" name="About Bryce" />
      </div>
      </header>
      <div>
        <Switch>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route path="/about-bryce">
            <AboutBryce />
          </Route>
          <Route path="/">
            <AboutBryce />
          </Route>
        </Switch>
      </div>
      </Router>
    </div>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Songs = () => {
  return (
  <div className="Songs-table">
    <h1>Songs Table</h1>
    <SongsTable />
  </div>
  );
}

const SongsTable = () => {
  const {loading, error, data } = useQuery(GET_SONG_DATA);
  var songs = useState([]);
  const classes = useStyles();
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (data) { 
    songs = JSON.parse(data.fetchSongData.value);
    songs.forEach((song, i) => {
      song.id = i;
    })
    console.log(songs);
  }

  return (
    <div style={{ height: '600px', width: '100%' }}>
    <DataGrid rows={songs} columns={columns} pageSize={200} />
    </div>
  )

}


const AboutBryce = () => {
  return (
  <div>
    <h1>About Bryce</h1>
    <div className="Bryce-photo">
      <img src={brycePhoto} alt="Bryce Photo"/>
    </div>
    <div className="Bryce-text">
      <p>I'm a senior developer, dedicated technologist, and avid basketball player with a passion for leading others through service. Excited to potentially join the team and make a difference!</p>
    </div>
  </div>
  );
}

const NavigationButton = (props) => {
  const history = useHistory();
  const handleClick = () => history.push('/' + props.route);
  return (
    <Button variant="contained" onClick={handleClick} color="primary">
      {props.name}
    </Button>
  );
}

export default App;
