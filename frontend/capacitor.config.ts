import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.panteao.nordico.ia',
  appName: 'Panteão Nórdico IA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
