; Comments
(comment) @comment

; Markdown headings
(markdown_heading1) @tag
(markdown_heading) @tag

; Rule definitions
(syntax_rule
  (meta_identifier) @function)

; Identifiers and literals
(meta_identifier) @variable
(integer) @number
(terminal_string) @string
(special_sequence) @string.special

; Operators and separators
(defining_symbol) @operator
(terminator_symbol) @operator
(definition_separator) @operator
(concatenate_symbol) @operator
(repetition_symbol) @operator
(except_symbol) @operator
(range_operator) @operator

; Brackets
["(" ")" "[" "]" "{" "}"] @punctuation.bracket
