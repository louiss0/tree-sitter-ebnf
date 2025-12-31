/**
 * @file This is a parser for the Extended Backus Naur Form
 * @author Shelton Louis <louisshelton0@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const letter = /[A-Za-z]/;
const decimalDigit = /[0-9]/;

export default grammar({
  name: "ebnf",

  extras: ($) => [$._gap_separator, $.comment],
  word: ($) => $.meta_identifier,
  rules: {
    source_file: ($) =>
      seq(
        optional($.markdown_heading1),
        repeat($.markdown_heading),
        $.syntax_rule,
        repeat(choice($.markdown_heading, $.syntax_rule)),
      ),

    syntax_rule: ($) =>
      seq($.meta_identifier, $.defining_symbol, $.definitions_list, $.terminator_symbol),

    defining_symbol: (_) => choice("=", "::="),

    terminator_symbol: (_) => choice(";", "."),

    definitions_list: ($) =>
      seq($.single_definition, repeat(seq($.definition_separator, $.single_definition))),

    definition_separator: (_) => choice("|", "/"),

    single_definition: ($) =>
      seq($.syntactic_term, repeat(seq(optional($.concatenate_symbol), $.syntactic_term))),

    syntactic_term: ($) =>
      seq($.syntactic_factor, optional(seq($.except_symbol, $.syntactic_exception))),

    syntactic_exception: ($) => $.syntactic_factor,

    syntactic_factor: ($) =>
      choice(seq($.integer, $.repetition_symbol, $.syntactic_primary), $.syntactic_primary),

    syntactic_primary: ($) =>
      choice(
        $.optional_sequence,
        $.repeated_sequence,
        $.grouped_sequence,
        $.character_range,
        $.meta_identifier,
        $.terminal_string,
        $.special_sequence,
      ),

    optional_sequence: ($) => seq("[", $.definitions_list, "]"),

    repeated_sequence: ($) => seq("{", $.definitions_list, "}"),

    grouped_sequence: ($) => seq("(", $.definitions_list, ")"),

    character_range: ($) => seq($.terminal_string, $.range_operator, $.terminal_string),

    terminal_string: (_) =>
      token(choice(seq("'", /[^'\r\n]+/, "'"), seq('"', /[^"\r\n]+/, '"'))),

    special_sequence: (_) => token(seq("?", /[^?\r\n]*/, "?")),

    repetition_symbol: (_) => "*",
    except_symbol: (_) => "-",
    concatenate_symbol: (_) => ",",
    range_operator: (_) => "…",

    meta_identifier: (_) => token(prec(1, /[A-Za-z0-9_]+/)),

    integer: (_) => token(prec(2, repeat1(decimalDigit))),

    _meta_identifier_character: (_) => choice(letter, decimalDigit, "_"),

    letter: (_) => letter,

    decimal_digit: (_) => decimalDigit,

    _gap_separator: (_) => /[ \t\r\n]+/,

    comment: (_) => /\(\*[^)*(]+\*\)/,

    markdown_heading1: (_) => token(seq("#", /[^#\r\n][^\r\n]*/)),
    markdown_heading: (_) => token(seq(/#{2,6}/, /[^#\r\n][^\r\n]*/)),
  },
});
