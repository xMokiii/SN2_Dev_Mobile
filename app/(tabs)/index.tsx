import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import DreamForm from '@/components/DreamForm'

export default function TabOneScreen() {
  return (
  <View style={styles.container}>
    <Text style={styles.title}>{"\n"}</Text>
    <Text style={styles.title}>Nouveau rêve ! 💭</Text>
    <Text style={styles.title}>{"\n"}</Text>
  <DreamForm/>
  </View>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6A5ACD',
},
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
