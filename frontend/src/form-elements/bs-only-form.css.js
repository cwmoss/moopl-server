import { css } from "./../../vendor/lit-core.min.js";
export const bootstrapformstyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :xxxhost {
    margin: 0;
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    background-color: var(--bs-body-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  hr {
    margin: 1rem 0;
    color: inherit;
    border: 0;
    border-top: var(--bs-border-width) solid;
    opacity: 0.25;
  }

  h6,
  .h6,
  h5,
  .h5,
  h4,
  .h4,
  h3,
  .h3,
  h2,
  .h2,
  h1,
  .h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: var(--bs-heading-color);
  }

  h1,
  .h1 {
    font-size: calc(1.375rem + 1.5vw);
  }
  @media (min-width: 1200px) {
    h1,
    .h1 {
      font-size: 2.5rem;
    }
  }
  h2,
  .h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  @media (min-width: 1200px) {
    h2,
    .h2 {
      font-size: 2rem;
    }
  }
  h3,
  .h3 {
    font-size: calc(1.3rem + 0.6vw);
  }
  @media (min-width: 1200px) {
    h3,
    .h3 {
      font-size: 1.75rem;
    }
  }
  h4,
  .h4 {
    font-size: calc(1.275rem + 0.3vw);
  }
  @media (min-width: 1200px) {
    h4,
    .h4 {
      font-size: 1.5rem;
    }
  }
  h5,
  .h5 {
    font-size: 1.25rem;
  }

  h6,
  .h6 {
    font-size: 1rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  abbr[title] {
    text-decoration: underline dotted;
    cursor: help;
    text-decoration-skip-ink: none;
  }

  address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  ol,
  ul {
    padding-left: 2rem;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: 0.5rem;
    margin-left: 0;
  }

  blockquote {
    margin: 0 0 1rem;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small,
  .small {
    font-size: 0.875em;
  }

  mark,
  .mark {
    padding: 0.1875em;
    color: var(--bs-highlight-color);
    background-color: var(--bs-highlight-bg);
  }

  sub,
  sup {
    position: relative;
    font-size: 0.75em;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  a {
    color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
    text-decoration: underline;
  }
  a:hover {
    --bs-link-color-rgb: var(--bs-link-hover-color-rgb);
  }

  a:not([href]):not([class]),
  a:not([href]):not([class]):hover {
    color: inherit;
    text-decoration: none;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: var(--bs-font-monospace);
    font-size: 1em;
  }

  pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
    font-size: 0.875em;
  }
  pre code {
    font-size: inherit;
    color: inherit;
    word-break: normal;
  }

  code {
    font-size: 0.875em;
    color: var(--bs-code-color);
    word-wrap: break-word;
  }
  a > code {
    color: inherit;
  }

  kbd {
    padding: 0.1875rem 0.375rem;
    font-size: 0.875em;
    color: var(--bs-body-bg);
    background-color: var(--bs-body-color);
    border-radius: 0.25rem;
  }
  kbd kbd {
    padding: 0;
    font-size: 1em;
  }

  figure {
    margin: 0 0 1rem;
  }

  img,
  svg {
    vertical-align: middle;
  }

  table {
    caption-side: bottom;
    border-collapse: collapse;
  }

  caption {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: var(--bs-secondary-color);
    text-align: left;
  }

  th {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }

  thead,
  tbody,
  tfoot,
  tr,
  td,
  th {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  label {
    display: inline-block;
  }

  button {
    border-radius: 0;
  }

  button:focus:not(:focus-visible) {
    outline: 0;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  select {
    text-transform: none;
  }

  [role="button"] {
    cursor: pointer;
  }

  select {
    word-wrap: normal;
  }
  select:disabled {
    opacity: 1;
  }

  [list]:not([type="date"]):not([type="datetime-local"]):not(
      [type="month"]
    ):not([type="week"]):not([type="time"])::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  button:not(:disabled),
  [type="button"]:not(:disabled),
  [type="reset"]:not(:disabled),
  [type="submit"]:not(:disabled) {
    cursor: pointer;
  }

  ::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  textarea {
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    float: left;
    width: 100%;
    padding: 0;
    margin-bottom: 0.5rem;
    font-size: calc(1.275rem + 0.3vw);
    line-height: inherit;
  }
  @media (min-width: 1200px) {
    legend {
      font-size: 1.5rem;
    }
  }
  legend + * {
    clear: left;
  }

  ::-webkit-datetime-edit-fields-wrapper,
  ::-webkit-datetime-edit-text,
  ::-webkit-datetime-edit-minute,
  ::-webkit-datetime-edit-hour-field,
  ::-webkit-datetime-edit-day-field,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-year-field {
    padding: 0;
  }

  ::-webkit-inner-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  /* rtl:raw:
[type="tel"],
[type="url"],
[type="email"],
[type="number"] {
  direction: ltr;
}
*/
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  ::file-selector-button {
    font: inherit;
    -webkit-appearance: button;
  }

  output {
    display: inline-block;
  }

  iframe {
    border: 0;
  }

  summary {
    display: list-item;
    cursor: pointer;
  }

  progress {
    vertical-align: baseline;
  }

  [hidden] {
    display: none !important;
  }

  .lead {
    font-size: 1.25rem;
    font-weight: 300;
  }

  .display-1 {
    font-size: calc(1.625rem + 4.5vw);
    font-weight: 300;
    line-height: 1.2;
  }
  @media (min-width: 1200px) {
    .display-1 {
      font-size: 5rem;
    }
  }
  .display-2 {
    font-size: calc(1.575rem + 3.9vw);
    font-weight: 300;
    line-height: 1.2;
  }
  @media (min-width: 1200px) {
    .display-2 {
      font-size: 4.5rem;
    }
  }
  .display-3 {
    font-size: calc(1.525rem + 3.3vw);
    font-weight: 300;
    line-height: 1.2;
  }
  @media (min-width: 1200px) {
    .display-3 {
      font-size: 4rem;
    }
  }
  .display-4 {
    font-size: calc(1.475rem + 2.7vw);
    font-weight: 300;
    line-height: 1.2;
  }
  @media (min-width: 1200px) {
    .display-4 {
      font-size: 3.5rem;
    }
  }
  .display-5 {
    font-size: calc(1.425rem + 2.1vw);
    font-weight: 300;
    line-height: 1.2;
  }
  @media (min-width: 1200px) {
    .display-5 {
      font-size: 3rem;
    }
  }
  .display-6 {
    font-size: calc(1.375rem + 1.5vw);
    font-weight: 300;
    line-height: 1.2;
  }
  @media (min-width: 1200px) {
    .display-6 {
      font-size: 2.5rem;
    }
  }
  .list-unstyled {
    padding-left: 0;
    list-style: none;
  }

  .list-inline {
    padding-left: 0;
    list-style: none;
  }

  .list-inline-item {
    display: inline-block;
  }
  .list-inline-item:not(:last-child) {
    margin-right: 0.5rem;
  }

  .initialism {
    font-size: 0.875em;
    text-transform: uppercase;
  }

  .blockquote {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  .blockquote > :last-child {
    margin-bottom: 0;
  }

  .blockquote-footer {
    margin-top: -1rem;
    margin-bottom: 1rem;
    font-size: 0.875em;
    color: #6c757d;
  }
  .blockquote-footer::before {
    content: "\u2014\u00A0";
  }

  .form-label {
    margin-bottom: 0.5rem;
  }

  .col-form-label {
    padding-top: calc(0.375rem + var(--bs-border-width));
    padding-bottom: calc(0.375rem + var(--bs-border-width));
    margin-bottom: 0;
    font-size: inherit;
    line-height: 1.5;
  }

  .col-form-label-lg {
    padding-top: calc(0.5rem + var(--bs-border-width));
    padding-bottom: calc(0.5rem + var(--bs-border-width));
    font-size: 1.25rem;
  }

  .col-form-label-sm {
    padding-top: calc(0.25rem + var(--bs-border-width));
    padding-bottom: calc(0.25rem + var(--bs-border-width));
    font-size: 0.875rem;
  }

  .form-text {
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: var(--bs-secondary-color);
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    appearance: none;
    background-color: var(--bs-body-bg);
    background-clip: padding-box;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control {
      transition: none;
    }
  }
  .form-control[type="file"] {
    overflow: hidden;
  }
  .form-control[type="file"]:not(:disabled):not([readonly]) {
    cursor: pointer;
  }
  .form-control:focus {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  .form-control::-webkit-date-and-time-value {
    min-width: 85px;
    height: 1.5em;
    margin: 0;
  }
  .form-control::-webkit-datetime-edit {
    display: block;
    padding: 0;
  }
  .form-control::placeholder {
    color: var(--bs-secondary-color);
    opacity: 1;
  }
  .form-control:disabled {
    background-color: var(--bs-secondary-bg);
    opacity: 1;
  }
  .form-control::file-selector-button {
    padding: 0.375rem 0.75rem;
    margin: -0.375rem -0.75rem;
    margin-inline-end: 0.75rem;
    color: var(--bs-body-color);
    background-color: var(--bs-tertiary-bg);
    pointer-events: none;
    border-color: inherit;
    border-style: solid;
    border-width: 0;
    border-inline-end-width: var(--bs-border-width);
    border-radius: 0;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control::file-selector-button {
      transition: none;
    }
  }
  .form-control:hover:not(:disabled):not([readonly])::file-selector-button {
    background-color: var(--bs-secondary-bg);
  }

  .form-control-plaintext {
    display: block;
    width: 100%;
    padding: 0.375rem 0;
    margin-bottom: 0;
    line-height: 1.5;
    color: var(--bs-body-color);
    background-color: transparent;
    border: solid transparent;
    border-width: var(--bs-border-width) 0;
  }
  .form-control-plaintext:focus {
    outline: 0;
  }
  .form-control-plaintext.form-control-sm,
  .form-control-plaintext.form-control-lg {
    padding-right: 0;
    padding-left: 0;
  }

  .form-control-sm {
    min-height: calc(1.5em + 0.5rem + calc(var(--bs-border-width) * 2));
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: var(--bs-border-radius-sm);
  }
  .form-control-sm::file-selector-button {
    padding: 0.25rem 0.5rem;
    margin: -0.25rem -0.5rem;
    margin-inline-end: 0.5rem;
  }

  .form-control-lg {
    min-height: calc(1.5em + 1rem + calc(var(--bs-border-width) * 2));
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: var(--bs-border-radius-lg);
  }
  .form-control-lg::file-selector-button {
    padding: 0.5rem 1rem;
    margin: -0.5rem -1rem;
    margin-inline-end: 1rem;
  }

  textarea.form-control {
    min-height: calc(1.5em + 0.75rem + calc(var(--bs-border-width) * 2));
  }

  textarea.form-control-sm {
    min-height: calc(1.5em + 0.5rem + calc(var(--bs-border-width) * 2));
  }

  textarea.form-control-lg {
    min-height: calc(1.5em + 1rem + calc(var(--bs-border-width) * 2));
  }

  .form-control-color {
    width: 3rem;
    height: calc(1.5em + 0.75rem + calc(var(--bs-border-width) * 2));
    padding: 0.375rem;
  }
  .form-control-color:not(:disabled):not([readonly]) {
    cursor: pointer;
  }
  .form-control-color::-moz-color-swatch {
    border: 0 !important;
    border-radius: var(--bs-border-radius);
  }
  .form-control-color::-webkit-color-swatch {
    border: 0 !important;
    border-radius: var(--bs-border-radius);
  }
  .form-control-color.form-control-sm {
    height: calc(1.5em + 0.5rem + calc(var(--bs-border-width) * 2));
  }
  .form-control-color.form-control-lg {
    height: calc(1.5em + 1rem + calc(var(--bs-border-width) * 2));
  }

  .form-select {
    --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    appearance: none;
    background-color: var(--bs-body-bg);
    background-image: var(--bs-form-select-bg-img),
      var(--bs-form-select-bg-icon, none);
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-select {
      transition: none;
    }
  }
  .form-select:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  .form-select[multiple],
  .form-select[size]:not([size="1"]) {
    padding-right: 0.75rem;
    background-image: none;
  }
  .form-select:disabled {
    background-color: var(--bs-secondary-bg);
  }
  .form-select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 var(--bs-body-color);
  }

  .form-select-sm {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    font-size: 0.875rem;
    border-radius: var(--bs-border-radius-sm);
  }

  .form-select-lg {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    font-size: 1.25rem;
    border-radius: var(--bs-border-radius-lg);
  }

  [data-bs-theme="dark"] .form-select {
    --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23dee2e6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  }

  .form-check {
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5em;
    margin-bottom: 0.125rem;
  }
  .form-check .form-check-input {
    float: left;
    margin-left: -1.5em;
  }

  .form-check-reverse {
    padding-right: 1.5em;
    padding-left: 0;
    text-align: right;
  }
  .form-check-reverse .form-check-input {
    float: right;
    margin-right: -1.5em;
    margin-left: 0;
  }

  .form-check-input {
    --bs-form-check-bg: var(--bs-body-bg);
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.25em;
    vertical-align: top;
    appearance: none;
    background-color: var(--bs-form-check-bg);
    background-image: var(--bs-form-check-bg-image);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: var(--bs-border-width) solid var(--bs-border-color);
    print-color-adjust: exact;
  }
  .form-check-input[type="checkbox"] {
    border-radius: 0.25em;
  }
  .form-check-input[type="radio"] {
    border-radius: 50%;
  }
  .form-check-input:active {
    filter: brightness(90%);
  }
  .form-check-input:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  .form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
  .form-check-input:checked[type="checkbox"] {
    --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
  }
  .form-check-input:checked[type="radio"] {
    --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
  }
  .form-check-input[type="checkbox"]:indeterminate {
    background-color: #0d6efd;
    border-color: #0d6efd;
    --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
  }
  .form-check-input:disabled {
    pointer-events: none;
    filter: none;
    opacity: 0.5;
  }
  .form-check-input[disabled] ~ .form-check-label,
  .form-check-input:disabled ~ .form-check-label {
    cursor: default;
    opacity: 0.5;
  }

  .form-switch {
    padding-left: 2.5em;
  }
  .form-switch .form-check-input {
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
    width: 2em;
    margin-left: -2.5em;
    background-image: var(--bs-form-switch-bg);
    background-position: left center;
    border-radius: 2em;
    transition: background-position 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-switch .form-check-input {
      transition: none;
    }
  }
  .form-switch .form-check-input:focus {
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e");
  }
  .form-switch .form-check-input:checked {
    background-position: right center;
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
  }
  .form-switch.form-check-reverse {
    padding-right: 2.5em;
    padding-left: 0;
  }
  .form-switch.form-check-reverse .form-check-input {
    margin-right: -2.5em;
    margin-left: 0;
  }

  .form-check-inline {
    display: inline-block;
    margin-right: 1rem;
  }

  .btn-check {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
  .btn-check[disabled] + .btn,
  .btn-check:disabled + .btn {
    pointer-events: none;
    filter: none;
    opacity: 0.65;
  }

  [data-bs-theme="dark"]
    .form-switch
    .form-check-input:not(:checked):not(:focus) {
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e");
  }

  .form-range {
    width: 100%;
    height: 1.5rem;
    padding: 0;
    appearance: none;
    background-color: transparent;
  }
  .form-range:focus {
    outline: 0;
  }
  .form-range:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  .form-range:focus::-moz-range-thumb {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  .form-range::-moz-focus-outer {
    border: 0;
  }
  .form-range::-webkit-slider-thumb {
    width: 1rem;
    height: 1rem;
    margin-top: -0.25rem;
    appearance: none;
    background-color: #0d6efd;
    border: 0;
    border-radius: 1rem;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-range::-webkit-slider-thumb {
      transition: none;
    }
  }
  .form-range::-webkit-slider-thumb:active {
    background-color: #b6d4fe;
  }
  .form-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5rem;
    color: transparent;
    cursor: pointer;
    background-color: var(--bs-secondary-bg);
    border-color: transparent;
    border-radius: 1rem;
  }
  .form-range::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    appearance: none;
    background-color: #0d6efd;
    border: 0;
    border-radius: 1rem;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-range::-moz-range-thumb {
      transition: none;
    }
  }
  .form-range::-moz-range-thumb:active {
    background-color: #b6d4fe;
  }
  .form-range::-moz-range-track {
    width: 100%;
    height: 0.5rem;
    color: transparent;
    cursor: pointer;
    background-color: var(--bs-secondary-bg);
    border-color: transparent;
    border-radius: 1rem;
  }
  .form-range:disabled {
    pointer-events: none;
  }
  .form-range:disabled::-webkit-slider-thumb {
    background-color: var(--bs-secondary-color);
  }
  .form-range:disabled::-moz-range-thumb {
    background-color: var(--bs-secondary-color);
  }

  .form-floating {
    position: relative;
  }
  .form-floating > .form-control,
  .form-floating > .form-control-plaintext,
  .form-floating > .form-select {
    height: calc(3.5rem + calc(var(--bs-border-width) * 2));
    min-height: calc(3.5rem + calc(var(--bs-border-width) * 2));
    line-height: 1.25;
  }
  .form-floating > label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    padding: 1rem 0.75rem;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    border: var(--bs-border-width) solid transparent;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-floating > label {
      transition: none;
    }
  }
  .form-floating > .form-control,
  .form-floating > .form-control-plaintext {
    padding: 1rem 0.75rem;
  }
  .form-floating > .form-control::placeholder,
  .form-floating > .form-control-plaintext::placeholder {
    color: transparent;
  }
  .form-floating > .form-control:focus,
  .form-floating > .form-control:not(:placeholder-shown),
  .form-floating > .form-control-plaintext:focus,
  .form-floating > .form-control-plaintext:not(:placeholder-shown) {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
  }
  .form-floating > .form-control:-webkit-autofill,
  .form-floating > .form-control-plaintext:-webkit-autofill {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
  }
  .form-floating > .form-select {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
  }
  .form-floating > .form-control:focus ~ label,
  .form-floating > .form-control:not(:placeholder-shown) ~ label,
  .form-floating > .form-control-plaintext ~ label,
  .form-floating > .form-select ~ label {
    color: rgba(var(--bs-body-color-rgb), 0.65);
    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
  }
  .form-floating > .form-control:focus ~ label::after,
  .form-floating > .form-control:not(:placeholder-shown) ~ label::after,
  .form-floating > .form-control-plaintext ~ label::after,
  .form-floating > .form-select ~ label::after {
    position: absolute;
    inset: 1rem 0.375rem;
    z-index: -1;
    height: 1.5em;
    content: "";
    background-color: var(--bs-body-bg);
    border-radius: var(--bs-border-radius);
  }
  .form-floating > .form-control:-webkit-autofill ~ label {
    color: rgba(var(--bs-body-color-rgb), 0.65);
    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
  }
  .form-floating > .form-control-plaintext ~ label {
    border-width: var(--bs-border-width) 0;
  }
  .form-floating > :disabled ~ label,
  .form-floating > .form-control:disabled ~ label {
    color: #6c757d;
  }
  .form-floating > :disabled ~ label::after,
  .form-floating > .form-control:disabled ~ label::after {
    background-color: var(--bs-secondary-bg);
  }

  .input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
  }
  .input-group > .form-control,
  .input-group > .form-select,
  .input-group > .form-floating {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }
  .input-group > .form-control:focus,
  .input-group > .form-select:focus,
  .input-group > .form-floating:focus-within {
    z-index: 5;
  }
  .input-group .btn {
    position: relative;
    z-index: 2;
  }
  .input-group .btn:focus {
    z-index: 5;
  }

  .input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    text-align: center;
    white-space: nowrap;
    background-color: var(--bs-tertiary-bg);
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
  }

  .input-group-lg > .form-control,
  .input-group-lg > .form-select,
  .input-group-lg > .input-group-text,
  .input-group-lg > .btn {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: var(--bs-border-radius-lg);
  }

  .input-group-sm > .form-control,
  .input-group-sm > .form-select,
  .input-group-sm > .input-group-text,
  .input-group-sm > .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: var(--bs-border-radius-sm);
  }

  .input-group-lg > .form-select,
  .input-group-sm > .form-select {
    padding-right: 3rem;
  }

  .input-group:not(.has-validation)
    > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(
      .form-floating
    ),
  .input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3),
  .input-group:not(.has-validation)
    > .form-floating:not(:last-child)
    > .form-control,
  .input-group:not(.has-validation)
    > .form-floating:not(:last-child)
    > .form-select {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-group.has-validation
    > :nth-last-child(n + 3):not(.dropdown-toggle):not(.dropdown-menu):not(
      .form-floating
    ),
  .input-group.has-validation > .dropdown-toggle:nth-last-child(n + 4),
  .input-group.has-validation
    > .form-floating:nth-last-child(n + 3)
    > .form-control,
  .input-group.has-validation
    > .form-floating:nth-last-child(n + 3)
    > .form-select {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-group
    > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
      .valid-feedback
    ):not(.invalid-tooltip):not(.invalid-feedback) {
    margin-left: calc(var(--bs-border-width) * -1);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .input-group > .form-floating:not(:first-child) > .form-control,
  .input-group > .form-floating:not(:first-child) > .form-select {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .valid-feedback {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: var(--bs-form-valid-color);
  }

  .valid-tooltip {
    position: absolute;
    top: 100%;
    z-index: 5;
    display: none;
    max-width: 100%;
    padding: 0.25rem 0.5rem;
    margin-top: 0.1rem;
    font-size: 0.875rem;
    color: #fff;
    background-color: var(--bs-success);
    border-radius: var(--bs-border-radius);
  }

  .was-validated :valid ~ .valid-feedback,
  .was-validated :valid ~ .valid-tooltip,
  .is-valid ~ .valid-feedback,
  .is-valid ~ .valid-tooltip {
    display: block;
  }

  .was-validated .form-control:valid,
  .form-control.is-valid {
    border-color: var(--bs-form-valid-border-color);
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  .was-validated .form-control:valid:focus,
  .form-control.is-valid:focus {
    border-color: var(--bs-form-valid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
  }

  .was-validated textarea.form-control:valid,
  textarea.form-control.is-valid {
    padding-right: calc(1.5em + 0.75rem);
    background-position: top calc(0.375em + 0.1875rem) right
      calc(0.375em + 0.1875rem);
  }

  .was-validated .form-select:valid,
  .form-select.is-valid {
    border-color: var(--bs-form-valid-border-color);
  }
  .was-validated .form-select:valid:not([multiple]):not([size]),
  .was-validated .form-select:valid:not([multiple])[size="1"],
  .form-select.is-valid:not([multiple]):not([size]),
  .form-select.is-valid:not([multiple])[size="1"] {
    --bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    padding-right: 4.125rem;
    background-position: right 0.75rem center, center right 2.25rem;
    background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  .was-validated .form-select:valid:focus,
  .form-select.is-valid:focus {
    border-color: var(--bs-form-valid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
  }

  .was-validated .form-control-color:valid,
  .form-control-color.is-valid {
    width: calc(3rem + calc(1.5em + 0.75rem));
  }

  .was-validated .form-check-input:valid,
  .form-check-input.is-valid {
    border-color: var(--bs-form-valid-border-color);
  }
  .was-validated .form-check-input:valid:checked,
  .form-check-input.is-valid:checked {
    background-color: var(--bs-form-valid-color);
  }
  .was-validated .form-check-input:valid:focus,
  .form-check-input.is-valid:focus {
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
  }
  .was-validated .form-check-input:valid ~ .form-check-label,
  .form-check-input.is-valid ~ .form-check-label {
    color: var(--bs-form-valid-color);
  }

  .form-check-inline .form-check-input ~ .valid-feedback {
    margin-left: 0.5em;
  }

  .was-validated .input-group > .form-control:not(:focus):valid,
  .input-group > .form-control:not(:focus).is-valid,
  .was-validated .input-group > .form-select:not(:focus):valid,
  .input-group > .form-select:not(:focus).is-valid,
  .was-validated .input-group > .form-floating:not(:focus-within):valid,
  .input-group > .form-floating:not(:focus-within).is-valid {
    z-index: 3;
  }

  .invalid-feedback {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: var(--bs-form-invalid-color);
  }

  .invalid-tooltip {
    position: absolute;
    top: 100%;
    z-index: 5;
    display: none;
    max-width: 100%;
    padding: 0.25rem 0.5rem;
    margin-top: 0.1rem;
    font-size: 0.875rem;
    color: #fff;
    background-color: var(--bs-danger);
    border-radius: var(--bs-border-radius);
  }

  .was-validated :invalid ~ .invalid-feedback,
  .was-validated :invalid ~ .invalid-tooltip,
  .is-invalid ~ .invalid-feedback,
  .is-invalid ~ .invalid-tooltip {
    display: block;
  }

  .was-validated .form-control:invalid,
  .form-control.is-invalid {
    border-color: var(--bs-form-invalid-border-color);
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  .was-validated .form-control:invalid:focus,
  .form-control.is-invalid:focus {
    border-color: var(--bs-form-invalid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
  }

  .was-validated textarea.form-control:invalid,
  textarea.form-control.is-invalid {
    padding-right: calc(1.5em + 0.75rem);
    background-position: top calc(0.375em + 0.1875rem) right
      calc(0.375em + 0.1875rem);
  }

  .was-validated .form-select:invalid,
  .form-select.is-invalid {
    border-color: var(--bs-form-invalid-border-color);
  }
  .was-validated .form-select:invalid:not([multiple]):not([size]),
  .was-validated .form-select:invalid:not([multiple])[size="1"],
  .form-select.is-invalid:not([multiple]):not([size]),
  .form-select.is-invalid:not([multiple])[size="1"] {
    --bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    padding-right: 4.125rem;
    background-position: right 0.75rem center, center right 2.25rem;
    background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  .was-validated .form-select:invalid:focus,
  .form-select.is-invalid:focus {
    border-color: var(--bs-form-invalid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
  }

  .was-validated .form-control-color:invalid,
  .form-control-color.is-invalid {
    width: calc(3rem + calc(1.5em + 0.75rem));
  }

  .was-validated .form-check-input:invalid,
  .form-check-input.is-invalid {
    border-color: var(--bs-form-invalid-border-color);
  }
  .was-validated .form-check-input:invalid:checked,
  .form-check-input.is-invalid:checked {
    background-color: var(--bs-form-invalid-color);
  }
  .was-validated .form-check-input:invalid:focus,
  .form-check-input.is-invalid:focus {
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
  }
  .was-validated .form-check-input:invalid ~ .form-check-label,
  .form-check-input.is-invalid ~ .form-check-label {
    color: var(--bs-form-invalid-color);
  }

  .form-check-inline .form-check-input ~ .invalid-feedback {
    margin-left: 0.5em;
  }

  .was-validated .input-group > .form-control:not(:focus):invalid,
  .input-group > .form-control:not(:focus).is-invalid,
  .was-validated .input-group > .form-select:not(:focus):invalid,
  .input-group > .form-select:not(:focus).is-invalid,
  .was-validated .input-group > .form-floating:not(:focus-within):invalid,
  .input-group > .form-floating:not(:focus-within).is-invalid {
    z-index: 4;
  }

  .btn {
    --bs-btn-padding-x: 0.75rem;
    --bs-btn-padding-y: 0.375rem;
    --bs-btn-font-family: ;
    --bs-btn-font-size: 1rem;
    --bs-btn-font-weight: 400;
    --bs-btn-line-height: 1.5;
    --bs-btn-color: var(--bs-body-color);
    --bs-btn-bg: transparent;
    --bs-btn-border-width: var(--bs-border-width);
    --bs-btn-border-color: transparent;
    --bs-btn-border-radius: var(--bs-border-radius);
    --bs-btn-hover-border-color: transparent;
    --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 1px 1px rgba(0, 0, 0, 0.075);
    --bs-btn-disabled-opacity: 0.65;
    --bs-btn-focus-box-shadow: 0 0 0 0.25rem
      rgba(var(--bs-btn-focus-shadow-rgb), 0.5);
    display: inline-block;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: var(--bs-btn-bg);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }
  }
  .btn:hover {
    color: var(--bs-btn-hover-color);
    background-color: var(--bs-btn-hover-bg);
    border-color: var(--bs-btn-hover-border-color);
  }
  .btn-check + .btn:hover {
    color: var(--bs-btn-color);
    background-color: var(--bs-btn-bg);
    border-color: var(--bs-btn-border-color);
  }
  .btn:focus-visible {
    color: var(--bs-btn-hover-color);
    background-color: var(--bs-btn-hover-bg);
    border-color: var(--bs-btn-hover-border-color);
    outline: 0;
    box-shadow: var(--bs-btn-focus-box-shadow);
  }
  .btn-check:focus-visible + .btn {
    border-color: var(--bs-btn-hover-border-color);
    outline: 0;
    box-shadow: var(--bs-btn-focus-box-shadow);
  }
  .btn-check:checked + .btn,
  :not(.btn-check) + .btn:active,
  .btn:first-child:active,
  .btn.active,
  .btn.show {
    color: var(--bs-btn-active-color);
    background-color: var(--bs-btn-active-bg);
    border-color: var(--bs-btn-active-border-color);
  }
  .btn-check:checked + .btn:focus-visible,
  :not(.btn-check) + .btn:active:focus-visible,
  .btn:first-child:active:focus-visible,
  .btn.active:focus-visible,
  .btn.show:focus-visible {
    box-shadow: var(--bs-btn-focus-box-shadow);
  }
  .btn-check:checked:focus-visible + .btn {
    box-shadow: var(--bs-btn-focus-box-shadow);
  }
  .btn:disabled,
  .btn.disabled,
  fieldset:disabled .btn {
    color: var(--bs-btn-disabled-color);
    pointer-events: none;
    background-color: var(--bs-btn-disabled-bg);
    border-color: var(--bs-btn-disabled-border-color);
    opacity: var(--bs-btn-disabled-opacity);
  }

  .btn-primary {
    --bs-btn-color: #fff;
    --bs-btn-bg: #0d6efd;
    --bs-btn-border-color: #0d6efd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #0b5ed7;
    --bs-btn-hover-border-color: #0a58ca;
    --bs-btn-focus-shadow-rgb: 49, 132, 253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #0a58ca;
    --bs-btn-active-border-color: #0a53be;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #0d6efd;
    --bs-btn-disabled-border-color: #0d6efd;
  }

  .btn-secondary {
    --bs-btn-color: #fff;
    --bs-btn-bg: #6c757d;
    --bs-btn-border-color: #6c757d;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #5c636a;
    --bs-btn-hover-border-color: #565e64;
    --bs-btn-focus-shadow-rgb: 130, 138, 145;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #565e64;
    --bs-btn-active-border-color: #51585e;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #6c757d;
    --bs-btn-disabled-border-color: #6c757d;
  }

  .btn-success {
    --bs-btn-color: #fff;
    --bs-btn-bg: #198754;
    --bs-btn-border-color: #198754;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #157347;
    --bs-btn-hover-border-color: #146c43;
    --bs-btn-focus-shadow-rgb: 60, 153, 110;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #146c43;
    --bs-btn-active-border-color: #13653f;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #198754;
    --bs-btn-disabled-border-color: #198754;
  }

  .btn-info {
    --bs-btn-color: #000;
    --bs-btn-bg: #0dcaf0;
    --bs-btn-border-color: #0dcaf0;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #31d2f2;
    --bs-btn-hover-border-color: #25cff2;
    --bs-btn-focus-shadow-rgb: 11, 172, 204;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #3dd5f3;
    --bs-btn-active-border-color: #25cff2;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #000;
    --bs-btn-disabled-bg: #0dcaf0;
    --bs-btn-disabled-border-color: #0dcaf0;
  }

  .btn-warning {
    --bs-btn-color: #000;
    --bs-btn-bg: #ffc107;
    --bs-btn-border-color: #ffc107;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #ffca2c;
    --bs-btn-hover-border-color: #ffc720;
    --bs-btn-focus-shadow-rgb: 217, 164, 6;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #ffcd39;
    --bs-btn-active-border-color: #ffc720;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #000;
    --bs-btn-disabled-bg: #ffc107;
    --bs-btn-disabled-border-color: #ffc107;
  }

  .btn-danger {
    --bs-btn-color: #fff;
    --bs-btn-bg: #dc3545;
    --bs-btn-border-color: #dc3545;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #bb2d3b;
    --bs-btn-hover-border-color: #b02a37;
    --bs-btn-focus-shadow-rgb: 225, 83, 97;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #b02a37;
    --bs-btn-active-border-color: #a52834;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #dc3545;
    --bs-btn-disabled-border-color: #dc3545;
  }

  .btn-light {
    --bs-btn-color: #000;
    --bs-btn-bg: #f8f9fa;
    --bs-btn-border-color: #f8f9fa;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #d3d4d5;
    --bs-btn-hover-border-color: #c6c7c8;
    --bs-btn-focus-shadow-rgb: 211, 212, 213;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #c6c7c8;
    --bs-btn-active-border-color: #babbbc;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #000;
    --bs-btn-disabled-bg: #f8f9fa;
    --bs-btn-disabled-border-color: #f8f9fa;
  }

  .btn-dark {
    --bs-btn-color: #fff;
    --bs-btn-bg: #212529;
    --bs-btn-border-color: #212529;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #424649;
    --bs-btn-hover-border-color: #373b3e;
    --bs-btn-focus-shadow-rgb: 66, 70, 73;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #4d5154;
    --bs-btn-active-border-color: #373b3e;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: #212529;
    --bs-btn-disabled-border-color: #212529;
  }

  .btn-outline-primary {
    --bs-btn-color: #0d6efd;
    --bs-btn-border-color: #0d6efd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #0d6efd;
    --bs-btn-hover-border-color: #0d6efd;
    --bs-btn-focus-shadow-rgb: 13, 110, 253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #0d6efd;
    --bs-btn-active-border-color: #0d6efd;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #0d6efd;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #0d6efd;
    --bs-gradient: none;
  }

  .btn-outline-secondary {
    --bs-btn-color: #6c757d;
    --bs-btn-border-color: #6c757d;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #6c757d;
    --bs-btn-hover-border-color: #6c757d;
    --bs-btn-focus-shadow-rgb: 108, 117, 125;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #6c757d;
    --bs-btn-active-border-color: #6c757d;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #6c757d;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #6c757d;
    --bs-gradient: none;
  }

  .btn-outline-success {
    --bs-btn-color: #198754;
    --bs-btn-border-color: #198754;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #198754;
    --bs-btn-hover-border-color: #198754;
    --bs-btn-focus-shadow-rgb: 25, 135, 84;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #198754;
    --bs-btn-active-border-color: #198754;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #198754;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #198754;
    --bs-gradient: none;
  }

  .btn-outline-info {
    --bs-btn-color: #0dcaf0;
    --bs-btn-border-color: #0dcaf0;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #0dcaf0;
    --bs-btn-hover-border-color: #0dcaf0;
    --bs-btn-focus-shadow-rgb: 13, 202, 240;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #0dcaf0;
    --bs-btn-active-border-color: #0dcaf0;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #0dcaf0;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #0dcaf0;
    --bs-gradient: none;
  }

  .btn-outline-warning {
    --bs-btn-color: #ffc107;
    --bs-btn-border-color: #ffc107;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #ffc107;
    --bs-btn-hover-border-color: #ffc107;
    --bs-btn-focus-shadow-rgb: 255, 193, 7;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #ffc107;
    --bs-btn-active-border-color: #ffc107;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #ffc107;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #ffc107;
    --bs-gradient: none;
  }

  .btn-outline-danger {
    --bs-btn-color: #dc3545;
    --bs-btn-border-color: #dc3545;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #dc3545;
    --bs-btn-hover-border-color: #dc3545;
    --bs-btn-focus-shadow-rgb: 220, 53, 69;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #dc3545;
    --bs-btn-active-border-color: #dc3545;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #dc3545;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #dc3545;
    --bs-gradient: none;
  }

  .btn-outline-light {
    --bs-btn-color: #f8f9fa;
    --bs-btn-border-color: #f8f9fa;
    --bs-btn-hover-color: #000;
    --bs-btn-hover-bg: #f8f9fa;
    --bs-btn-hover-border-color: #f8f9fa;
    --bs-btn-focus-shadow-rgb: 248, 249, 250;
    --bs-btn-active-color: #000;
    --bs-btn-active-bg: #f8f9fa;
    --bs-btn-active-border-color: #f8f9fa;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #f8f9fa;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #f8f9fa;
    --bs-gradient: none;
  }

  .btn-outline-dark {
    --bs-btn-color: #212529;
    --bs-btn-border-color: #212529;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #212529;
    --bs-btn-hover-border-color: #212529;
    --bs-btn-focus-shadow-rgb: 33, 37, 41;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #212529;
    --bs-btn-active-border-color: #212529;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #212529;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #212529;
    --bs-gradient: none;
  }

  .btn-link {
    --bs-btn-font-weight: 400;
    --bs-btn-color: var(--bs-link-color);
    --bs-btn-bg: transparent;
    --bs-btn-border-color: transparent;
    --bs-btn-hover-color: var(--bs-link-hover-color);
    --bs-btn-hover-border-color: transparent;
    --bs-btn-active-color: var(--bs-link-hover-color);
    --bs-btn-active-border-color: transparent;
    --bs-btn-disabled-color: #6c757d;
    --bs-btn-disabled-border-color: transparent;
    --bs-btn-box-shadow: 0 0 0 #000;
    --bs-btn-focus-shadow-rgb: 49, 132, 253;
    text-decoration: underline;
  }
  .btn-link:focus-visible {
    color: var(--bs-btn-color);
  }
  .btn-link:hover {
    color: var(--bs-btn-hover-color);
  }

  .btn-lg {
    --bs-btn-padding-y: 0.5rem;
    --bs-btn-padding-x: 1rem;
    --bs-btn-font-size: 1.25rem;
    --bs-btn-border-radius: var(--bs-border-radius-lg);
  }

  .btn-sm {
    --bs-btn-padding-y: 0.25rem;
    --bs-btn-padding-x: 0.5rem;
    --bs-btn-font-size: 0.875rem;
    --bs-btn-border-radius: var(--bs-border-radius-sm);
  }
`;
