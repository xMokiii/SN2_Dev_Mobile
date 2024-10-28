import { StyleSheet,ScrollView} from 'react-native';
import { Text, View } from '@/components/Themed';
import DreamList from '@/components/DreamList';


export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{"\n"}</Text>
        <DreamList/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
