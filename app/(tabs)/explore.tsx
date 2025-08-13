import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function ExploreScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screens.explore.title')}</Text>
      <Text style={styles.subtitle}>{t('screens.explore.subtitle')}</Text>
      <Text style={styles.description}>{t('screens.explore.description')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
