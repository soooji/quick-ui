module.exports = {
  extends: [
    // ... your other extends
    "plugin:prettier/recommended"
  ],
  plugins: [
    // ... your other plugins
    "prettier"
  ],
  rules: {
    // ... your other rules
    "prettier/prettier": "error"
  }
};