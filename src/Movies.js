import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import MovieListItem from './MovieListItem';

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movies: []
    };

    this.getMovies = this.getMovies.bind(this);
  }

  getMovies() {
    const search = encodeURIComponent(this.state.search);
    fetch(`https://netflixroulette.net/api/api.php?actor=${search}`)
      .then(d => d.json())
      .then(d => {
        let movies = [];
        debugger;
        if (d && Array.isArray(d)) {
          movies = d.map(m => {
            return {
              id: m.show_id,
              title: m.show_title,
              year: m.release_year,
              poster: m.poster.replace(/http:\/\//,"https://")
            }
          })
        }
        this.setState({movies});
      })
      .catch(e => console.warn(e));
  }

  render() {
    const movies = this.state.movies.map(m => (
      <MovieListItem
        key={m.id}
        title={m.title}
        year={m.year}
        poster={m.poster}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={{flex: 0.2,
                      flexDirection: 'row',
                      width: "100%",
                      alignItems: 'flex-end',
                      justifyContent: 'space-around',
                      padding: 5,
                    }}>
            <TextInput
                style={{height: 55, alignSelf: 'flex-end', width: "70%", borderColor: 'grey', borderWidth: 1, padding: 5, fontSize: 20}}
                value={this.state.search}
                onChangeText={(search) => this.setState({search})}
             />
            <TouchableOpacity
                style={[styles.buttonContainer]}
                onPress={this.getMovies}
              >
              <Text style={styles.buttonText}>FIND</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={{flex:0.8, width: "95%"}}>
          {movies}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: "blue",
    padding:8,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  }
});
