

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

//executed after firing jsdom, ensuring the jsdom program closes down appropriately when all testing is completed. 
afterEach(() => {
  cleanup()
  
})



