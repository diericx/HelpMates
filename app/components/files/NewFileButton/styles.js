import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 75,
    backgroundColor: '$indigo',
    
    shadowRadius: 5,
    shadowOffset: {  
      width: 0,  
      height: 6,  
    },
    shadowColor: 'black',
    shadowOpacity: 0.3
  }
});

export default styles;