import { createRoot } from 'react-dom/client'
import { Container } from '@mui/material'
import App from './App'

const container = document.getElementById('root')

if (!container) {
	throw new Error('Root container missing in index.html')
}

createRoot(container).render(
	<Container>
		<App />
	</Container>
)
