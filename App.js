import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, ImageBackground} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';





export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    });
  };

  getWinner = () => {
    const NUMTILES = 3;
    let sum;
    const arr = this.state.gameState;

    for(let i = 0; i < NUMTILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if(sum == 3){
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    for(let i = 0; i < NUMTILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if(sum == 3){
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2]
      if(sum == 3){
        return 1;
      } else if (sum == -3) {
        return -1;
      }

    sum = arr[2][0] + arr[1][1] + arr[0][2]
      if(sum == 3){
        return 1;
      } else if (sum == -3) {
        return -1;
      }

    return 0;

  };

  onNewGame = () => {
    this.initializeGame()
  }

  onTilePress = (row, col) => {
    let value = this.state.gameState[row][col];
    if ( value !== 0){
      return;
    }


    const currentPlayer = this.state.currentPlayer;
    const arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = (currentPlayer == 1) ? -1: 1;
    this.setState({currentPlayer: nextPlayer});

    let winner = this.getWinner();
    if(winner == 1){
      Alert.alert("Cohete ganó");
      this.initializeGame();
    } else if (winner == -1){
      Alert.alert("Estrella ganó");
      this.initializeGame();
    }

  }

  renderIcon = (row, col) => {
    const value = this.state.gameState[row][col];
    switch(value){
      case 1: return <FontAwesome name="rocket" style={ styles.tileX } />
      case -1: return <FontAwesome name="star" style={ styles.tileO} />;
      default: return <View />;
    }
  };


  render() {
    return (
      <ImageBackground source={require('./assets/astro.jpg')} style={styles.container}>
      <View style={styles.container}>
      <View style={{paddingTop:20}} />
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, { borderTopWidth: 0}]} >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>  
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0}]}>
          {this.renderIcon(0, 2)}
          </TouchableOpacity>

         </View> 

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, { borderLeftWidth: 0}]} >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>  
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, { borderRightWidth: 0}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
         </View> 

         <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth: 0}]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
         </View> 
        <View style={{paddingTop:50}} />
        <Button title="Nuevo Juego" color="#841584" onPress={this.onNewGame}/>
        
      </View>
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 5,
    borderColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 50
  },

  tileX: {
    color: "white",
    fontSize: 50
  },

  tileO: {
    color: "white",
    fontSize: 50
  }

});
