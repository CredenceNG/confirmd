import type { RootState } from '../../store/configureStore'

import { useSelector } from 'react-redux'

export const useConfirmedPerson = () => useSelector((state: RootState) => state.confirmedPerson)
