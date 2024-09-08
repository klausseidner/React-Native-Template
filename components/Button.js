// Por enquanto este componente é apenas um teste.
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';

const Button = ({ title, onPress, loading = false }) => (
  <TouchableOpacity
    onPress={onPress}
    style={tailwind('bg-blue-500 p-3 rounded')}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={tailwind('text-white text-center font-bold')}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default Button;
