// interface ApiPathInterface {

// }
export const API_BASE_PATH = 'http://localhost:3555';
export const API_PATH = {
  import: `${API_BASE_PATH}/import`,
  currentBalance: `${API_BASE_PATH}/current-balance`,
} as const;
