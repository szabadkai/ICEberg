import { createContext } from '@lit/context';
import { AppState } from '../types';

export const appStateContext = createContext<AppState>(Symbol('app-state'));
