import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  server:{
	  proxy:{
		  '/api':{
			  target: "http://localhost:7217",
			  changeOrigin:true,
			  rewrite:(path) => path.replace(/^\/api/, '')
		  }
	  }
  }
})
