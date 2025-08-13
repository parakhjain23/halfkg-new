export const theme = {
  colors: {
    // Primary colors
    primary: '#000000',
    secondary: '#FFFFFF',
    
    // Background colors
    background: '#FFFFFF',
    surface: '#FFFFFF',
    
    // Text colors
    text: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#999999',
      inverse: '#FFFFFF',
    },
    
    // Border colors
    border: {
      light: '#F0F0F0',
      medium: '#E0E0E0',
      dark: '#CCCCCC',
    },
    
    // Status colors
    status: {
      success: '#28a745',
      warning: '#ffc107',
      info: '#007bff',
      error: '#dc3545',
      delivered: '#28a745',
      inTransit: '#ffc107',
      processing: '#007bff',
    },
    
    // Menu icon background colors (ProfileScreen)
    menuIcons: {
      orders: '#E6F3FF',
      address: '#E8F5E8',
      payment: '#FFE8F0',
      notifications: '#F0E8FF',
      help: '#FFFACD',
      about: '#FFE8E0',
    },
    
    // Shadow
    shadow: '#000000',
  },
  
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
    xxl: 40,
  },
  
  borderRadius: {
    sm: 8,
    md: 15,
    lg: 20,
    xl: 25,
    round: 50,
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: 'bold',
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
  },
};