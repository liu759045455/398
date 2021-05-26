module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "no-undef": 0,
    "prettier/prettier": "off"
  }
};
