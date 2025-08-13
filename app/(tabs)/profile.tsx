import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setUser,
  clearUser,
  selectCurrentUser,
  selectIsAuthenticated
} from '@/store/slices/userSlice';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogin = () => {
    const mockUser = {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@example.com',
      avatar: 'https://via.placeholder.com/100',
    };
    dispatch(setUser(mockUser));
    Alert.alert('Успех', 'Вы успешно вошли в систему!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Выйти', 
          style: 'destructive',
          onPress: () => dispatch(clearUser())
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screens.profile.title')}</Text>
      <Text style={styles.subtitle}>{t('screens.profile.subtitle')}</Text>
      <Text style={styles.description}>{t('screens.profile.description')}</Text>
      
      <View style={styles.profileSection}>
        {isAuthenticated && currentUser ? (
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#007AFF" />
            </View>
            <Text style={styles.userName}>{currentUser.name}</Text>
            <Text style={styles.userEmail}>{currentUser.email}</Text>
            
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Выйти</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loginSection}>
            <Ionicons name="person-circle-outline" size={80} color="#ccc" />
            <Text style={styles.notLoggedInText}>Вы не авторизованы</Text>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Ionicons name="log-in-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 30,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  loginSection: {
    alignItems: 'center',
  },
  notLoggedInText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
