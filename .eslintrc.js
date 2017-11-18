module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  globals: {
    Expo: true,
    fetch: true
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  settings: {
    "import/resolver": {
      "babel-module": {}
    }
  },
  rules: {
    "react/prop-types": [0],
    "react/jsx-filename-extension": [0],
    "import/no-extraneous-dependencies": ["off"],
    "react/prefer-stateless-function": [0],
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
