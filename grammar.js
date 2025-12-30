/**
 * @file This is a parser for the Extended Backus Naur Form 
 * @author Shelton Louis <louisshelton0@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "ebnf",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
